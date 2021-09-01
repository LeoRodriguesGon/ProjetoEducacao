using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendEducacao.Models;

namespace BackendEducacao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponsavelController : ControllerBase
    {
        private readonly Contexto _contexto;

        public ResponsavelController(Contexto contexto)
        {
            _contexto = contexto;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Responsavel>>> Listar()
        {
            return await _contexto.Responsaveis.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Responsavel>> ListarPorId(int id)
        {
            var responsavel = await _contexto.Responsaveis.FindAsync(id);

            responsavel.DataNascimento = responsavel.DataNascimento.Date;

            if (responsavel == null)
            {
                return NotFound();
            }

            return responsavel;
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(int id, Responsavel responsavel)
        {
            if (id != responsavel.ResponsavelId)
            {
                return BadRequest();
            }

            _contexto.Entry(responsavel).State = EntityState.Modified;

            try
            {
                await _contexto.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResponsavelExiste(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<Responsavel>> Cadastrar(Responsavel responsavel)
        {
            Validar(responsavel);

            if (ModelState.IsValid)
            {
                _contexto.Responsaveis.Add(responsavel);
                await _contexto.SaveChangesAsync();
                return CreatedAtAction("ListarPorId", new { id = responsavel.ResponsavelId }, responsavel);
            }
            else
            {
                Console.WriteLine("O Responsavel precisa ser maior de idade");
                return responsavel;
            }

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Responsavel>> Deletar(int id)
        {
            var responsavel = await _contexto.Responsaveis.FindAsync(id);
            if (responsavel == null)
            {
                return NotFound();
            }

            _contexto.Responsaveis.Remove(responsavel);
            await _contexto.SaveChangesAsync();

            return responsavel;
        }

        private bool ResponsavelExiste(int id)
        {
            return _contexto.Responsaveis.Any(e => e.ResponsavelId == id);
        }

        public void Validar(Responsavel responsavel)
        {
            int anos = DateTime.Today.Year - responsavel.DataNascimento.Year;

            if (anos < 18)
            {
                ModelState.AddModelError("DataNascimento", "O Responsavel precisa ser maior de idade");
            }
        }
    }
}

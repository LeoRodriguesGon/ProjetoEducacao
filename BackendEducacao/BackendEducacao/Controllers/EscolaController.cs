using BackendEducacao.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEducacao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EscolaController : ControllerBase
    {
        private readonly Contexto _contexto;

        public EscolaController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Escola>>> Listar()
        {
            return await _contexto.Escolas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Escola>> ListarPorId(int id)
        {
            var escola = await _contexto.Escolas.FindAsync(id);

            if(escola == null)
            {
                return NotFound();
            }

            return escola;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(int id, Escola escola)
        {
            if(id != escola.EscolaId)
            {
                return BadRequest();
            }

            _contexto.Entry(escola).State = EntityState.Modified;

            try
            {
                await _contexto.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!EscolaExiste(id))
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
        public async Task<ActionResult<Escola>> Cadastrar(Escola escola)
        {
            _contexto.Escolas.Add(escola);
            await _contexto.SaveChangesAsync();

            return CreatedAtAction("ListarPorId", new { id = escola.EscolaId }, escola);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var escola = await _contexto.Escolas.FindAsync(id);
           
            if(escola == null)
            {
                return NotFound();
            }

            _contexto.Escolas.Remove(escola);
            await _contexto.SaveChangesAsync();

            return NoContent();
        }

        private bool EscolaExiste(int id)
        {
            return _contexto.Escolas.Any(e => e.EscolaId == id);
        }
    }
}

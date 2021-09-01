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
    public class AlunoController : ControllerBase
    {
        private readonly Contexto _contexto;

        public AlunoController(Contexto contexto)
        {
            _contexto = contexto;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aluno>>> Listar()
        {
            return await _contexto.Alunos.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Aluno>> ListarPorId(int id)
        {
            var aluno = await _contexto.Alunos.FindAsync(id);

            aluno.DataNascimento = aluno.DataNascimento.Date;

            if (aluno == null)
            {
                return NotFound();
            }

            return aluno;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(int id, Aluno aluno)
        {
            if (id != aluno.AlunoId)
            {
                return BadRequest();
            }

            _contexto.Entry(aluno).State = EntityState.Modified;

            try
            {
                await _contexto.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlunoExiste(id))
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
        public async Task<ActionResult<Aluno>> Cadastrar(Aluno aluno)
        {
            Validar(aluno);

            if (ModelState.IsValid)
            {
                _contexto.Alunos.Add(aluno);
                await _contexto.SaveChangesAsync();
                return CreatedAtAction("ListarPorId", new { id = aluno.AlunoId }, aluno);
            }
            else
            {
                Console.WriteLine("O aluno precisa ter no mínimo 6 anos");
                return aluno;
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Aluno>> Deletar(int id)
        {
            var aluno = await _contexto.Alunos.FindAsync(id);
            if (aluno == null)
            {
                return NotFound();
            }

            _contexto.Alunos.Remove(aluno);
            await _contexto.SaveChangesAsync();

            return aluno;
        }

        private bool AlunoExiste(int id)
        {
            return _contexto.Alunos.Any(e => e.AlunoId == id);
        }

        public void Validar(Aluno aluno)
        {
            int anos = DateTime.Today.Year - aluno.DataNascimento.Year;
            if(anos < 6)
            {
                ModelState.AddModelError("DataNascimento", "O aluno precisa ter no mínimo 6 anos");
            }
            if(anos < 18 && aluno.ResponsavelId == 0)
            {
                ModelState.AddModelError("DataNascimento", "O aluno precisa ser maior de idade ou possuir cadastro de responsável");
            }
            if((aluno.NumeroCertidaoNova == "null" || aluno.NumeroCertidaoNova == "") && (aluno.CPF == "null" || aluno.CPF == ""))
            {
                ModelState.AddModelError("NumeroCertidaoNova", "O aluno precisa ter Certidão de Nascimento ou CPF no cadastro");
                ModelState.AddModelError("CPF", "O aluno precisa ter Certidão de Nascimento ou CPF no cadastro");
            }
        }

    }
}

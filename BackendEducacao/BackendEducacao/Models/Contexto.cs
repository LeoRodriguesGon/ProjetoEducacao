using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BackendEducacao.Models
{
    public class Contexto : DbContext
    {

        public DbSet<Aluno> Alunos { get; set; }

        public DbSet<Responsavel> Responsaveis { get; set; }

        public DbSet<Escola> Escolas { get; set; }

        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {

        }
    }
}
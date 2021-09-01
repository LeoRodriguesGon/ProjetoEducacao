using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendEducacao.Models
{
    [Table("aluno")]
    public class Aluno
    {
        [Key]
        [Column("alunoid")]
        [Required]
        public Int32 AlunoId { get; set; }

        [Column("nome")]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 200 letras.")]
        [Required(ErrorMessage = "Nome é obrigatorio")]
        public String Nome { get; set; }

        [Column("datanascimento")]
        [Required(ErrorMessage = "Data de Nascimento é obrigatoria")]
        public DateTime DataNascimento { get; set; }

        [Column("numerocertidaonova")]
        public String NumeroCertidaoNova { get; set; }

        [Column("cpf")]
        public String CPF { get; set; }

        [Column("responsavelid")]
         public Int32? ResponsavelId { get; set; }

        [Column("escolaid")]
        [Required(ErrorMessage = "Código da Escola é obrigatorio")]
        public Int32 EscolaId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendEducacao.Models
{
    [Table("responsavel")]
    public class Responsavel
    {
        [Key]
        [Column("responsavelid")]
        [Required]
        public Int32 ResponsavelId { get; set; }

        [Column("nome")]
        [StringLength(180, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 180 letras.")]
        [Required(ErrorMessage = "Nome é obrigatorio")]
        public String Nome { get; set; }

        [Column("datanascimento")]
        [Required(ErrorMessage = "Data de Nascimento é obrigatoria")]
        public DateTime DataNascimento { get; set; }

        [Column("cpf")]
        [Required(ErrorMessage = "CPF é obrigatorio")]
        public String CPF { get; set; }
    }
}

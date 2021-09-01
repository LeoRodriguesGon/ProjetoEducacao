using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEducacao.Models
{
    [Table("escola")]
    public class Escola
    {
        [Key]
        [Column("escolaid")]
        [Required]
        public Int32 EscolaId { get; set; }

        [Column("nome")]
        [Required(ErrorMessage = "Nome da Escola é obrigatorio")]
        public String Nome { get; set; }
    }
}

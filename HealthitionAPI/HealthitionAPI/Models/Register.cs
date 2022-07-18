using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthitionAPI.Models
{
    public class Register
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string userName { get; set; }

        [Column(TypeName = "nvarchar(14)")]
        public string password { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string email { get; set; }
    }
}

using HealthitionAPI.IdentityAuth;
using System.ComponentModel.DataAnnotations;

namespace HealthitionAPI.Models
{
    public class Post
    {
        [Key]
        public int id { get; set; }
        public string post { get; set; }
        public string title { get; set; }
        public string userId { get; set; }


    }
}

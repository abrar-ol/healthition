using HealthitionAPI.IdentityAuth;
using HealthitionAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HealthitionAPI.DBContext
{
    public class HealthitionDBContext : IdentityDbContext<User>
    {
        public HealthitionDBContext(DbContextOptions<HealthitionDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            
            builder.Entity<User>().Ignore(c => c.AccessFailedCount)
                                           .Ignore(c => c.LockoutEnabled)
                                           .Ignore(c => c.TwoFactorEnabled)
                                           .Ignore(c=>c.EmailConfirmed)
                                           .Ignore(c => c.PhoneNumber)
                                           .Ignore(c => c.PhoneNumberConfirmed)
                                           .Ignore(c => c.LockoutEnd)
                                           .Ignore(c => c.PhoneNumber);

            builder.Entity<User>(entity =>
            {
                entity.ToTable(name: "User");
            });

            builder.Entity<IdentityRole>(entity =>
            {
                entity.ToTable(name: "Role");
            });
            builder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("UserRoles");
                //in case you chagned the TKey type
                //  entity.HasKey(key => new { key.UserId, key.RoleId });
            });


            builder.Entity<Post>(entity =>
            {
                // Primary key
                entity.HasKey(u => u.id);
                entity.ToTable("Posts");

            });
        }
        public DbSet<Post> Posts { get; set; }

    }
}

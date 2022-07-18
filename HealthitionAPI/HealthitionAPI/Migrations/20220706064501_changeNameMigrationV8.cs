using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthitionAPI.Migrations
{
    public partial class changeNameMigrationV8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "User");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "UserRole",
                table: "User",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

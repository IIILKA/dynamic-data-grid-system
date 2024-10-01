using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DDGS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDataGridEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DataGrids",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v7()"),
                    Name = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    OwnerId = table.Column<Guid>(type: "uuid", nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataGrids", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataGrids_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataGridColumns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v7()"),
                    Name = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    DataGridId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataGridColumns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataGridColumns_DataGrids_DataGridId",
                        column: x => x.DataGridId,
                        principalTable: "DataGrids",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DataGridColumns_DataGridId",
                table: "DataGridColumns",
                column: "DataGridId");

            migrationBuilder.CreateIndex(
                name: "IX_DataGrids_OwnerId",
                table: "DataGrids",
                column: "OwnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DataGridColumns");

            migrationBuilder.DropTable(
                name: "DataGrids");
        }
    }
}

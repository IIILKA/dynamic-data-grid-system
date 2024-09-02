using DDGS.Core.DataGrid.Interfaces.Repositories;
using DDGS.Core.DataGrid.Models;
using DDGS.Infrastructure.PostgresDb;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure.DataGrid
{
    public class DataGridColumnRepository : PostgresDbRepositoryBase<DataGridColumnEntity>, IDataGridColumnRepository
    {
        public DataGridColumnRepository(DdgsDbContext dbContext) : base(dbContext) { }

        protected override IQueryable<DataGridColumnEntity> SingleEntityQuery => EntitySet
            .Include(_ => _.DataGrid);

        public async Task<DataGridColumnEntity?> GetByDataGridAndNameAsync(DataGridEntity dataGrid, string name)
        {
            return await GetAsync(_ => _.DataGrid.Id == dataGrid.Id && _.Name == name);
        }
    }
}

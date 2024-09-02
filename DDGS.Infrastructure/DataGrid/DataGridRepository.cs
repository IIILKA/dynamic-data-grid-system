using DDGS.Core.DataGrid.Interfaces.Repositories;
using DDGS.Core.DataGrid.Models;
using DDGS.Infrastructure.PostgresDb;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure.DataGrid
{
    public class DataGridRepository : PostgresDbRepositoryBase<DataGridEntity>, IDataGridRepository
    {
        public DataGridRepository(DdgsDbContext dbContext) : base(dbContext) { }

        protected override IQueryable<DataGridEntity> SingleEntityQuery => EntitySet
            .Include(_ => _.Owner)
            .Include(_ => _.Columns);

        protected override IQueryable<DataGridEntity> ManyEntitiesQuery => EntitySet
            .Include(_ => _.Owner);

        public async Task<List<DataGridEntity>> GetManyByUserAsync(Guid userId)
        {
            return await GetManyAsync(_ => _.Owner.Id == userId);
        }
    }
}

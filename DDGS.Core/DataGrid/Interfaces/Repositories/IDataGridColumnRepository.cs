using System.Linq.Expressions;
using DDGS.Core.DataGrid.Models;
using FluentResults;

namespace DDGS.Core.DataGrid.Interfaces.Repositories
{
    public interface IDataGridColumnRepository
    {
        Task<DataGridColumnEntity?> GetAsync(Expression<Func<DataGridColumnEntity, bool>> filter);

        Task<List<DataGridColumnEntity>> GetManyAsync(Expression<Func<DataGridColumnEntity, bool>> filter);

        Task<Result> CreateAsync(DataGridColumnEntity entity);

        Task<Result> UpdateManyAsync(List<DataGridColumnEntity> entities);

        Task<Result> DeleteAsync(DataGridColumnEntity entity);
    }
}

using DDGS.Core.Core.Errors;
using DDGS.Core.Core.Interfaces;
using FluentResults;
using MapsterMapper;

namespace DDGS.Core.Core
{
    public abstract class ServiceBase
    {
        private readonly IUnitOfWork _unitOfWork;

        protected readonly IMapper Mapper;

        protected ServiceBase(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            Mapper = mapper;
        }

        protected async Task<Result> ExecuteInTransactionAsync(Func<Task<Result>> operation)
        {
            await using (_unitOfWork)
            {
                try
                {
                    await _unitOfWork.BeginTransactionAsync();

                    var result = await operation();

                    if (result.IsFailed)
                    {
                        await _unitOfWork.RollbackAsync();
                        return result;
                    }

                    await _unitOfWork.CommitAsync();
                    return result;
                }
                catch (Exception)
                {
                    await _unitOfWork.RollbackAsync();
                    return Result.Fail(new GeneralError());
                }
            }
        }
    }
}

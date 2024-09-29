import { useParams } from 'react-router-dom';
import DataGridGetArgs from '../../api/args/data-grid-get-args.ts';
import DataGridRowGetArgs from '../../api/args/data-grid-row-get-args.ts';
import { useGetDataGridQuery, useGetDataGridRowsQuery } from '../../api/resource-api-slice.ts';
import DataGridId from '../models/data-grid-id-type.ts';
import DataGridModel from '../models/data-grid-model.ts';
import NormalizedDataGridRowModels from '../models/normalized-data-grid-row-models.ts';

type DataGridPageHookReturnType = {
  dataGrid: DataGridModel;
  isDatGridLoading: boolean;
  isDataGridSuccess: boolean;
  normalizedDataGridRows: NormalizedDataGridRowModels;
  isDataGridRowsLoading: boolean;
  isDataGridRowsSuccess: boolean;
};

export default function useDataGridPage(): DataGridPageHookReturnType {
  const { id } = useParams() as { id: DataGridId };

  const {
    data: dataGrid,
    isLoading: isDatGridLoading,
    isSuccess: isDataGridSuccess
  } = useGetDataGridQuery({ id: id } satisfies DataGridGetArgs);

  const {
    data: normalizedDataGridRows,
    isLoading: isDataGridRowsLoading,
    isSuccess: isDataGridRowsSuccess
  } = useGetDataGridRowsQuery({ dataGridId: id } satisfies DataGridRowGetArgs);

  return {
    dataGrid,
    isDatGridLoading,
    isDataGridSuccess,
    normalizedDataGridRows,
    isDataGridRowsLoading,
    isDataGridRowsSuccess
  };
}

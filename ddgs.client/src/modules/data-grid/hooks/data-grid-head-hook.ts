import { useMemo } from 'react';
import DataGridModel from '../models/data-grid-model.ts';

type DataGridHeadHookProps = {
  dataGrid: DataGridModel;
};

export function useDataGridHead({ dataGrid }: DataGridHeadHookProps) {
  const sortedCells = useMemo(() => {
    return [...dataGrid.columns].sort((a, b) => a.index - b.index);
  }, [dataGrid.columns]);

  return { sortedCells };
}

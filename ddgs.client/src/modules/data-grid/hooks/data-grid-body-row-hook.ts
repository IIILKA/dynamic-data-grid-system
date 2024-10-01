import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectSelectedCell } from '../data-grid-slice.ts';
import DataGridRowModel from '../models/data-grid-row-model.ts';

interface DataGridBodyRowHookProps {
  dataGridRow: DataGridRowModel;
  sortedColumnNames: string[];
}

export function useDataGridBodyRow({ dataGridRow, sortedColumnNames }: DataGridBodyRowHookProps) {
  const selectedCell = useAppSelector(selectSelectedCell);

  return useMemo(() => {
    const isActiveRow = dataGridRow.id === selectedCell?.rowId;

    const sortedCells = sortedColumnNames.map((colName) => {
      return {
        colName,
        cellValue: dataGridRow.rowData[colName]
      };
    });

    return { sortedCells, isActiveRow };
  }, [dataGridRow, sortedColumnNames, selectedCell]);
}

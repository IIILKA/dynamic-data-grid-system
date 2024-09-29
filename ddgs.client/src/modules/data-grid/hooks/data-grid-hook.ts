import { useRef } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import DataGridRowCreateArgs from '../../api/args/data-grid-row-create-args.ts';
import { useCreateDataGridRowMutation } from '../../api/resource-api-slice.ts';
import { PopoverRef } from '../../core/hooks/popover-hook.ts';
import { selectDataGridColumnIsLoading } from '../../loading/loading-slice.ts';
import DataGridCellValueType from '../models/data-grid-cell-value-type.ts';
import DataGridColumnModel from '../models/data-grid-column-model.ts';
import DataGridColumnType from '../models/data-grid-column-type.ts';
import DataGridModel from '../models/data-grid-model.ts';
import DataGridRowData from '../models/data-grid-row-data.ts';

type DataGridHookProps = {
  dataGrid: DataGridModel;
  rowsCount: number;
};

export function useDataGrid({ dataGrid, rowsCount }: DataGridHookProps) {
  const [createDataGridRow] = useCreateDataGridRowMutation();
  const popoverRef = useRef<PopoverRef | null>(null);
  const isAddColumnLoading = useAppSelector(selectDataGridColumnIsLoading);

  const handleAddNewRowButtonClick = async () => {
    const defaultRow = createDefaultRow(dataGrid.columns);
    await createDataGridRow({
      dataGridId: dataGrid.id,
      body: {
        index: rowsCount,
        rowData: defaultRow
      }
    } satisfies DataGridRowCreateArgs);
  };

  const handleAddColumnButtonClick = () => {
    if (popoverRef.current) {
      popoverRef.current!.setPopover({ isOpened: true });
    }
  };

  return { handleAddNewRowButtonClick, isAddColumnLoading, popoverRef, handleAddColumnButtonClick };
}

function createDefaultRow(columns: DataGridColumnModel[]): DataGridRowData {
  const defaultRow: { [key: string]: DataGridCellValueType } = {};

  columns.forEach((column) => {
    switch (column.type) {
      case DataGridColumnType.Text:
        defaultRow[column.name] = '';
        break;
      case DataGridColumnType.Number:
        defaultRow[column.name] = 0;
        break;
      case DataGridColumnType.Boolean:
        defaultRow[column.name] = false;
        break;
    }
  });

  return defaultRow;
}

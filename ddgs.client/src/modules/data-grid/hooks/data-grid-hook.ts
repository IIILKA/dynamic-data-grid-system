import { useRef } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import DataGridRowCreateArgs from '../../api/args/data-grid-row-create-args.ts';
import { useCreateDataGridRowMutation } from '../../api/resource-api-slice.ts';
import { PopoverRef } from '../../core/hooks/popover-hook.ts';
import { selectDataGridColumnIsLoading } from '../../loading/loading-slice.ts';
import DataGridModel from '../models/data-grid-model.ts';
import { createDefaultRowData } from '../utils/data-grid-functions.ts';

type DataGridHookProps = {
  dataGrid: DataGridModel;
  rowsCount: number;
};

export function useDataGrid({ dataGrid, rowsCount }: DataGridHookProps) {
  const [createDataGridRow] = useCreateDataGridRowMutation();
  const popoverRef = useRef<PopoverRef | null>(null);
  const isAddColumnLoading = useAppSelector(selectDataGridColumnIsLoading);

  const handleAddNewRowButtonClick = async () => {
    const defaultRowData = createDefaultRowData(dataGrid.columns);
    await createDataGridRow({
      dataGridId: dataGrid.id,
      body: {
        index: rowsCount,
        rowData: defaultRowData
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

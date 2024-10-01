import { ForwardedRef } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import DataGridRowCreateArgs from '../../api/args/data-grid-row-create-args.ts';
import DataGridRowDeleteArgs from '../../api/args/data-grid-row-delete-args.ts';
import {
  useCreateDataGridRowMutation,
  useDeleteDataGridRowMutation
} from '../../api/resource-api-slice.ts';
import { MenuRef, useMenu } from '../../core/hooks/menu-hook.ts';
import { selectSelectedCell } from '../data-grid-slice.ts';
import DataGridModel from '../models/data-grid-model.ts';
import NormalizedDataGridRowModels from '../models/normalized-data-grid-row-models.ts';
import { createDefaultRowData } from '../utils/data-grid-functions.ts';

type DataGridBodyMenuHookProps = {
  dataGrid: DataGridModel;
  normalizedDataGridRows: NormalizedDataGridRowModels;
  ref: ForwardedRef<MenuRef>;
};

export default function useDataGridBodyMenu({
  dataGrid,
  normalizedDataGridRows,
  ref
}: DataGridBodyMenuHookProps) {
  const { menu, menuRef, setMenu } = useMenu(ref);
  const selectedCell = useAppSelector(selectSelectedCell);
  const [createDataGridRow] = useCreateDataGridRowMutation();
  const [deleteDataGridRow] = useDeleteDataGridRowMutation();

  const areAddNewItemButtonsDisabled = normalizedDataGridRows.ids.some((id) => id === '');

  const handleInsertRowClickAsync = async (insertAboveTargetRow: boolean) => {
    setMenu({ isOpened: false });

    if (selectedCell) {
      const defaultRowData = createDefaultRowData(dataGrid.columns);
      const targetRow = normalizedDataGridRows.entities[selectedCell.rowId];
      await createDataGridRow({
        dataGridId: dataGrid.id,
        body: {
          index: insertAboveTargetRow ? targetRow.index : targetRow.index + 1,
          rowData: defaultRowData
        }
      } satisfies DataGridRowCreateArgs);
    }
  };

  const handleDuplicateRowClickAsync = async () => {
    setMenu({ isOpened: false });

    if (selectedCell) {
      const rowToDuplicate = normalizedDataGridRows.entities[selectedCell.rowId];
      await createDataGridRow({
        dataGridId: dataGrid.id,
        body: {
          index: rowToDuplicate.index + 1,
          rowData: rowToDuplicate.rowData
        }
      } satisfies DataGridRowCreateArgs);
    }
  };

  const handleDeleteRowClickAsync = async () => {
    setMenu({ isOpened: false });

    if (selectedCell) {
      await deleteDataGridRow({
        id: selectedCell.rowId,
        dataGridId: dataGrid.id
      } satisfies DataGridRowDeleteArgs);
    }
  };

  return {
    menu,
    menuRef,
    areAddNewItemButtonsDisabled,
    handleDeleteRowClickAsync,
    handleDuplicateRowClickAsync,
    handleInsertRowClickAsync
  };
}

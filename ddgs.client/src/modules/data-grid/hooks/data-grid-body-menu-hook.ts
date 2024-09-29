import { ForwardedRef } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import DataGridRowDeleteArgs from '../../api/args/data-grid-row-delete-args.ts';
import { useDeleteDataGridRowMutation } from '../../api/resource-api-slice.ts';
import { MenuRef, useMenu } from '../../core/hooks/menu-hook.ts';
import { selectSelectedCell } from '../data-grid-slice.ts';
import DataGridModel from '../models/data-grid-model.ts';

type DataGridBodyMenuHookProps = {
  dataGrid: DataGridModel;
  ref: ForwardedRef<MenuRef>;
};

export default function useDataGridBodyMenu({ dataGrid, ref }: DataGridBodyMenuHookProps) {
  const { menu, menuRef, setMenu } = useMenu(ref);

  const selectedCell = useAppSelector(selectSelectedCell);
  const [deleteDataGridRow] = useDeleteDataGridRowMutation();

  const handleDeleteRowClick = async () => {
    setMenu({ isOpened: false });
    if (selectedCell) {
      await deleteDataGridRow({
        id: selectedCell.rowId,
        dataGridId: dataGrid.id
      } satisfies DataGridRowDeleteArgs);
    }
  };

  return { menu, menuRef, handleDeleteRowClick };
}

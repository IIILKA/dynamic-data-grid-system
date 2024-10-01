import { ForwardedRef } from 'react';
import DataGridRemoveColumnArgs from '../../api/args/data-grid-remove-column-args.ts';
import { useRemoveColumnFromDataGridMutation } from '../../api/resource-api-slice.ts';
import { MenuRef, useMenu } from '../../core/hooks/menu-hook.ts';
import DataGridColumnModel from '../models/data-grid-column-model.ts';
import DataGridModel from '../models/data-grid-model.ts';

type DataGridHeadMenuHookProps = {
  dataGrid: DataGridModel;
  dataGridColumn: DataGridColumnModel;
  ref: ForwardedRef<MenuRef>;
};

export default function useDataGridHeadMenu({
  dataGrid,
  dataGridColumn,
  ref
}: DataGridHeadMenuHookProps) {
  const { menu, menuRef, setMenu } = useMenu(ref);

  const [removeColumnFromDataGrid] = useRemoveColumnFromDataGridMutation();

  const handleDeleteColumnClick = async () => {
    setMenu({ isOpened: false });
    await removeColumnFromDataGrid({
      id: dataGrid.id,
      colName: dataGridColumn.name
    } satisfies DataGridRemoveColumnArgs);
  };

  return { menu, menuRef, handleDeleteColumnClick };
}

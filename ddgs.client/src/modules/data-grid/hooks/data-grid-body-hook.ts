import { useClickOutside } from '@mantine/hooks';
import { useCallback, useRef } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { MenuRef } from '../../core/hooks/menu-hook.ts';
import { selectCell } from '../data-grid-slice.ts';
import DataGridModel from '../models/data-grid-model.ts';

type DataGridBodyHookProps = {
  dataGrid: DataGridModel;
};

export default function useDataGridBody({ dataGrid }: DataGridBodyHookProps) {
  const dispatch = useAppDispatch();
  const tableRef = useClickOutside(() => dispatch(selectCell(null)), ['click']);

  const menuRef = useRef<MenuRef | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLTableSectionElement>) => {
    e.preventDefault();
    const offsetX = e.pageX + 5;
    const offsetY = e.pageY;
    menuRef.current!.setMenu({ isOpened: true, offsetX, offsetY });
  }, []);

  const sortedColumnNames = [...dataGrid.columns]
    .sort((a, b) => a.index - b.index)
    .map((column) => column.name);

  return { tableRef, menuRef, handleContextMenu, sortedColumnNames };
}

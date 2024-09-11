import { Table } from '@mantine/core';
import { useRef } from 'react';
import DaraGridHeadMenu, { DaraGridHeadMenuRef } from './data-grid-head-menu.tsx';
import { DataGridColumnDto, DataGridDto } from '../../api/resource-api-slice.ts';

interface DataGridHeadCellProps {
  dataGrid: DataGridDto;
  dataGridColumn: DataGridColumnDto;
}

export default function DataGridHeadCell({ dataGrid, dataGridColumn }: DataGridHeadCellProps) {
  const menuRef = useRef<DaraGridHeadMenuRef | null>(null);

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    const offsetXThreshold = window.innerWidth * 0.15;
    const offsetX = calculateOffsetX(e, offsetXThreshold);
    menuRef.current!.setMenu({ isOpened: true, offsetX });
  };

  return (
    <DaraGridHeadMenu ref={menuRef} dataGrid={dataGrid} dataGridColumn={dataGridColumn}>
      <Table.Th onContextMenu={onContextMenu}>{dataGridColumn.name}</Table.Th>
    </DaraGridHeadMenu>
  );
}

function calculateOffsetX(e: MouseEvent, offsetXThreshold: number): number {
  const thElement = e.currentTarget as HTMLElement;
  const rect = thElement.getBoundingClientRect();
  const screenWidth = window.innerWidth;

  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const leftBoundary = rect.left + scrollLeft;
  const rightBoundary = rect.right + scrollLeft;

  return screenWidth - (rect.left + scrollLeft) >= offsetXThreshold
    ? leftBoundary
    : rightBoundary - offsetXThreshold;
}

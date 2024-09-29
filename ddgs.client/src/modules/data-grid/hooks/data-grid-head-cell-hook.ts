import { MouseEvent, useRef } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { MenuRef } from '../../core/hooks/menu-hook.ts';
import { selectCell } from '../data-grid-slice.ts';

export function useDataGridHeadCell() {
  const dispatch = useAppDispatch();
  const menuRef = useRef<MenuRef | null>(null);

  const handleContextMenu = (e: MouseEvent) => {
    dispatch(selectCell(null));
    e.preventDefault();
    const offsetXThreshold = window.innerWidth * 0.15;
    const offsetX = calculateOffsetX(e, offsetXThreshold);
    menuRef.current!.setMenu({ isOpened: true, offsetX });
  };

  return { menuRef, handleContextMenu };
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

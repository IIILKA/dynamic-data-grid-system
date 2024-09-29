import { Menu, rem } from '@mantine/core';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCopy,
  IconPencil,
  IconTrash
} from '@tabler/icons-react';
import { ForwardedRef, forwardRef, ReactElement } from 'react';
import { MenuRef } from '../../core/hooks/menu-hook.ts';
import useDataGridHeadMenu from '../hooks/data-grid-head-menu-hook.ts';
import DataGridColumnModel from '../models/data-grid-column-model.ts';
import DataGridModel from '../models/data-grid-model.ts';

type DaraGridHeadMenuProps = {
  children: ReactElement;
  dataGrid: DataGridModel;
  dataGridColumn: DataGridColumnModel;
};

export default forwardRef(function DaraGridHeadMenu(
  { children, dataGrid, dataGridColumn }: DaraGridHeadMenuProps,
  ref: ForwardedRef<MenuRef>
) {
  const { menu, menuRef, handleDeleteColumnClick } = useDataGridHeadMenu({
    dataGrid,
    dataGridColumn,
    ref
  });

  return (
    <Menu opened={menu.isOpened} offset={0} shadow='md'>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown
        ref={menuRef}
        w='15%'
        style={{
          left: menu.offsetX + 'px'
        }}>
        <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}>
          Edit column
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}>
          Duplicate column
        </Menu.Item>
        <Menu.Item leftSection={<IconArrowLeft style={{ width: rem(14), height: rem(14) }} />}>
          Insert column left
        </Menu.Item>
        <Menu.Item leftSection={<IconArrowRight style={{ width: rem(14), height: rem(14) }} />}>
          Insert column right
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color='red'
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleDeleteColumnClick}>
          Delete column
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});

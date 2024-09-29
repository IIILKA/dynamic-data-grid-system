import { Menu, rem } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconCopy, IconTrash } from '@tabler/icons-react';
import { ForwardedRef, forwardRef, ReactElement } from 'react';
import { MenuRef } from '../../core/hooks/menu-hook.ts';
import useDataGridBodyMenu from '../hooks/data-grid-body-menu-hook.ts';
import DataGridModel from '../models/data-grid-model.ts';

type DaraGridBodyMenuProps = {
  children: ReactElement;
  disableAddNewItemButtons: boolean;
  dataGrid: DataGridModel;
};

export default forwardRef(function DaraGridBodyMenu(
  { disableAddNewItemButtons, children, dataGrid }: DaraGridBodyMenuProps,
  ref: ForwardedRef<MenuRef>
) {
  const { menu, menuRef, handleDeleteRowClick } = useDataGridBodyMenu({ dataGrid, ref });

  return (
    <Menu opened={menu.isOpened}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown
        ref={menuRef}
        style={{
          left: menu.offsetX + 'px',
          top: menu.offsetY + 'px'
        }}>
        <Menu.Item
          leftSection={<IconArrowUp style={{ width: rem(14), height: rem(14) }} />}
          disabled={disableAddNewItemButtons}>
          Insert row above
        </Menu.Item>
        <Menu.Item
          leftSection={<IconArrowDown style={{ width: rem(14), height: rem(14) }} />}
          disabled={disableAddNewItemButtons}>
          Insert row below
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}
          disabled={disableAddNewItemButtons}>
          Duplicate row
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color='red'
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleDeleteRowClick}>
          Delete row
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});

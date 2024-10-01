import { Menu, rem } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconCopy, IconTrash } from '@tabler/icons-react';
import { ForwardedRef, forwardRef, ReactElement } from 'react';
import { MenuRef } from '../../core/hooks/menu-hook.ts';
import useDataGridBodyMenu from '../hooks/data-grid-body-menu-hook.ts';
import DataGridModel from '../models/data-grid-model.ts';
import NormalizedDataGridRowModels from '../models/normalized-data-grid-row-models.ts';

type DaraGridBodyMenuProps = {
  children: ReactElement;
  dataGrid: DataGridModel;
  normalizedDataGridRows: NormalizedDataGridRowModels;
};

export default forwardRef(function DaraGridBodyMenu(
  { children, dataGrid, normalizedDataGridRows }: DaraGridBodyMenuProps,
  ref: ForwardedRef<MenuRef>
) {
  const {
    menu,
    menuRef,
    areAddNewItemButtonsDisabled,
    handleDeleteRowClickAsync,
    handleDuplicateRowClickAsync,
    handleInsertRowClickAsync
  } = useDataGridBodyMenu({ dataGrid, normalizedDataGridRows, ref });

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
          disabled={areAddNewItemButtonsDisabled}
          onClick={() => handleInsertRowClickAsync(true)}>
          Insert row above
        </Menu.Item>
        <Menu.Item
          leftSection={<IconArrowDown style={{ width: rem(14), height: rem(14) }} />}
          disabled={areAddNewItemButtonsDisabled}
          onClick={() => handleInsertRowClickAsync(false)}>
          Insert row below
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}
          disabled={areAddNewItemButtonsDisabled}
          onClick={handleDuplicateRowClickAsync}>
          Duplicate row
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color='red'
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleDeleteRowClickAsync}>
          Delete row
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});

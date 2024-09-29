import { Menu, rem } from '@mantine/core';
import { IconCopy, IconPencil, IconShare2, IconTrash } from '@tabler/icons-react';
import { forwardRef, ReactElement } from 'react';
import useDaraGridsItemMenu from '../hooks/data-grids-item-menu-hook.ts';
import DataGridLightModel from '../models/data-grid-light-model.ts';

type DaraGridsItemMenuProps = {
  children: ReactElement;
  lightDataGrid: DataGridLightModel;
};

export default forwardRef(function DaraGridsItemMenu({
  children,
  lightDataGrid
}: DaraGridsItemMenuProps) {
  const { handleDeleteClickAsync } = useDaraGridsItemMenu({ lightDataGrid });

  return (
    <Menu withinPortal position='bottom-end' shadow='sm'>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
        <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}>
          Rename data grid
        </Menu.Item>
        <Menu.Item leftSection={<IconShare2 style={{ width: rem(14), height: rem(14) }} />}>
          Share data grid
        </Menu.Item>
        <Menu.Item leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}>
          Duplicate data grid
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color='red'
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleDeleteClickAsync}>
          Delete data grid
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});

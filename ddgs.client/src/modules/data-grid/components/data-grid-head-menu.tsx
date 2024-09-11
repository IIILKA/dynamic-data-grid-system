import { Menu, rem } from '@mantine/core';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCopy,
  IconTrash,
  IconPencil
} from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  SetStateAction,
  useImperativeHandle,
  useState
} from 'react';
import {
  DataGridColumnDto,
  DataGridDto,
  useRemoveColumnFromDataGridMutation
} from '../../api/resource-api-slice.ts';

interface DaraGridHeadMenuProps {
  children: ReactElement;
  dataGrid: DataGridDto;
  dataGridColumn: DataGridColumnDto;
}

interface MenuProps {
  isOpened: boolean;
  offsetX?: number;
}

export interface DaraGridHeadMenuRef {
  setMenu(value: SetStateAction<MenuProps>): void;
}

export default forwardRef(function DaraGridHeadMenu(
  { children, dataGrid, dataGridColumn }: DaraGridHeadMenuProps,
  ref: ForwardedRef<DaraGridHeadMenuRef>
) {
  const [menu, setMenu] = useState<MenuProps>({
    isOpened: false
  });
  useImperativeHandle<DaraGridHeadMenuRef, DaraGridHeadMenuRef>(ref, () => ({ setMenu }));
  const menuRef = useClickOutside(() => setMenu({ isOpened: false }));

  const [removeColumnFromDataGrid] = useRemoveColumnFromDataGridMutation();

  const onDeleteTestClicked = async () => {
    setMenu({ isOpened: false });
    await removeColumnFromDataGrid({ dataGridId: dataGrid.id, colName: dataGridColumn.name });
  };

  return (
    <Menu opened={menu.isOpened} offset={0}>
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
          onClick={onDeleteTestClicked}>
          Delete column
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});

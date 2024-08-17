import { Menu, rem } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconCopy, IconTrash } from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  SetStateAction,
  useImperativeHandle,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { useDeleteTestMutation } from '../../api/resource-api-slice.ts';
import { selectSelectedCell } from '../data-grid-slice.ts';

interface DaraGridBodyMenuProps {
  children: ReactElement;
  disableAddNewItemButtons: boolean;
}

interface MenuProps {
  isOpened: boolean;
  offsetX?: number;
  offsetY?: number;
}

export interface DaraGridBodyMenuRef {
  setMenu(value: SetStateAction<MenuProps>): void;
}

export default forwardRef(function DaraGridBodyMenu(
  { disableAddNewItemButtons, children }: DaraGridBodyMenuProps,
  ref: ForwardedRef<DaraGridBodyMenuRef>
) {
  const selectedCell = useSelector(selectSelectedCell);

  const [menu, setMenu] = useState<MenuProps>({
    isOpened: false
  });

  useImperativeHandle<DaraGridBodyMenuRef, DaraGridBodyMenuRef>(ref, () => ({ setMenu }));

  const menuRef = useClickOutside(() => setMenu({ isOpened: false }));

  const [deleteRow] = useDeleteTestMutation();

  const onDeleteTestClicked = async () => {
    setMenu({ isOpened: false });
    await deleteRow(selectedCell!.rowId);
  };

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
          Insert test above
        </Menu.Item>
        <Menu.Item
          leftSection={<IconArrowDown style={{ width: rem(14), height: rem(14) }} />}
          disabled={disableAddNewItemButtons}>
          Insert test above
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}
          disabled={disableAddNewItemButtons}>
          Duplicate test
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color='red'
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          onClick={onDeleteTestClicked}>
          Delete test
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});

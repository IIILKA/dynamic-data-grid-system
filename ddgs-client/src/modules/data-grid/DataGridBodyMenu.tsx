import { Menu, rem } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconCopy, IconTrash } from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';
import { ForwardedRef, forwardRef, ReactElement, SetStateAction, useImperativeHandle, useState } from 'react';

interface DaraGridBodyMenuProps {
    children: ReactElement;
    disableAddNewItemButtons: boolean;

    onClickDeleteRow(): void;

    onClickDuplicateRow(): void;
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
    { onClickDeleteRow, onClickDuplicateRow, disableAddNewItemButtons, children }: DaraGridBodyMenuProps,
    ref: ForwardedRef<DaraGridBodyMenuRef>
) {
    const [menu, setMenu] = useState<MenuProps>({
        isOpened: false
    });

    useImperativeHandle<DaraGridBodyMenuRef, DaraGridBodyMenuRef>(ref, () => ({ setMenu }));

    const menuRef = useClickOutside(() => setMenu({ isOpened: false }));

    return (
        <Menu opened={menu.isOpened}>
            <Menu.Target>{children}</Menu.Target>
            <Menu.Dropdown
                ref={menuRef}
                style={{
                    left: menu.offsetX + 'px',
                    top: menu.offsetY + 'px'
                }}>
                <Menu.Item leftSection={<IconArrowUp style={{ width: rem(14), height: rem(14) }} />} disabled={disableAddNewItemButtons}>
                    Insert test above
                </Menu.Item>
                <Menu.Item leftSection={<IconArrowDown style={{ width: rem(14), height: rem(14) }} />} disabled={disableAddNewItemButtons}>
                    Insert test above
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}
                    onClick={() => {
                        setMenu({ isOpened: false });
                        onClickDuplicateRow();
                    }}
                    disabled={disableAddNewItemButtons}>
                    Duplicate test
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    color='red'
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    onClick={() => {
                        setMenu({ isOpened: false });
                        onClickDeleteRow();
                    }}>
                    Delete test
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
});

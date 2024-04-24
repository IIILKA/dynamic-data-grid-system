import { Menu, rem } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconCopy, IconTrash } from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';

interface DaraGridBodyMenuProps {
    offsetX?: number;
    offsetY?: number;
    onClickOutside: () => void;
    onClickDeleteRow: () => void;
    onClickDuplicateRow: () => void;
    disableAddNewItemButtons: boolean;
}

export default function DaraGridBodyMenu({
    offsetX,
    offsetY,
    onClickOutside,
    onClickDeleteRow,
    onClickDuplicateRow,
    disableAddNewItemButtons
}: DaraGridBodyMenuProps) {
    const menuRef = useClickOutside(onClickOutside);

    return (
        <Menu.Dropdown
            ref={menuRef}
            style={{
                left: offsetX + 'px',
                top: offsetY + 'px'
            }}
        >
            <Menu.Item
                leftSection={<IconArrowUp style={{ width: rem(14), height: rem(14) }} />}
                disabled={disableAddNewItemButtons}
            >
                Insert test above
            </Menu.Item>
            <Menu.Item
                leftSection={<IconArrowDown style={{ width: rem(14), height: rem(14) }} />}
                disabled={disableAddNewItemButtons}
            >
                Insert test above
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}
                onClick={onClickDuplicateRow}
                disabled={disableAddNewItemButtons}
            >
                Duplicate test
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                color='red'
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                onClick={onClickDeleteRow}
            >
                Delete test
            </Menu.Item>
        </Menu.Dropdown>
    );
}

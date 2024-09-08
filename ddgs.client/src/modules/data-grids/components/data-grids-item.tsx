import { selectDataGridById, useDeleteDataGridMutation } from '../../api/resource-api-slice.ts';
import { ActionIcon, Avatar, Card, Flex, Group, Menu, rem, Text } from '@mantine/core';
import { IconCopy, IconDots, IconShare2, IconPencil, IconTrash } from '@tabler/icons-react';
import { useAppSelector } from '../../../app/hooks.ts';

export interface DataGridsItemProps {
  dataGridId: string;
}

export default function DataGridsItem({ dataGridId }: DataGridsItemProps) {
  const dataGrid = useAppSelector(selectDataGridById(dataGridId))!;
  const [deleteDataGrid] = useDeleteDataGridMutation();

  if (!dataGrid) {
    return null;
  }

  return (
    <Card withBorder shadow='sm' radius='md' py={24} style={{ cursor: 'pointer' }}>
      <Flex direction='row' w='100%' justify='space-between' align='stretch' gap={16}>
        <Avatar src={null} size={64} radius='sm' name={dataGrid.name} color='initials' />
        <Flex direction='column' justify='space-between' flex='1 0 auto'>
          <Group justify='space-between'>
            <Text fw={700}>{dataGrid.name}</Text>
            <Menu withinPortal position='bottom-end' shadow='sm'>
              <Menu.Target>
                <ActionIcon variant='subtle' color='gray'>
                  <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
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
                  onClick={() => deleteDataGrid(dataGrid.id)}>
                  Delete data grid
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Flex direction='row-reverse'>
            <Text size='xs'>{dataGrid.ownerUsername}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

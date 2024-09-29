import { ActionIcon, Avatar, Card, Flex, Group, Menu, rem, Text } from '@mantine/core';
import { IconCopy, IconDots, IconPencil, IconShare2, IconTrash } from '@tabler/icons-react';
import useDataGridsItem from '../hooks/data-grids-item-hook.ts';
import DataGridLightModel from '../models/data-grid-light-model.ts';

export type DataGridsItemProps = {
  lightDataGrid: DataGridLightModel;
};

export default function DataGridsItem({ lightDataGrid }: DataGridsItemProps) {
  const { handleCardClick, handleDeleteClickAsync } = useDataGridsItem({
    lightDataGrid
  });

  return (
    <Card
      withBorder
      shadow='sm'
      radius='md'
      py={24}
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}>
      <Flex direction='row' w='100%' justify='space-between' align='stretch' gap={16}>
        <Avatar src={null} size={64} radius='sm' name={lightDataGrid.name} color='initials' />
        <Flex direction='column' justify='space-between' flex='1 0 auto'>
          <Group justify='space-between'>
            <Text fw={700}>{lightDataGrid.name}</Text>
            {/*TODO: вынести в отдельную компоненту*/}
            <Menu withinPortal position='bottom-end' shadow='sm'>
              <Menu.Target>
                <ActionIcon variant='subtle' color='gray' onClick={(e) => e.stopPropagation()}>
                  <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              </Menu.Target>

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
          </Group>
          <Flex direction='row-reverse'>
            <Text size='xs'>{lightDataGrid.ownerUsername}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

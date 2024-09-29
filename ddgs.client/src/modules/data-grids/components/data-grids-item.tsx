import { ActionIcon, Avatar, Card, Flex, Group, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import useDataGridsItem from '../hooks/data-grids-item-hook.ts';
import DataGridLightModel from '../models/data-grid-light-model.ts';
import DataGridsItemMenu from './data-grids-item-menu.tsx';

export type DataGridsItemProps = {
  lightDataGrid: DataGridLightModel;
};

export default function DataGridsItem({ lightDataGrid }: DataGridsItemProps) {
  const { handleCardClick } = useDataGridsItem({
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
            <DataGridsItemMenu lightDataGrid={lightDataGrid}>
              <ActionIcon variant='subtle' color='gray' onClick={(e) => e.stopPropagation()}>
                <IconDots width={16} height={16} />
              </ActionIcon>
            </DataGridsItemMenu>
          </Group>
          <Flex direction='row-reverse'>
            <Text size='xs'>{lightDataGrid.ownerUsername}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

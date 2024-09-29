import { Button, Flex, ScrollArea, Table } from '@mantine/core';
import { useDataGrid } from '../hooks/data-grid-hook.ts';
import DataGridModel from '../models/data-grid-model.ts';
import NormalizedDataGridRowModels from '../models/normalized-data-grid-row-models.ts';
import DataGridAddColumnPopover from './data-grid-add-column-popover.tsx';
import DataGridBody from './data-grid-body.tsx';
import DataGridHead from './data-grid-head.tsx';

type DataGridProps = {
  dataGrid: DataGridModel;
  normalizedDataGridRows: NormalizedDataGridRowModels;
};

export default function DataGrid({ dataGrid, normalizedDataGridRows }: DataGridProps) {
  const { handleAddNewRowButtonClick, isAddColumnLoading, popoverRef, handleAddColumnButtonClick } =
    useDataGrid({
      dataGrid,
      rowsCount: normalizedDataGridRows.ids.length
    });

  return (
    <>
      <ScrollArea w='100%' type='never'>
        <Flex direction='row'>
          <Flex direction='column' flex='1 0 auto'>
            <Table highlightOnHover withColumnBorders withRowBorders withTableBorder>
              <DataGridHead dataGrid={dataGrid} />
              <DataGridBody dataGrid={dataGrid} normalizedDataGridRows={normalizedDataGridRows} />
            </Table>
            <Button
              variant='filled'
              color='teal'
              radius={0}
              fullWidth
              onClick={handleAddNewRowButtonClick}>
              Add
            </Button>
          </Flex>
          <DataGridAddColumnPopover ref={popoverRef} dataGrid={dataGrid}>
            <Button
              loading={isAddColumnLoading}
              loaderProps={{ type: 'dots' }}
              variant='filled'
              color='teal'
              radius={0}
              onClick={handleAddColumnButtonClick}>
              +
            </Button>
          </DataGridAddColumnPopover>
        </Flex>
      </ScrollArea>
    </>
  );
}

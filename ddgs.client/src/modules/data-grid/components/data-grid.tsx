import { Button, Flex, ScrollArea, Table } from '@mantine/core';
import {
  DataGridColumnDto,
  DataGridColumnType,
  DataGridDto,
  DataGridRowDto,
  useCreateDataGridRowMutation
} from '../../api/resource-api-slice.ts';
import DataGridHead from './data-grid-head.tsx';
import DataGridBody from './data-grid-body.tsx';
import { DataGridCellType } from '../../seed-data/data-grid-cell-type.ts';
import { useRef } from 'react';
import DataGridAddColumnPopover, {
  DataGridAddColumnPopoverRef
} from './data-grid-add-column-popover.tsx';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectDataGridColumnIsLoading } from '../../loading/loading-slice.ts';

interface DataGridProps {
  dataGrid: DataGridDto;
  sortedIds: string[];
  dataGridRows: { [key: string]: DataGridRowDto };
}

export default function DataGrid({ dataGrid, sortedIds, dataGridRows }: DataGridProps) {
  const [createDataGridRow] = useCreateDataGridRowMutation();
  const isAddColimnLoadig = useAppSelector(selectDataGridColumnIsLoading);

  async function handleAddEntityClicked() {
    const defaultRow = createDefaultRow(dataGrid.columns);
    await createDataGridRow({ dataGridId: dataGrid.id, payload: defaultRow });
  }

  const popoverRef = useRef<DataGridAddColumnPopoverRef | null>(null);

  return (
    <>
      <ScrollArea w='100%' type='never'>
        <Flex direction='row'>
          <Flex direction='column' flex='1 0 auto'>
            <Table highlightOnHover withColumnBorders withRowBorders withTableBorder>
              <DataGridHead dataGrid={dataGrid} />
              <DataGridBody dataGrid={dataGrid} sortedIds={sortedIds} dataGridRows={dataGridRows} />
            </Table>
            <Button
              variant='filled'
              color='teal'
              radius={0}
              fullWidth
              onClick={handleAddEntityClicked}>
              Add
            </Button>
          </Flex>
          <DataGridAddColumnPopover ref={popoverRef} dataGrid={dataGrid}>
            <Button
              loading={isAddColimnLoadig}
              loaderProps={{ type: 'dots' }}
              variant='filled'
              color='teal'
              radius={0}
              onClick={() => {
                popoverRef.current!.setPopover({ isOpened: true });
              }}>
              +
            </Button>
          </DataGridAddColumnPopover>
        </Flex>
      </ScrollArea>
    </>
  );
}

function createDefaultRow(columns: DataGridColumnDto[]): { [key: string]: DataGridCellType } {
  const defaultRow: { [key: string]: DataGridCellType } = {};

  columns.forEach((column) => {
    switch (column.type) {
      case DataGridColumnType.Text:
        defaultRow[column.name] = '';
        break;
      case DataGridColumnType.Number:
        defaultRow[column.name] = 0;
        break;
      case DataGridColumnType.Boolean:
        defaultRow[column.name] = false;
        break;
    }
  });

  return defaultRow;
}

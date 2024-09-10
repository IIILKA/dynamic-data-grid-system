import { NumberInput, Table, TextInput, Checkbox, Center } from '@mantine/core';
import { styled } from 'styled-components';
import { selectCell } from '../data-grid-slice.ts';
import {
  resourceApiSlice,
  selectTestById,
  tableEntityAdapter,
  useUpdateTestMutation
} from '../../api/resource-api-slice.ts';
import { DataGridCellType } from '../../seed-data/data-grid-cell-type.ts';
import { RootState } from '../../../app/store.ts';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/debounce.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';

const DataGridCellContainer = styled.div`
  cursor: default;
  border: 1px solid transparent;

  & {
    input {
      cursor: default;
      padding-left: 0.5rem;

      &[type='checkbox'] {
        cursor: pointer;
      }
    }
  }

  &.active {
    input {
      cursor: text;

      &[type='checkbox'] {
        cursor: pointer;
      }
    }

    border: 1px solid dodgerblue;
    background-color: var(--mantine-color-default);
  }
`;

interface DataGridBodyCellProps {
  rowId: string;
  colName: string;
  isActive: boolean;
}

export default function OldDataGridBodyCell({ rowId, colName, isActive }: DataGridBodyCellProps) {
  const dispatch = useAppDispatch();
  const [updateRow] = useUpdateTestMutation();
  const entity = useAppSelector((state: RootState) => selectTestById(state, rowId));
  const debounce = useDebounce(entity[colName]);
  const [changeValueServerHandled, setChangeValueServerHandled] = useState(true);

  useEffect(() => {
    if (!changeValueServerHandled) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...entityUpdatePayload } = entity;
      updateRow({ id: rowId, entityUpdatePayload }).then(() => setChangeValueServerHandled(true));
    }
  }, [debounce]); // eslint-disable-line

  async function handleChangeValue(newValue: DataGridCellType) {
    setChangeValueServerHandled(false);
    const { id, ...entityUpdatePayload } = entity;
    entityUpdatePayload[colName] = newValue;
    dispatch(
      resourceApiSlice.util?.updateQueryData('getTests', undefined, (draft) => {
        tableEntityAdapter.updateOne(draft, { id, changes: entityUpdatePayload });
      })
    );
  }

  function getCellControl(value: DataGridCellType) {
    switch (typeof value) {
      case 'string':
        return (
          <DataGridCellContainer className={isActive ? 'active' : ''}>
            <TextInput
              variant='unstyled'
              value={value}
              onChange={(e) => handleChangeValue(e.currentTarget.value)}
            />
          </DataGridCellContainer>
        );
      case 'number':
        return (
          <DataGridCellContainer className={isActive ? 'active' : ''}>
            <NumberInput
              variant='unstyled'
              value={value}
              defaultValue={0}
              onChange={(value) => handleChangeValue(typeof value === 'number' ? value : 0)}
            />
          </DataGridCellContainer>
        );
      case 'boolean':
        return (
          <DataGridCellContainer className={isActive ? 'active' : ''}>
            <Center style={{ padding: '0.5rem' }}>
              <Checkbox
                color='teal'
                checked={value}
                onChange={(e) => handleChangeValue(e.currentTarget.checked)}
              />
            </Center>
          </DataGridCellContainer>
        );
    }
  }

  return (
    <Table.Td
      style={{ padding: 0 }}
      onClick={() => dispatch(selectCell({ rowId: rowId, colName: colName }))}
      onContextMenu={() => dispatch(selectCell({ rowId: rowId, colName: colName }))}>
      {getCellControl(entity[colName])}
    </Table.Td>
  );
}

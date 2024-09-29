import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import DataGridRowUpdateArgs from '../../api/args/data-grid-row-update-args.ts';
import { useUpdateDataGridRowMutation } from '../../api/resource-api-slice.ts';
import { useDebounce } from '../../core/hooks/debounce-hook.ts';
import { selectCell, selectSelectedCell } from '../data-grid-slice.ts';
import DataGridCellValueType from '../models/data-grid-cell-value-type.ts';
import DataGridModel from '../models/data-grid-model.ts';
import DataGridRowIdType from '../models/data-grid-row-id-type.ts';

type dataGridBodyCellHookProps = {
  dataGrid: DataGridModel;
  rowId: DataGridRowIdType;
  cellValue: DataGridCellValueType;
  colName: string;
};

export function useDataGridBodyCell({
  dataGrid,
  rowId,
  cellValue,
  colName
}: dataGridBodyCellHookProps) {
  const [value, setValue] = useState(cellValue);
  const debounce = useDebounce(value);
  const [updateDataGridRow] = useUpdateDataGridRowMutation();
  const [changeValueServerHandled, setChangeValueServerHandled] = useState(true);
  const dispatch = useAppDispatch();
  const selectedCell = useAppSelector(selectSelectedCell);

  useEffect(() => {
    if (!changeValueServerHandled) {
      updateDataGridRow({
        id: rowId,
        dataGridId: dataGrid.id,
        body: {
          rowData: { [colName]: value }
        }
      } satisfies DataGridRowUpdateArgs).then(() => setChangeValueServerHandled(true));
    }
  }, [debounce]); // eslint-disable-line

  function handleChangeValue(newValue: DataGridCellValueType) {
    setChangeValueServerHandled(false);
    setValue(newValue);
  }

  const handleSelectCell = () => {
    dispatch(selectCell({ rowId: rowId, colName: colName }));
  };

  const isActive = rowId === selectedCell?.rowId && colName === selectedCell?.colName;

  return { value, isActive, handleChangeValue, handleSelectCell };
}

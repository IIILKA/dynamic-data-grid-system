import DataGridCellValueType from '../models/data-grid-cell-value-type.ts';
import DataGridColumnModel from '../models/data-grid-column-model.ts';
import DataGridColumnType from '../models/data-grid-column-type.ts';
import DataGridRowData from '../models/data-grid-row-data.ts';

export function createDefaultRowData(columns: DataGridColumnModel[]): DataGridRowData {
  const defaultRow: { [key: string]: DataGridCellValueType } = {};

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

import DataGridRowData from './data-grid-row-data.ts';
import DataGridRowIdType from './data-grid-row-id-type.ts';

type DataGridRowModel = {
  id: DataGridRowIdType;
  rowData: DataGridRowData;
};

export default DataGridRowModel;

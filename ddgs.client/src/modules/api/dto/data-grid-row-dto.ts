import DataGridRowData from '../../data-grid/models/data-grid-row-data.ts';

type DataGridRowDto = {
  id: string;
  index: number;
  rowData: DataGridRowData;
};

export default DataGridRowDto;

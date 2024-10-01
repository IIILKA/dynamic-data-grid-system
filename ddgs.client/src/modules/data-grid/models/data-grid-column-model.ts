import DataGridColumnType from './data-grid-column-type.ts';

type DataGridColumnModel = {
  index: number;
  name: string;
  type: DataGridColumnType;
};

export default DataGridColumnModel;

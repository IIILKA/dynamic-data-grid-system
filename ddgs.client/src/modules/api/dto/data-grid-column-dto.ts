import DataGridColumnType from '../../data-grid/models/data-grid-column-type.ts';

type DataGridColumnDto = {
  index: number;
  name: string;
  type: DataGridColumnType;
};

export default DataGridColumnDto;

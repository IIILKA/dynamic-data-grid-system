import DataGridColumnType from '../../data-grid/models/data-grid-column-type.ts';
import DataGridIdType from '../../data-grid/models/data-grid-id-type.ts';

type DataGridAddColumnArgs = {
  id: DataGridIdType;
  body: {
    name: string;
    type: DataGridColumnType;
  };
};

export default DataGridAddColumnArgs;

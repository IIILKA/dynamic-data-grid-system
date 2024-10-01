import DataGridIdType from '../../data-grid/models/data-grid-id-type.ts';
import DataGridRowIdType from '../../data-grid/models/data-grid-row-id-type.ts';

type DataGridRowDeleteArgs = {
  id: DataGridRowIdType;
  dataGridId: DataGridIdType;
};

export default DataGridRowDeleteArgs;

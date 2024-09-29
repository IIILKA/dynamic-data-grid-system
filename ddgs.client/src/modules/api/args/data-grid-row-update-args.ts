import DataGridIdType from '../../data-grid/models/data-grid-id-type.ts';
import DataGridRowData from '../../data-grid/models/data-grid-row-data.ts';
import DataGridRowIdType from '../../data-grid/models/data-grid-row-id-type.ts';

type DataGridRowUpdateArgs = {
  id: DataGridRowIdType;
  dataGridId: DataGridIdType;
  body: {
    rowData: DataGridRowData;
  };
};

export default DataGridRowUpdateArgs;

import DataGridIdType from '../../data-grid/models/data-grid-id-type.ts';
import DataGridRowData from '../../data-grid/models/data-grid-row-data.ts';

type DataGridRowCreateArgs = {
  dataGridId: DataGridIdType;
  body: {
    rowData: DataGridRowData;
  };
};

export default DataGridRowCreateArgs;

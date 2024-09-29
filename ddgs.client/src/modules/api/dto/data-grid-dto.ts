import DataGridColumnDto from './data-grid-column-dto.ts';

type DataGridDto = {
  id: string;
  name: string;
  ownerUsername: string;
  dateCreated: string;
  columns: DataGridColumnDto[];
};

export default DataGridDto;

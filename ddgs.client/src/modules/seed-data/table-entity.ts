import { TableCellType } from './table-cell-type.ts';

export default interface TableEntity {
  [key: string]: TableCellType;

  id: string;
  index: number;
}

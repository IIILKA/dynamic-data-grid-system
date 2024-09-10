import { DataGridCellType } from './data-grid-cell-type.ts';

export default interface OldTableEntity {
  [key: string]: DataGridCellType;

  id: string;
  index: number;
}

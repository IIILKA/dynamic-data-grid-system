import { TableCellType } from './TableCellType';

export default interface TableEntity {
    [key: string]: TableCellType;

    id: string;
    index: number;
};

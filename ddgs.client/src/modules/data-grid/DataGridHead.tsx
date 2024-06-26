import { Table } from '@mantine/core';
import { nameOf } from '../../utils/NameOfHelper';
import TableEntity from '../seed-data/TableEntity';

interface DataGridHeadProps {
  propNames: string[];
}

export default function DataGridHead<T extends TableEntity>({ propNames }: DataGridHeadProps) {
  function getHeadColName(fieldName: string): string {
    const tmpStr = fieldName.replace(/([A-Z])/g, ' $1');
    return tmpStr.charAt(0).toUpperCase() + tmpStr.slice(1);
  }

  return (
    <Table.Thead>
      <Table.Tr>
        {propNames
          .filter((propName) => propName !== nameOf<T>('id') && propName !== nameOf<T>('index'))
          .map((propName) => (
            <Table.Th key={propName}>{getHeadColName(propName)}</Table.Th>
          ))}
      </Table.Tr>
    </Table.Thead>
  );
}

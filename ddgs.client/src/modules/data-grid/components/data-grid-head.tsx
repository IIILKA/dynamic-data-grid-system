import { Table } from '@mantine/core';

interface DataGridHeadProps {
  propNames: string[];
}

export default function DataGridHead({ propNames }: DataGridHeadProps) {
  return (
    <Table.Thead>
      <Table.Tr>
        {propNames.map((propName) => (
          <Table.Th key={propName}>{propName}</Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
}

import { Center, Checkbox } from '@mantine/core';

type DataGridBodyBooleanCellProps = {
  value: boolean;
  onChange: (newValue: boolean) => void;
};

export default function DataGridBodyBooleanCell({ value, onChange }: DataGridBodyBooleanCellProps) {
  return (
    <Center p={8}>
      <Checkbox color='teal' checked={value} onChange={(e) => onChange(e.currentTarget.checked)} />
    </Center>
  );
}

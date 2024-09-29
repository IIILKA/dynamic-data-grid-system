import { TextInput } from '@mantine/core';

type DataGridBodyTextCellProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function DataGridBodyTextCell({ value, onChange }: DataGridBodyTextCellProps) {
  return (
    <TextInput variant='unstyled' value={value} onChange={(e) => onChange(e.currentTarget.value)} />
  );
}

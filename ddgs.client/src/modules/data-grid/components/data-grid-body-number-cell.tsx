import { NumberInput } from '@mantine/core';

type DataGridBodyNumberCellProps = {
  value: number;
  onChange: (newValue: number) => void;
};

export default function DataGridBodyNumberCell({ value, onChange }: DataGridBodyNumberCellProps) {
  return (
    <NumberInput
      variant='unstyled'
      value={value}
      defaultValue={0}
      clampBehavior='strict'
      max={2147483647} //max int value in .NET
      onChange={(value) => onChange(typeof value === 'number' ? value : 0)}
    />
  );
}

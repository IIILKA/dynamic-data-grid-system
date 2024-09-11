import { Button, Flex, Input, Popover, Select } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  dataGridAddColumnFormSchema,
  DataGridAddColumnFormSchema
} from '../forms/data-grid-add-column-form-schema.ts';
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  SetStateAction,
  useImperativeHandle,
  useState
} from 'react';
import { useClickOutside } from '@mantine/hooks';
import {
  DataGridColumnType,
  DataGridDto,
  useAddColumnToDataGridMutation
} from '../../api/resource-api-slice.ts';

interface DataGridAddColumnPopoverProps {
  children: ReactElement;
  dataGrid: DataGridDto;
}

interface PopoverProps {
  isOpened: boolean;
}

export interface DataGridAddColumnPopoverRef {
  setPopover(value: SetStateAction<PopoverProps>): void;
}

export default forwardRef(function DataGridAddColumnPopover(
  { children, dataGrid }: DataGridAddColumnPopoverProps,
  ref: ForwardedRef<DataGridAddColumnPopoverRef>
) {
  const [popover, setPopover] = useState<PopoverProps>({
    isOpened: false
  });

  useImperativeHandle<DataGridAddColumnPopoverRef, DataGridAddColumnPopoverRef>(ref, () => ({
    setPopover
  }));

  const popoverRef = useClickOutside(() => setPopover({ isOpened: false }));

  const [addColumnToDataGrid] = useAddColumnToDataGridMutation();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<DataGridAddColumnFormSchema>({ resolver: zodResolver(dataGridAddColumnFormSchema) });

  const onSubmit: SubmitHandler<DataGridAddColumnFormSchema> = async () => {
    setPopover({ isOpened: false });
    await addColumnToDataGrid({
      dataGridId: dataGrid.id,
      payload: { name: getValues().name, type: DataGridColumnType[getValues().type] }
    });
  };

  return (
    <Popover opened={popover.isOpened} position='bottom-end' onClose={reset}>
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown ref={popoverRef} w='20%'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' align='center'>
            <Input.Wrapper size='md' w='100%' mb='10px' error={errors.name?.message}>
              <Input {...register('name')} placeholder='Column name' error={!!errors.name} />
            </Input.Wrapper>
            <Select
              comboboxProps={{ withinPortal: false }}
              w='100%'
              placeholder='Column type'
              {...register('type')}
              error={errors.type?.message}
              data={[
                { value: `${DataGridColumnType[DataGridColumnType.Text]}`, label: 'Text' },
                { value: `${DataGridColumnType[DataGridColumnType.Number]}`, label: 'Number' },
                { value: `${DataGridColumnType[DataGridColumnType.Boolean]}`, label: 'Checkbox' }
              ]}
              onChange={(value) => {
                setValue('type', value, { shouldValidate: true, shouldDirty: true });
              }}
            />
            <Flex mt='10px' gap={8} direction='row' justify='end' w='100%'>
              <Button variant='default' onClick={() => setPopover({ isOpened: false })}>
                Cancel
              </Button>
              <Button color='teal' type='submit'>
                Create
              </Button>
            </Flex>
          </Flex>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
});

import { Button, Flex, Input, Select } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import DataGridColumnType from '../models/data-grid-column-type.ts';
import { DataGridAddColumnFormSchema } from './data-grid-add-column-form-schema.ts';

type DataGridAddColumnFormProps = {
  formMethods: UseFormReturn<DataGridAddColumnFormSchema>;
  onSubmitForm: () => void;
  onCancelButtonClick: () => void;
};

export default function DataGridAddColumnForm({
  formMethods,
  onSubmitForm,
  onCancelButtonClick
}: DataGridAddColumnFormProps) {
  const {
    register,
    formState: { errors },
    setValue
  } = formMethods;

  return (
    <form onSubmit={onSubmitForm}>
      <Flex direction='column' align='center'>
        <Input.Wrapper size='md' w='100%' mb={10} error={errors.name?.message}>
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
          defaultValue=''
          onChange={(value) => {
            setValue('type', value, { shouldValidate: true, shouldDirty: true });
          }}
        />

        <Flex mt='10px' gap={8} direction='row' justify='end' w='100%'>
          <Button variant='default' onClick={onCancelButtonClick}>
            Cancel
          </Button>
          <Button color='teal' type='submit'>
            Create
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

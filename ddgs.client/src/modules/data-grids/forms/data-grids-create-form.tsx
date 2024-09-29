import { Button, Flex, Input } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { DataGridsCreateFormSchema } from './data-grids-create-form-schema.ts';

type DataGridsCreateFormProps = {
  formMethods: UseFormReturn<DataGridsCreateFormSchema>;
  onSubmit: () => void;
  onCancelButtonClick: () => void;
};

export default function DataGridsCreateForm({
  formMethods,
  onSubmit,
  onCancelButtonClick
}: DataGridsCreateFormProps) {
  const {
    register,
    formState: { errors }
  } = formMethods;

  return (
    <form onSubmit={onSubmit}>
      <Flex direction='column' align='center'>
        <Input.Wrapper
          label='Data grid name'
          size='md'
          w='100%'
          mb='10px'
          error={errors.name?.message}>
          <Input {...register('name')} placeholder='Data grid name' error={!!errors.name} />
        </Input.Wrapper>
        <Flex mt={10} gap={8}>
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

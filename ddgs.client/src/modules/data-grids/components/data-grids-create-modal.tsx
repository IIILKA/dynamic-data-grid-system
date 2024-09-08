import { Button, Flex, Input, Modal } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  dataGridsCreateFormSchema,
  DataGridsCreateFormSchema
} from '../forms/data-grids-create-form-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateDataGridMutation } from '../../api/resource-api-slice.ts';

export interface CreateDataGridsModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function DataGridsCreateModal({ opened, onClose }: CreateDataGridsModalProps) {
  const [createDataGrid] = useCreateDataGridMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<DataGridsCreateFormSchema>({ resolver: zodResolver(dataGridsCreateFormSchema) });

  const onSubmit: SubmitHandler<DataGridsCreateFormSchema> = async () => {
    await createDataGrid({ name: getValues().name });
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title='Create data grid' centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction='column' align='center'>
          <Input.Wrapper
            label='Data grid name'
            size='md'
            w='100%'
            mb='10px'
            error={errors.name?.message}>
            <Input {...register('name')} placeholder='Data grid name' error={!!errors.name} />
          </Input.Wrapper>
          <Button color='teal' mt='10px' type='submit'>
            Create
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}

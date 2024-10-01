import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import DataGridCreateArgs from '../../api/args/data-grid-create-args.ts';
import { useCreateDataGridMutation } from '../../api/resource-api-slice.ts';
import {
  dataGridsCreateFormSchema,
  DataGridsCreateFormSchema
} from '../forms/data-grids-create-form-schema.ts';

type DataGridsCreateModalHookProps = {
  close: () => void;
};

export default function useDataGridsCreateModal({ close }: DataGridsCreateModalHookProps) {
  const formMethods = useForm<DataGridsCreateFormSchema>({
    resolver: zodResolver(dataGridsCreateFormSchema)
  });
  const { handleSubmit, getValues, reset } = formMethods;

  const [createDataGrid] = useCreateDataGridMutation();
  const handleSubmitForm = handleSubmit(async () => {
    close();
    await createDataGrid({ body: { name: getValues().name } } satisfies DataGridCreateArgs);
    reset();
  });

  function cancel() {
    close();
    reset();
  }

  const handleCancelButtonClick = () => {
    cancel();
  };

  const handleModalClose = () => {
    cancel();
  };

  return {
    handleSubmitForm,
    formMethods,
    handleCancelButtonClick,
    handleModalClose
  };
}

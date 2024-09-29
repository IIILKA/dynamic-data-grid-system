import { zodResolver } from '@hookform/resolvers/zod';
import { ForwardedRef } from 'react';
import { useForm } from 'react-hook-form';
import DataGridAddColumnArgs from '../../api/args/data-grid-add-column-args.ts';
import { useAddColumnToDataGridMutation } from '../../api/resource-api-slice.ts';
import { PopoverRef, usePopover } from '../../core/hooks/popover-hook.ts';
import {
  dataGridAddColumnFormSchema,
  DataGridAddColumnFormSchema
} from '../forms/data-grid-add-column-form-schema.ts';
import DataGridColumnType from '../models/data-grid-column-type.ts';
import DataGridModel from '../models/data-grid-model.ts';

type DataGridAddColumnPopoverHookProps = {
  dataGrid: DataGridModel;
  ref: ForwardedRef<PopoverRef>;
};

export default function useDataGridAddColumnPopover({
  dataGrid,
  ref
}: DataGridAddColumnPopoverHookProps) {
  const { popover, popoverRef, setPopover } = usePopover(ref);
  const handleCancelButtonClick = () => setPopover({ isOpened: false });

  const formMethods = useForm<DataGridAddColumnFormSchema>({
    resolver: zodResolver(dataGridAddColumnFormSchema)
  });
  const { handleSubmit, getValues, reset } = formMethods;

  const [addColumnToDataGrid] = useAddColumnToDataGridMutation();

  const handleSubmitForm = handleSubmit(async () => {
    setPopover({ isOpened: false });
    await addColumnToDataGrid({
      id: dataGrid.id,
      body: {
        name: getValues().name,
        type: DataGridColumnType[getValues().type]
      }
    } satisfies DataGridAddColumnArgs);
  });

  return {
    popover,
    popoverRef,
    handleCancelButtonClick,
    handleSubmitForm,
    formMethods,
    reset
  };
}

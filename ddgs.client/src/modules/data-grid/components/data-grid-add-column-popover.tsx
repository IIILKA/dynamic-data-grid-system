import { Popover } from '@mantine/core';
import { ForwardedRef, forwardRef, ReactElement } from 'react';
import { PopoverRef } from '../../core/hooks/popover-hook.ts';
import DataGridAddColumnForm from '../forms/data-grid-add-column-form.tsx';
import useDataGridAddColumnPopover from '../hooks/data-grid-add-column-popover-hook.ts';
import DataGridModel from '../models/data-grid-model.ts';

type DataGridAddColumnPopoverProps = {
  children: ReactElement;
  dataGrid: DataGridModel;
};

export default forwardRef(function DataGridAddColumnPopover(
  { children, dataGrid }: DataGridAddColumnPopoverProps,
  ref: ForwardedRef<PopoverRef>
) {
  const { popover, popoverRef, handleCancelButtonClick, handleSubmitForm, formMethods, reset } =
    useDataGridAddColumnPopover({ dataGrid, ref });

  return (
    <Popover opened={popover.isOpened} position='bottom-end' onClose={reset}>
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown ref={popoverRef} w='20%'>
        <DataGridAddColumnForm
          formMethods={formMethods}
          onSubmitForm={handleSubmitForm}
          onCancelButtonClick={handleCancelButtonClick}
        />
      </Popover.Dropdown>
    </Popover>
  );
});

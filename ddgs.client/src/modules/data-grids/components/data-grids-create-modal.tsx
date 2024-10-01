import { Modal } from '@mantine/core';
import DataGridsCreateForm from '../forms/data-grids-create-form.tsx';
import useDataGridsCreateModal from '../hooks/data-grids-create-modal-hook.ts';

export type DataGridsCreateModalProps = {
  opened: boolean;
  onClose: () => void;
};

export default function DataGridsCreateModal({ opened, onClose }: DataGridsCreateModalProps) {
  const { handleSubmitForm, formMethods, handleCancelButtonClick, handleModalClose } =
    useDataGridsCreateModal({
      close: onClose
    });

  return (
    <Modal opened={opened} onClose={handleModalClose} title='Create data grid' centered>
      <DataGridsCreateForm
        formMethods={formMethods}
        onSubmit={handleSubmitForm}
        onCancelButtonClick={handleCancelButtonClick}
      />
    </Modal>
  );
}

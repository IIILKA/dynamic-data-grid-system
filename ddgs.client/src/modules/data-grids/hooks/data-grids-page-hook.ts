import { useDisclosure } from '@mantine/hooks';
import { useGetDataGridsQuery } from '../../api/resource-api-slice.ts';
import DataGridLightModel from '../models/data-grid-light-model.ts';

type DataGridsPageHookReturnType = {
  modalOpened: boolean;
  handleCreateDataGridButtonClick: () => void;
  handleModalClose: () => void;
  dataGridItems: DataGridLightModel[];
  isLoading: boolean;
  isSuccess: boolean;
};

export default function useDataGridsPage(): DataGridsPageHookReturnType {
  const [modalOpened, { open, close }] = useDisclosure(false);

  const { data: dataGridItems, isLoading, isSuccess } = useGetDataGridsQuery();

  return {
    modalOpened,
    handleCreateDataGridButtonClick: open,
    handleModalClose: close,
    dataGridItems: dataGridItems as DataGridLightModel[],
    isLoading,
    isSuccess
  };
}

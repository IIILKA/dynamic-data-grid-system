import DataGridDeleteArgs from '../../api/args/data-grid-delete-args.ts';
import { useDeleteDataGridMutation } from '../../api/resource-api-slice.ts';
import DataGridLightModel from '../models/data-grid-light-model.ts';

type DaraGridsItemMenuHookProps = {
  lightDataGrid: DataGridLightModel;
};

export default function useDaraGridsItemMenu({ lightDataGrid }: DaraGridsItemMenuHookProps) {
  const [deleteDataGrid] = useDeleteDataGridMutation();

  const handleDeleteClickAsync = async () => {
    await deleteDataGrid({ id: lightDataGrid.id } satisfies DataGridDeleteArgs);
  };

  return { handleDeleteClickAsync };
}

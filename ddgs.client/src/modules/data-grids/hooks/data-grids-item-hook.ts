import { generatePath, useNavigate } from 'react-router-dom';
import DataGridDeleteArgs from '../../api/args/data-grid-delete-args.ts';
import { useDeleteDataGridMutation } from '../../api/resource-api-slice.ts';
import { Routes } from '../../navigation/routes.ts';
import DataGridLightModel from '../models/data-grid-light-model.ts';

type DataGridsItemHookProps = {
  lightDataGrid: DataGridLightModel;
};

export default function useDataGridsItem({ lightDataGrid }: DataGridsItemHookProps) {
  const navigate = useNavigate();
  const [deleteDataGrid] = useDeleteDataGridMutation();

  const handleCardClick = () => {
    navigate(generatePath(Routes.DataGrid, { id: lightDataGrid.id }));
  };

  const handleDeleteClickAsync = async () => {
    await deleteDataGrid({ id: lightDataGrid.id } satisfies DataGridDeleteArgs);
  };

  return { handleCardClick, handleDeleteClickAsync };
}

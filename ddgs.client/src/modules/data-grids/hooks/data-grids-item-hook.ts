import { generatePath, useNavigate } from 'react-router-dom';
import { Routes } from '../../navigation/routes.ts';
import DataGridLightModel from '../models/data-grid-light-model.ts';

type DataGridsItemHookProps = {
  lightDataGrid: DataGridLightModel;
};

export default function useDataGridsItem({ lightDataGrid }: DataGridsItemHookProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(generatePath(Routes.DataGrid, { id: lightDataGrid.id }));
  };

  return { handleCardClick };
}

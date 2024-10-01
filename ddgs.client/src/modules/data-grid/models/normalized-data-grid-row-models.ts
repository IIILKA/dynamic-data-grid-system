import DataGridRowIdType from './data-grid-row-id-type.ts';
import DataGridRowModel from './data-grid-row-model.ts';

type NormalizedDataGridRowModels = {
  ids: DataGridRowIdType[];
  //TODO: Иследовать способы согласования DataGridRowIdType и [id: string]
  entities: { [id: string]: DataGridRowModel };
};

export default NormalizedDataGridRowModels;

import DataGridColumnModel from './data-grid-column-model.ts';
import DataGridId from './data-grid-id-type.ts';

type DataGridModel = {
  id: DataGridId;
  name: string;
  ownerUsername: string;
  //TODO: подумать об испрользовании типа Date, сейчас это не получается сделать из-за того что Redux может хранить лишь JSON типы
  dateCreated: string;
  columns: DataGridColumnModel[];
};

export default DataGridModel;

import { addDataGridLightModelProfile } from '../api/mappers/data-grid-item-mapper.ts';
import { addDataGridColumnModelProfile } from '../api/mappers/data-grid-column-mapper.ts';
import { addDataGridModelProfile } from '../api/mappers/data-grid-mapper.ts';
import { addDataGridRowModelProfile } from '../api/mappers/data-grid-row-mapper.ts';

export default function addMapperProfiles() {
  addDataGridLightModelProfile();
  addDataGridColumnModelProfile();
  addDataGridModelProfile();
  addDataGridRowModelProfile();
}

import { createMap } from '@automapper/core';
import { PojosMetadataMap } from '@automapper/pojos';
import DataGridLightModel from '../../data-grids/models/data-grid-light-model.ts';
import mapper from '../../mapper/mapper.ts';
import DataGridLightDto from '../dto/data-grid-light-dto.ts';

function createDataGridLightModelMetadata() {
  PojosMetadataMap.create<DataGridLightModel>('DataGridLightModel', {
    id: String,
    name: String,
    ownerUsername: String
  });

  PojosMetadataMap.create<DataGridLightDto>('DataGridLightDto', {
    id: String,
    name: String,
    ownerUsername: String
  });
}

export function addDataGridLightModelProfile() {
  createDataGridLightModelMetadata();
  createMap<DataGridLightDto, DataGridLightModel>(mapper, 'DataGridLightDto', 'DataGridLightModel');
}

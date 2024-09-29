import { createMap } from '@automapper/core';
import { PojosMetadataMap } from '@automapper/pojos';
import DataGridModel from '../../data-grid/models/data-grid-model.ts';
import mapper from '../../mapper/mapper.ts';
import DataGridDto from '../dto/data-grid-dto.ts';

function createDataGridModelMetadata() {
  PojosMetadataMap.create<DataGridModel>('DataGridModel', {
    id: String,
    name: String,
    ownerUsername: String,
    dateCreated: String,
    columns: ['DataGridColumnModel']
  });

  PojosMetadataMap.create<DataGridDto>('DataGridDto', {
    id: String,
    name: String,
    ownerUsername: String,
    dateCreated: String,
    columns: ['DataGridColumnDto']
  });
}

export function addDataGridModelProfile() {
  createDataGridModelMetadata();
  createMap<DataGridDto, DataGridModel>(mapper, 'DataGridDto', 'DataGridModel');
}

import { createMap } from '@automapper/core';
import { PojosMetadataMap } from '@automapper/pojos';
import DataGridColumnModel from '../../data-grid/models/data-grid-column-model.ts';
import mapper from '../../mapper/mapper.ts';
import DataGridColumnDto from '../dto/data-grid-column-dto.ts';

function createDataGridColumnModelMetadata() {
  PojosMetadataMap.create<DataGridColumnModel>('DataGridColumnModel', {
    index: Number,
    name: String,
    type: Number
  });

  PojosMetadataMap.create<DataGridColumnDto>('DataGridColumnDto', {
    index: Number,
    name: String,
    type: Number
  });
}

export function addDataGridColumnModelProfile() {
  createDataGridColumnModelMetadata();
  createMap<DataGridColumnDto, DataGridColumnModel>(
    mapper,
    'DataGridColumnDto',
    'DataGridColumnModel'
  );
}

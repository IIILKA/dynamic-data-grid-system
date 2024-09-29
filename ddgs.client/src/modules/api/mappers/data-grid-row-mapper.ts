import { createMap } from '@automapper/core';
import { PojosMetadataMap } from '@automapper/pojos';
import DataGridRowModel from '../../data-grid/models/data-grid-row-model.ts';
import mapper from '../../mapper/mapper.ts';
import DataGridRowDto from '../dto/data-grid-row-dto.ts';

function createDataGridRowModelMetadata() {
  PojosMetadataMap.create<DataGridRowModel>('DataGridRowModel', {
    id: String,
    rowData: Object
  });

  PojosMetadataMap.create<DataGridRowDto>('DataGridRowDto', {
    id: String,
    rowData: Object
  });
}

export function addDataGridRowModelProfile() {
  createDataGridRowModelMetadata();
  createMap<DataGridRowDto, DataGridRowModel>(mapper, 'DataGridRowDto', 'DataGridRowModel');
}

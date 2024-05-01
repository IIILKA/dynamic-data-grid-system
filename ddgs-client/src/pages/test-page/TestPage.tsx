import DataGrid from '../../modules/data-grid/DataGrid';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export function TestPage() {
    const dataGridRows = useSelector((_: RootState) => _.dataGrid.rows);

    return <DataGrid dataGridRows={dataGridRows} />;
}

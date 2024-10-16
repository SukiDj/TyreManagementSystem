import { Header } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import SaleRecordItem from './SaleRecordItem.tsx';
import { Fragment } from 'react/jsx-runtime';

export default observer(function SaleRecordList() {
  const { saleRecordStore } = useStore();
  const { groupedRecords } = saleRecordStore;

  return (
    <>
      {
        groupedRecords.map(([group, records]) => (  // Mapa kroz grupisane zapise
          <Fragment key={group}>
            <Header sub color='teal'>
              {group}  {/* Prikazujemo naziv grupe (npr. ciljano tržište) */}
            </Header>
            {
              records.map(record => (
                <SaleRecordItem key={record.id} record={record} />  // Prikazujemo svaki prodajni zapis
              ))
            }
          </Fragment>
        ))
      }
    </>
  );
});

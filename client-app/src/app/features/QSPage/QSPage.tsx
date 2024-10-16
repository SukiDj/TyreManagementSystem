import { Grid, Loader, Form, Dropdown, Button } from 'semantic-ui-react';
import SaleList from './SaleRecordList';
import ProductionList from '../ProductionOperatorPage/ProductionRedordList';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { PagingParams } from '../../models/Pagination';
import InfiniteScroll from 'react-infinite-scroller';
import SaleListItemPlaceholder from './SaleRecordItemPlaceholder';
import ProductionListItemPlaceholder from '../ProductionOperatorPage/ProductionRecordItemPlaceholder';
import { useEffect, useState } from 'react';

export default observer(function SaleDashboard() {
  const {
    saleRecordStore: {
      setPagingParams,
      pagination,
      loadSaleRecords,
      loadingNext,
      setLoadingNext,
      loadingInitial,
      isSubmitting,
      createRecord
    },
    tyreStore,
    clientStore
  } = useStore();

  //DODATO
  const [showSales, setShowSales] = useState(true);

  useEffect(() => {
    setPagingParams(new PagingParams(0)); 
    loadSaleRecords(); // Učitavanje prodajnih zapisa umesto proizvodnih
    if (tyreStore.tyreRegistry.size === 0) tyreStore.loadTyres();
    if (clientStore.clientRegistry.size === 0) clientStore.loadClients(); // Učitavanje klijenata
  }, [loadSaleRecords, setPagingParams, tyreStore, clientStore]);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadSaleRecords().then(() => setLoadingNext(false)); // Prodajni zapisi
  }

  const unitOptions = [
    { key: 'pcs', text: 'Pieces', value: 'pcs' },
    { key: 'boxes', text: 'Boxes', value: 'boxes' }
  ];

  const targetMarketOptions = [
    { key: 'domestic', text: 'Domestic', value: 'domestic' },
    { key: 'international', text: 'International', value: 'international' }
  ];

  const [tyreCode, setTyreCode] = useState('');
  const [clientId, setClientId] = useState('');
  const [productionOrderId, setProductionOrderId] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [quantitySold, setQuantitySold] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [saleDate, setSaleDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    const newSaleRecord = {
      tyreId: tyreCode,
      clientId,
      productionOrderId,
      unitOfMeasure,
      pricePerUnit: parseFloat(pricePerUnit), 
      quantitySold: parseInt(quantitySold),
      saleDate,
      targetMarket
    };
    createRecord(newSaleRecord).then(() => {
      loadSaleRecords(); // Ponovno učitavanje prodajnih zapisa nakon kreiranja novog
    });
  };

  return (
    <Grid style={{ marginTop: '0em' }}>
      <Grid.Column width='10'>
        <Button
          onClick={() => setShowSales(true)} // Dugme za prikaz prodajnih zapisa
          color={showSales ? 'teal' : 'grey'}
        >
          Show Sale Records
        </Button>
        <Button
          onClick={() => setShowSales(false)} // Dugme za prikaz proizvodnih zapisa
          color={!showSales ? 'teal' : 'grey'}
        >
          Show Production Records
        </Button>

        {showSales ? (
          <>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Tyre Code</label>
                <Dropdown
                  placeholder='Select Tyre'
                  fluid
                  selection
                  options={tyreStore.tyreOptions}
                  value={tyreCode}
                  onChange={(_e, { value }) => setTyreCode(value as string)}
                />
              </Form.Field>
              <Form.Field>
                <label>Client</label>
                <Dropdown
                  placeholder='Select Client'
                  fluid
                  selection
                  options={clientStore.clientOptions} // Opcije za klijente
                  value={clientId}
                  onChange={(_e, { value }) => setClientId(value as string)}
                />
              </Form.Field>
              <Form.Field>
                <label>Production Order ID</label>
                <input
                  placeholder='Enter Production Order ID'
                  value={productionOrderId}
                  onChange={(e) => setProductionOrderId(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Unit of Measure</label>
                <Dropdown
                  placeholder='Select Unit'
                  fluid
                  selection
                  options={unitOptions}
                  value={unitOfMeasure}
                  onChange={(_e, { value }) => setUnitOfMeasure(value as string)}
                />
              </Form.Field>
              <Form.Field>
                <label>Price Per Unit</label>
                <input
                  type='number'
                  placeholder='Enter Price'
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Quantity Sold</label>
                <input
                  type='number'
                  placeholder='Enter Quantity'
                  value={quantitySold}
                  onChange={(e) => setQuantitySold(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Target Market</label>
                <Dropdown
                  placeholder='Select Market'
                  fluid
                  selection
                  options={targetMarketOptions}
                  value={targetMarket}
                  onChange={(_e, { value }) => setTargetMarket(value as string)}
                />
              </Form.Field>
              <Form.Field>
                <label>Sale Date</label>
                <input
                  type='date'
                  placeholder='Select Sale Date'
                  value={saleDate ? saleDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setSaleDate(new Date(e.target.value))}
                />
              </Form.Field>
              <Button type='submit' color='teal'>
                Create Sale Record
              </Button>
            </Form>

            {(loadingInitial && !loadingNext) || isSubmitting ? (
              <>
                <SaleListItemPlaceholder />
                <SaleListItemPlaceholder />
              </>
            ) : (
              <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                initialLoad={false}
              >
                <br />
                <br />
                <SaleList />
              </InfiniteScroll>
            )}
          </>
        ) : (
          (loadingInitial && !loadingNext) || isSubmitting ? (
            <>
              <ProductionListItemPlaceholder />
              <ProductionListItemPlaceholder />
            </>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
              initialLoad={false}
            >
              <br/>
              <br/>
  
              <ProductionList />
            </InfiniteScroll>
          )
        )}
      </Grid.Column>
      <Grid.Column width='6'>
        {/* Ovde možeš dodati dodatne filtere ili informacije */}
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});

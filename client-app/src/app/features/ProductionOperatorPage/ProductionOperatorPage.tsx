import { Grid, Loader, Form, Dropdown, Button } from 'semantic-ui-react';
import ProductionList from './ProductionRedordList';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { PagingParams } from '../../models/Pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ProductionListItemPlaceholder from './ProductionRecordItemPlaceholder';
import { useEffect } from 'react';

export default observer(function ProductionDashboard() {
  const {
    recordStore: {
      setPagingParams,
      pagination,
      loadProductionRecords,
      loadingNext,
      setLoadingNext,
      loadingInitial,
    },
    userStore: {
      user
    }
  } = useStore();

 
  useEffect(() => {
    setPagingParams(new PagingParams(0));
    loadProductionRecords(user!.userName); 
  }, [loadProductionRecords, setPagingParams]);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadProductionRecords(user!.userName).then(() => setLoadingNext(false));
  }

  return (
    <Grid style={{ marginTop: '10em' }}>
      <Grid.Column width='10'>
        {/* Form for creating a new production record */}
        <Form>
          <Form.Field>
            <label>Machine Number</label>
            <Dropdown placeholder='Select Machine' fluid selection options={[]} />
          </Form.Field>
          <Form.Field>
            <label>Tyre Code</label>
            <Dropdown placeholder='Select Tyre' fluid selection options={[]} />
          </Form.Field>
          <Form.Field>
            <label>Shift</label>
            <Dropdown placeholder='Select Shift' fluid selection options={[]} />
          </Form.Field>
          <Form.Field>
            <label>Quantity Produced</label>
            <input type='number' placeholder='Enter Quantity' />
          </Form.Field>
          <Button type='submit' color='teal'>Create Production Record</Button>
        </Form>

        {/* Loader or production list based on loading state */}
        {loadingInitial && !loadingNext ? (
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
            <ProductionList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width='6'>
        {/* You can add filters here if necessary */}
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});

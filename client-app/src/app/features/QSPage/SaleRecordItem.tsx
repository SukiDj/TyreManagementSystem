import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { SaleRecord } from "../../models/SaleRecord"; 
import { Link } from "react-router-dom"; 
import { observer } from "mobx-react-lite";

interface Props {
  record: SaleRecord;
}

export default observer(function SaleRecordItem({ record }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>
                Tyre Code: {record.tyreCode}
              </Item.Header>
              <Item.Description>
                Client ID: {record.clientId}
              </Item.Description>
              <Item.Description>
                Production Order ID: {record.productionOrderId}
              </Item.Description>
              <Item.Description>
                Target Market: {record.targetMarket}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name="calendar" /> Sale Date: {record.saleDate ? record.saleDate.toDateString() : 'N/A'}
        </span>
      </Segment>

      <Segment>
        <span>
          <Icon name="dollar sign" /> Price Per Unit: ${record.pricePerUnit}
        </span>
      </Segment>

      <Segment>
        <span>
          <Icon name="box" /> Quantity Sold: {record.quantitySold}
        </span>
      </Segment>

      {}
      <Segment>
        <Button as={Link} to={`/sales/${record.id}`} color="blue">
          View Details
        </Button>
      </Segment>
    </Segment.Group>
  );
});

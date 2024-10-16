import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { ProductionRecord } from "../../models/ProductionRecord";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface Props {
  record: ProductionRecord;
}

export default observer(function ProductionRecordItem({ record }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>
                Machine Number: {record.machineNumber}
              </Item.Header>
              <Item.Description>
                Operator ID: {record.operatorId}
              </Item.Description>
              <Item.Description>
                Tyre Code: {record.tyreCode}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      
      <Segment>
        <span>
          <Icon name="calendar" /> {record.productionDate!.toDateString()}
          <Icon name="clock" /> Shift: {record.shift}
        </span>
      </Segment>

      <Segment>
        <span>
          <Icon name="box" /> Quantity Produced: {record.quantityProduced}
        </span>
      </Segment>

      
    </Segment.Group>
  );
});

import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { ProductionRecord } from "../../models/ProductionRecord";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from '../../stores/store';

interface Props {
  record: ProductionRecord;
}

export default observer(function ProductionRecordItem({ record }: Props) {

  const { userStore: { user, isQualitySupervisor } } = useStore(); // Get user and isQualitySupervisor from the store

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

      {/* Conditional rendering of Edit and Delete buttons if user is a Quality Supervisor */}
      {isQualitySupervisor && (
        <Segment clearing>
          <Button 
            as={Link} 
            to={`/manage/${record.id}`} 
            color="blue" 
            floated="right" 
            content="Edit" 
          />
          <Button 
            color="red" 
            floated="right" 
            content="Delete" 
            onClick={() => console.log("Delete Record", record.id)} 
          />
        </Segment>
      )}
    </Segment.Group>
  );
});

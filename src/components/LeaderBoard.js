import React from 'react';
import { Table } from 'semantic-ui-react';

const LeaderBoard = (props) => {

  return (
    <Table celled color="gray" key="gray" striped selectable inverted style={{marginTop: "1em"}}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Total Score</Table.HeaderCell>
          <Table.HeaderCell>Best Category</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.leaderboard.map((entry) =>
        <Table.Row>
          <Table.Cell>{entry[0]}</Table.Cell>
          <Table.Cell>{entry[1]}</Table.Cell>
          <Table.Cell>{entry[2]}</Table.Cell>
        </Table.Row>
       )}
      </Table.Body>
    </Table>
  )


}


export default LeaderBoard;

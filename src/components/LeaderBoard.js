import React from 'react'

const LeaderBoard = (props) => {

  return (
    <table>
  <tr>
    <th>Name</th>
    <th>Total Score</th>
    <th>Best Category</th>
  </tr>
      {props.leaderboard.map((entry) =>
        <tr>
          <td>{entry[0]}</td>
          <td>{entry[1]}</td>
          <td>{entry[2]}</td>
        </tr>
       )}
    </table>
  )


}


export default LeaderBoard

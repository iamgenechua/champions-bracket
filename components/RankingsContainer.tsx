import React from 'react'
import TableRanking from './TableRanking'

const RankingsContainer = ({ latestRanking }: { latestRanking: { [key: number]: {} } }) => {
  // turn latestRanking into an array of objects
  const latestRankingArray = Object.keys(latestRanking).map(key => latestRanking[key]);
  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', gap: '3em'}}>
      {
        latestRankingArray.map((ranking, index) => {
          return (
            <TableRanking key={index} groupNumber={index + 1} ranking={ranking} />
          )
        })
      }
    </div>
  )
}

export default RankingsContainer
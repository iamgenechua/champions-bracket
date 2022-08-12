import React from 'react'
import TableRanking from './TableRanking'
import { maxNumberGroups } from '../utils'

const RankingsContainer = ({ latestRanking }: { latestRanking: { [key: number]: {} } }) => {
  // turn latestRanking into an array of objects
  const latestRankingArray = Object.keys(latestRanking).map(key => latestRanking[key]);
  return (
    <>
      {
        latestRankingArray.map((ranking, index) => {
          return (
            <TableRanking key={index} groupNumber={index + 1} ranking={ranking} />
          )
        })
      }
    </>
  )
}

export default RankingsContainer
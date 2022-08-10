import React from 'react'
import TableRanking from './TableRanking'

const RankingsContainer = () => {
  return (
    <>
      <TableRanking groupNumber={1}/>
      <TableRanking groupNumber={2} />
    </>
  )
}

export default RankingsContainer
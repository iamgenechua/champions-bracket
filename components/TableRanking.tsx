import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: number;
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  registrationDate: string;
  position: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    render: position => (
      <>
        <Tag color={position <= 4 ? 'green' : 'white'} key={position}>
          {position <= 4 ? 'QUALIFIED' : ''}
        </Tag>
        {' '}

        {position}
      </>
    ),
  },
  {
    title: 'Team',
    dataIndex: 'teamName',
    key: 'teamName',
  },
  {
    title: 'Wins',
    dataIndex: 'wins',
    key: 'wins',
  },
  {
    title: 'Draws',
    dataIndex: 'draws',
    key: 'draws',
  },
  {
    title: 'Losses',
    dataIndex: 'losses',
    key: 'losses',
  },
  {
    title: 'Goals Scored',
    dataIndex: 'goalsScored',
    key: 'goalsScored',
  },
  {
    title: 'Registration Date (MM/DD/YYYY)',
    dataIndex: 'registrationDate',
    key: 'registrationDate',
  }
]

const TableRanking = ({ groupNumber, ranking }: { groupNumber: number, ranking: [] }) => {

  // ranking map
  const rankingMap = ranking.map((team: any,idx) => {
    return {
      key: idx,
      teamName: team.myTeam,
      wins: team.wins,
      draws: team.draws,
      losses: team.losses,
      goalsScored: team.goalsFor,
      registrationDate: new Date(team.registrationDate).toLocaleDateString('en-US'),
      position: idx + 1
    };
  });

  return (
    
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Group {groupNumber}</h2>
      <Table columns={columns} dataSource={rankingMap} pagination={false}/>
    </div>
  )
}

export default TableRanking
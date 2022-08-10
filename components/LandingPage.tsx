import React from 'react'
import { Input } from 'antd'
import AddTeam from './AddTeam';
import AddMatch from './AddMatch';
import RankingsContainer from './RankingsContainer';

const LandingPage = () => {
    return (
        <>
            <RankingsContainer />
            <AddTeam />
            <AddMatch />
        </>
    )
}

export default LandingPage
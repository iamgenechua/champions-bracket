import React, { useEffect, useState } from 'react'
import AddTeam from './AddTeam';
import AddMatch from './AddMatch';
import RankingsContainer from './RankingsContainer';
import { fetchRankings } from '../utils';

const LandingPage = () => {
    const [latestUpdated, setLatestUpdated] = useState(null);
    const [latestRanking, setLatestRanking] = useState([]);

    useEffect(() => {
        (async function () {
            const rankings = await fetchRankings();
            setLatestRanking(rankings.allTeams);
        })();            
    }, [latestUpdated]);

    return (
        <>
            {latestRanking.map(team => team.teamName)}
            <RankingsContainer />
            <AddTeam setLatestUpdated={setLatestUpdated}/>
            <AddMatch />
        </>
    )
}

export default LandingPage
import React, { useEffect, useState } from 'react'
import AddTeam from './AddTeam';
import AddMatch from './AddMatch';
import RankingsContainer from './RankingsContainer';
import { fetchRankings } from '../utils';
import DeleteButton from './DeleteButton';

const LandingPage = () => {
    const [latestUpdated, setLatestUpdated] = useState(null);
    const [latestRanking, setLatestRanking] = useState([]);

    useEffect(() => {
        (async function () {
            const rankings = await fetchRankings();
            setLatestRanking(rankings);
        })();
    }, [latestUpdated]);

    return (
        <>
            <RankingsContainer latestRanking={latestRanking}/>
            <AddTeam setLatestUpdated={setLatestUpdated}/>
            <AddMatch setLatestUpdated={setLatestUpdated} />
            <DeleteButton setLatestUpdated={setLatestUpdated}/>
        </>
    )
}

export default LandingPage
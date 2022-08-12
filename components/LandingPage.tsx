import React, { useEffect, useState } from 'react'
import AddTeam from './AddTeam';
import AddMatch from './AddMatch';
import RankingsContainer from './RankingsContainer';
import { fetchMatches, fetchRankings } from '../utils';
import DeleteButton from './DeleteButton';

const LandingPage = () => {
    const [latestUpdated, setLatestUpdated] = useState(null);
    const [latestRanking, setLatestRanking] = useState([]);
    const [latestMatches, setLatestMatches] = useState([]);

    useEffect(() => {
        (async function () {
            const rankings = await fetchRankings();
            setLatestRanking(rankings);
        })();
        (async function () {
            const allMatches = await fetchMatches();
            setLatestMatches(allMatches);
        })();

    }, [latestUpdated]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10vh 10vh', gap: '4em'}}>
            <h1>WE THE CHAMPIONS</h1>
            <RankingsContainer latestRanking={latestRanking}/>
            <AddTeam setLatestUpdated={setLatestUpdated}/>
            <AddMatch setLatestUpdated={setLatestUpdated} latestMatches={latestMatches}/>
            <DeleteButton setLatestUpdated={setLatestUpdated}/>
        </div>
    )
}

export default LandingPage
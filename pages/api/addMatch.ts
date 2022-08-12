import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db';

// make type Data
type Data = {
    error?: string,
    createdMatch?: {}
}

const teamsFromDifferentGroup = async (team1Name: string, team2Name: string) => {
    const team1 = await prisma.team.findUnique({
        where: {
            teamName: team1Name
        }
    });
    const team2 = await prisma.team.findUnique({
        where: {
            teamName: team2Name
        }
    });
    if (team1?.groupNumber !== team2?.groupNumber) {
        return true;
    }

    return false;
}

const createMatchInDB = async (team1Name: string, team2Name: string, goalsTeam1: number, goalsTeam2: number) => {
    const createdMatch = await prisma.match.create({
        data: {
            team1Name: team1Name,
            team2Name: team2Name,
            goalsTeam1: goalsTeam1,
            goalsTeam2: goalsTeam2
        }
    })

    if (!createdMatch) {
        return false;
    }
    
    return createdMatch;

}

const updateResultTable = async (team1Name: string, goalsTeam1: number, team2Name: string, goalsTeam2: number) => {
    let team1MatchResult = '';
    let team2MatchResult = '';

    if (goalsTeam1 > goalsTeam2) {
        team1MatchResult = 'wins';
        team2MatchResult = 'losses';
    } else if (goalsTeam1 < goalsTeam2) {
        team1MatchResult = 'losses';
        team2MatchResult = 'wins';
    } else {
        team1MatchResult = 'draws';
        team2MatchResult = 'draws';
    }


    [{ name: team1Name, matchResult: team1MatchResult, goals: goalsTeam1 }, { name: team2Name, matchResult: team2MatchResult, goals: goalsTeam2 }].forEach(async (team) => {
        await prisma.result.update({
            where: {
                myTeam: team.name
            },
            data: {
                [team.matchResult]: {
                    increment: 1
                },
                goalsFor: {
                    increment: team.goals
                }
            }
        });
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // guard clause for POST request
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        })
    }

    const body = req.body
    if (!body) {
        res.status(400).json({
            error: 'No body found'
        })
    }

    const { team1Name, team2Name, goalsTeam1, goalsTeam2 } = body;

    if (!team1Name || !team2Name || goalsTeam1 == null || !goalsTeam2 == null) {
        return res.status(400).json({
            error: 'Missing required fields'
        })
    }

    if (await teamsFromDifferentGroup(team1Name, team2Name)) {
        return res.status(400).json({
            error: 'Teams from different groups cannot play against each other'
        })
    }

    // create match in db
    const createdMatch = await createMatchInDB(team1Name, team2Name, goalsTeam1, goalsTeam2);

    if (createdMatch == false) {
        return res.status(500).json({
            error: 'Match with same teams already added or teams have played against each other'
        })
    }

    // update Result table with prisma
    try {
        updateResultTable(team1Name, goalsTeam1, team2Name, goalsTeam2);
    } catch (error) {
        return res.status(500).json({
            error: 'Match result not updated'
        });
    }

    return res.status(200).json({ createdMatch });
}
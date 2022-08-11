import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db';

type Data = {
    error?: string,
    allTeams?: {}
}

// handler function for get request
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    // get all teams from database with prisma
    const allTeams = await prisma.team.findMany({
        select: {
            teamName: true
        }
    });

    if (!allTeams) {
        return res.status(500).json({
            error: 'No teams found'
        })
    }

    return res.status(200).json({allTeams});
}
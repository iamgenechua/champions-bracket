
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db';


// handler function for get request
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    await prisma.result.deleteMany({});
    await prisma.match.deleteMany({});
    await prisma.team.deleteMany({});


    return res.status(200).json('All data deleted');
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db';

// handler function for get request
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const result = await prisma.match.findMany();

    return res.status(200).json(result);
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db';
import {maxNumberGroups} from '../../utils'

type Data = {
    error?: string,
    result?: {}
}

// handler function for get request
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const result: { [key: number]: any } = {};

    for (let i: number = 1; i <= maxNumberGroups; i++) {
        // turn i into a string
        result[i] = await prisma.$queryRaw<[]>`
        SELECT "Result"."myTeam", "Result"."wins", "Result"."draws", "Result"."losses", "Result"."goalsFor", "Team"."registrationDate"
        FROM "Team"
        JOIN "Result"
        ON "Result"."myTeam" = "Team"."teamName"
        WHERE "Team"."groupNumber" = ${i}
        ORDER BY "Result"."wins" * 3 + "Result"."draws" DESC, 
            "Result"."goalsFor" DESC, 
            "Result"."wins" * 5 + "Result"."draws" * 3 + "Result"."losses" DESC, 
            "Team"."registrationDate" ASC
    `
    }

    return res.status(200).json(result);
}
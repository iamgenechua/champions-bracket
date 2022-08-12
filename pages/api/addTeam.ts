// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../db';

// make type Data
type Data = {
  error?: string,
  createdTeam?: {}
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

  const {teamName, groupNumber, registrationDate} = body;
    
  if (!teamName || !groupNumber || !registrationDate) {
    return res.status(400).json({
      error: 'Missing required fields'
    })
  }

  // add team to database with prisma
  const createdTeam = await prisma.team.create({
    data: {
      teamName: teamName,
      groupNumber: groupNumber,
      registrationDate: registrationDate
    }
  })

  if (!createdTeam) {
    return res.status(500).json({
      error: 'Team with same name already added'
    })
  }

  // update Result table with prisma
  const teamResultTable = await prisma.result.create({
    data: {
      myTeam: teamName,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
    }
  });

  if (!teamResultTable) {
    return res.status(500).json({
      error: 'Team result not created'
    })
  }

  return res.status(200).json({createdTeam});
}



import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db'

export interface Request extends NextApiRequest {
  query: {
    companyId: string
  }
}

export default async function personHandler(
  req: Request,
  res: NextApiResponse
) {
  const { companyId } = req.query

  if (req.method === 'GET') {
    const clients = await prisma.mortgageClient.findMany({
      where: {
        companyId,
      }
    })

    console.log('in route', clients);

    if (!clients) return res.status(401)

    res.status(200).json(clients)
  }
}
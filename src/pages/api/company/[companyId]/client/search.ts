import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../server/db'

export interface Request extends NextApiRequest {
  query: {
    companyId: string;
    search: string;
  }
}

export default async function personHandler(
  req: Request,
  res: NextApiResponse
) {
  const { query } = req
  const { companyId } = query

  if (req.method === 'GET') {
    const { search } = query;

    const clients = await prisma.client.findMany({
      where: {
        OR: [
          {
            companyId,
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            companyId,
            fullName: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ]
      },
    })

    const firstFiveClients = clients.slice(0, 5)

    return res.status(200).send(firstFiveClients)
  }
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../server/db'

export interface Request extends NextApiRequest {
  body: {
    search: string;
  };
  query: {
    companyId: string
  }
}

export default async function personHandler(
  req: Request,
  res: NextApiResponse
) {
  const { query, body } = req
  const { companyId } = query

  console.log(query);

  if (req.method === 'GET') {
    const { search } = query;

    const clients = await prisma.client.findMany({
      where: {
        companyId,
        email: {
          contains: search,
        },
      },
    })

    console.log('clients', clients);

    const firstFiveClients = clients.slice(0, 5)

    return res.status(200).send(firstFiveClients)
  }
}
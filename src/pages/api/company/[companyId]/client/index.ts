import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../server/db'

export interface Request extends NextApiRequest {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  query: {
    companyId: string
  }
}

export default async function clientHandler(
  req: Request,
  res: NextApiResponse
) {
  const { query, body } = req
  const { companyId } = query

  if (req.method === 'POST') {
    const { firstName, lastName } = body;

    await prisma.client.create({
      data: {
        ...body,
        companyId,
        fullName: `${firstName} ${lastName}`
      },
    })

    return res.status(200).end()
  }
}


import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db'

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body } = req
  const { id } = query

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
        companyMembership: true
      },
    })

    if (!user) return res.status(401)


    res.status(200).json(user)
  }

  if (req.method === 'PUT') {
    const { firstName, lastName } = body;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName
      },
    })

    console.log('userr', user);

    if (!user) return res.status(404).end()


    return res.status(200).end()
  }
}
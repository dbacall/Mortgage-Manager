

import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { prisma } from '../../../server/db'
import { MembershipType } from '@prisma/client';
import { authOptions } from 'src/server/auth';

export interface Request extends NextApiRequest {
  body: {
    name: string;
  };
}


export default async function companyHandler(
  req: Request,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'POST') {
    const { name } = body;

    const session = await getServerSession(req, res, authOptions)

    console.log('session', session);
    const { id: userId } = session.user

    if (typeof name === 'string') {
      const company = await prisma.company.create({
        data: {
          name: name,
        },
      })

      const companyMembership = await prisma.companyMembership.create({
        data: {
          userId,
          companyId: company.id,
          type: MembershipType.ADMIN
        }
      })

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          companyMembershipId: companyMembership.id,
          companyId: company.id
        },
      })
    }

    return res.status(200).end()
  }
}


import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { prisma } from '../../../server/db'
import { MembershipType } from '@prisma/client';

export interface PostRequest extends NextApiRequest {
  body: {
    name: string;
  };
}


export default async function companyHandler(
  req: PostRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'POST') {
    const { name } = body;

    const session = await getSession({ req })
    console.log(session);
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



    console.log('name', name);


    // if (!user) return res.status(404).end()


    return res.status(200).end()
  }
}
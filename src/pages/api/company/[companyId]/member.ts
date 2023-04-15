import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../server/db'
import { MembershipType } from '@prisma/client';

export interface Request extends NextApiRequest {
  body: {
    email: string;
  };
  query: {
    companyId: string
  }
}

export default async function memberHandler(
  req: Request,
  res: NextApiResponse
) {
  const { query, body } = req
  const { companyId } = query

  if (req.method === 'POST') {
    const { email } = body;

    const user = await prisma.user.findUnique({
      where: {
        email
      },
    })

    if (user) {
      const companyMembership = await prisma.companyMembership.create({
        data: {
          userId: user.id,
          companyId,
          type: MembershipType.USER,
        }
      })

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          companyMembershipId: companyMembership.id,
          company: {
            connect: {
              id: companyId
            }
          }
        },
      })
    };

    await prisma.company.update({
      where: {
        id: companyId
      },
      data: {
        memberEmails: {
          push: email
        }
      }
    })

    return res.status(200).end()
  }
}
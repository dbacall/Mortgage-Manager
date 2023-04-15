import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db'
import { MembershipType } from '@prisma/client';

export interface Request extends NextApiRequest {
  body: {
    firstName: string;
    lastName: string;
  };
  query: {
    id: string
  }
}

export default async function personHandler(
  req: Request,
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

    let user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName
      },
    })

    if (!user) return res.status(404).end()

    const company = await prisma.company.findMany({
      where: {
        memberEmails: {
          has: user.email
        }
      }
    })

    if (company[0]) {
      const companyMembership = await prisma.companyMembership.create({
        data: {
          userId: user.id,
          companyId: company[0].id,
          type: MembershipType.USER,
        }
      })

      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          companyMembershipId: companyMembership.id,
          company: {
            connect: {
              id: company[0].id
            }
          }
        },
      })
    }

    return res.status(200).json({ user })
  }
}


import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { prisma } from '../../../server/db'
import { MembershipType } from '@prisma/client';
import { authOptions } from 'src/server/auth';

export interface Request extends NextApiRequest {
  body: {
    name: string;
    clients: Record<string, any>[]
  };
}


export default async function companyHandler(
  req: Request,
  res: NextApiResponse
) {


  const { body } = req

  if (req.method === 'POST') {
    const { name, clients, mortgages } = body;

    const session = await getServerSession(req, res, authOptions)

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
          type: MembershipType.ADMIN,
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

      const clientsWithCompanyId = clients.map((client) => {
        return {
          ...client,
          companyId: company.id
        }
      })

      const mortgagesWithCompanyId = mortgages.map((mortgage) => {
        return {
          ...mortgage,
          companyId: company.id
        }
      })


      await prisma.client.createMany({
        data: clientsWithCompanyId,
        skipDuplicates: true
      })

      for (const mortgage of mortgagesWithCompanyId) {
        const mortgageToAdd = {
          ...mortgage,
          email: undefined
        }
        await prisma.mortgage.create({
          data: {
            ...mortgageToAdd,
            client: {
              connect: { email: mortgage.email }
            }
          },
        })
      }


    }


    return res.status(200).end()
  }
}



import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { prisma } from '../../../server/db'
import { MembershipType, type MortgageWritten } from '@prisma/client';
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
  console.log('HEREEEEEEE', body);

  if (req.method === 'POST') {
    const { name, clients } = body;

    const session = await getServerSession(req, res, authOptions)

    console.log('session', session);
    const { id: userId } = session.user

    console.log('clientsFile', body);

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

      const clientsWithCompanyId = clients.map((client) => {
        return {
          ...client,
          companyId: company.id
        }
      })


      await prisma.mortgageClient.createMany({
        data: clientsWithCompanyId,
        skipDuplicates: true
      })


    }


    return res.status(200).end()
  }
}

import type { InterestType, PurchaseType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../../server/db'

export interface Request extends NextApiRequest {
  body: {
    firstLineOfAddress: string;
    city: string;
    postcode: string;
    interestType: InterestType;
    purchaseType: PurchaseType;
    purchaseDate: Date;
    renewalDate: Date;
    initialMortgageAmount: number;
  };
  query: {
    companyId: string;
    clientId: string;
  }
}

export default async function mortgageHandler(
  req: Request,
  res: NextApiResponse
) {
  const { query, body } = req
  const { companyId, clientId } = query

  if (req.method === 'POST') {

    const client = await prisma.client.findUniqueOrThrow({
      where: {
        id: clientId
      }
    })

    await prisma.mortgage.create({
      data: {
        ...body,
        companyId,
        client: {
          connect: {
            email_companyId: {
              email: client.email,
              companyId
            }
          }
        }
      },
    })

    return res.status(200).end()
  }
}
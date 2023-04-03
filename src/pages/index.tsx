import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import { getLayout } from "src/components/layouts/MainLayout/MainLayout";
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = ({ user, mortgages }) => {
  const [filteredMortgages, setFilteredMorgages] = useState(mortgages)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const searchedMortgages = mortgages.filter((mortgage) => {
      return `${mortgage.client.firstName} ${mortgage.client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    })

    setFilteredMorgages(searchedMortgages)
  }, [searchTerm])

  const { company } = user

  return (
    <>
      <Head>
        <title>Mortgage Manager</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-10 py-16">
        <h1 className="text-4xl">
          {company.name}
        </h1>
        <div className="mt-6 flex justify-between items-center w-full overflow-none ">
          <h2 className="text-2xl">
            Client Renewals
          </h2>
          <div>
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered border-slate-300"
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
          </div>
        </div>
        <table className="table w-full mt-5">
          <thead >
            <tr>
              <th className="bg-slate-100">Name</th>
              <th className="bg-slate-100">Phone</th>
              <th className="bg-slate-100">Email</th>
              <th className="bg-slate-100">Renewal Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredMortgages.map((mortgage, id) => (
              <tr key={id}>
                <td className="border-slate-100">{mortgage.client.firstName} {mortgage.client.lastName}</td>
                <td className="border-slate-100">0{mortgage.client.phone}</td>
                <td className="border-slate-100">{mortgage.client.email}</td>
                <td className="border-slate-100">{new Date(mortgage.renewalDate).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context)


  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  const response = await fetch(`http://localhost:3000/api/user/${session.user.id}`)

  const user = await response.json()

  if (!user.companyMembershipId) {
    return {
      redirect: {
        destination: '/getting-started',
        permanent: false,
      },
    }
  }


  const mortgagesRes = await fetch(`http://localhost:3000/api/mortgages/${user.companyId}`)

  const mortgages = await mortgagesRes.json()

  return {
    props: { user, mortgages }
  }
}

Home.getLayout = getLayout

export default Home;

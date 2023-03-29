import { getSession } from "next-auth/react";
import Head from "next/head";
import { CompanyCreator, ProfileCreator, SignedInLayout } from "../../components";
import { type ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from "../_app";

const GettingStarted: NextPageWithLayout = ({ user }) => {
  const [hasCreatedProfile, setCreatedProfile] = useState(false)
  const [hasCreatedCompany, setCreatedCompany] = useState(false)

  useEffect(() => {
    if (!!user.firstName) setCreatedProfile(true)
  }, [user])

  const steps = [
    {
      name: 'Profile',
      currentOrPast: true
    },
    {
      name: 'Company',
      currentOrPast: hasCreatedProfile
    },
    {
      name: 'Members',
      currentOrPast: hasCreatedCompany
    },
  ]

  return (
    <>
      <Head>
        <title>Getting Started</title>
      </Head>


      <main className="">
        <div className="text-center">
          <ul className="mt-16 steps steps-horizontal w-96">
            {steps.map((step) => (
              <li key={step.name} className={step.currentOrPast ? "step step-primary" : "step"}>{step.name}</li>
            ))}
          </ul>
          {(!hasCreatedProfile) && <ProfileCreator setCreatedProfile={setCreatedProfile} />}

          {(hasCreatedProfile && !hasCreatedCompany) && <CompanyCreator setCreatedCompany={setCreatedCompany} />}

          {hasCreatedCompany && (
            <>
              <h1 className="mt-16 text-4xl font-medium">
                Add Members
              </h1>
            </>
          )}
        </div>
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

  if (user.companyMembershipId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}

GettingStarted.getLayout = function getLayout(page: ReactElement) {
  return (
    <SignedInLayout>{page}</SignedInLayout>
  )
}

export default GettingStarted;
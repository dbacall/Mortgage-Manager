import { getSession } from "next-auth/react";
import Head from "next/head";
import { CompanyCreator, ProfileCreator, SetupLayout } from "../../components";
import { type ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from "../_app";
import { type GetServerSideProps } from "next";
import type { User } from "src/types/interfaces";
import { AddMembers } from "src/components/scenes/AddMembers";

type GettingStartedProps = {
  user: User
} & NextPageWithLayout

const GettingStarted = ({ user }: GettingStartedProps) => {
  const [hasCreatedProfile, setCreatedProfile] = useState(!!user.firstName)
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
          <div className="p-12 m-auto my-16 text-center bg-white rounded-lg shadow-md w-128">
            {(!hasCreatedProfile) && <ProfileCreator setCreatedProfile={setCreatedProfile} />}

            {/* {(hasCreatedProfile && !hasCreatedCompany) && <CompanyCreator setCreatedCompany={setCreatedCompany} />} */}

            {/* {hasCreatedCompany && ( */}
            <>
              <AddMembers />
            </>
            {/* )} */}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  const user = await response.json() as User

  // if (user.companyMembershipId) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: { user } as { user: User },
  }
}

GettingStarted.getLayout = function getLayout(page: ReactElement) {
  return (
    <SetupLayout>{page}</SetupLayout>
  )
}

export default GettingStarted;
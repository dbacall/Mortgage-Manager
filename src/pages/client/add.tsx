import Head from "next/head";
import type { NextPageWithLayout } from "../_app";
import { getLayout } from "src/components/layouts/MainLayout/MainLayout";
import { AddClient } from "src/components";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import type { User } from "src/types/interfaces";

type AddClientProps = {
  user: User
} & NextPageWithLayout

const AddClientPage = ({ user }: AddClientProps) => {
  return (
    <>
      <Head>
        <title>Add Client</title>
      </Head>

      <AddClient companyId={user.companyId} />
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

  const { data: user }: { data: User } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${session.user.id}`)

  return {
    props: { user } as { user: User },
  }
}

AddClientPage.getLayout = getLayout;

export default AddClientPage;
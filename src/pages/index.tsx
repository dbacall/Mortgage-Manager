import { type NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

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

  if (!user.firstName) {
    return {
      props: { user },
      redirect: {
        destination: '/getting-started',
        permanent: false,
      },
    }
  }



  return {
    props: { session }
  }
}

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Mortgage Manager</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Home Page
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
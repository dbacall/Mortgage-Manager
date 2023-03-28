import { type NextPage } from "next";
import { useSession, getSession } from "next-auth/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { Header } from "../../components";

interface ProfileData {
  firstName: string;
  lastName: string;
}

const GettingStarted: NextPage = ({ user }) => {
  console.log('user', user);

  const { data: session } = useSession()
  const { register, handleSubmit } = useForm();
  // console.log('session', session);
  const onSubmit = (data: ProfileData) => {
    mutate(data)
  };

  const { mutate, isLoading } = useMutation((data: ProfileData) => {
    return axios.put(`http://localhost:3000/api/user/${session.user.id}`, data)
  })

  const hasCreatedProfile = !!user.firstName

  const steps = [
    {
      name: 'Profile',
      currentOrPast: true
    },
    {
      name: 'Company',
      currentOrPast: false
    },
    {
      name: 'Members',
      currentOrPast: false
    },
  ]

  return (
    <>
      <Head>
        <title>Getting Started</title>
      </Head>

      <div>
        <Header />
        <main className="">
          <div className="text-center">
            <ul className="mt-16 steps steps-horizontal w-96">
              {steps.map((step) => (
                <li key={step.name} className={step.currentOrPast ? "step step-primary" : "step"}>{step.name}</li>
              ))}
            </ul>
            {!hasCreatedProfile && (
              <>

                <h1 className="mt-16 text-4xl font-medium">
                  Profile Creation
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center m-auto w-80">
                  <input type="text" placeholder="First Name" className="w-full max-w-xs input input-bordered border-slate-200 mt-9" {...register("firstName")} />
                  <input type="text" placeholder="Last Name" className="w-full max-w-xs mt-3 input input-bordered border-slate-200"  {...register("lastName")} />
                  <input disabled={false} type="submit" value="Submit" className="w-full mt-3 btn btn-primary" />
                </form>
              </>
            )}


          </div>
        </main>
      </div>
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

  return {
    props: { user },
  }
}

export default GettingStarted;
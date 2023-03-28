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
            <ul className="steps steps-horizontal mt-12 w-96">
              {steps.map((step) => (
                <li key={step.name} className={step.currentOrPast ? "step step-primary" : "step"}>{step.name}</li>
              ))}
            </ul>
            {!hasCreatedProfile && (
              <>

                <h1 className="text-4xl mt-16 font-medium">
                  Profile Creation
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col items-center w-80">
                  <input type="text" placeholder="First Name" className="input input-bordered border-slate-200 w-full max-w-xs mt-9" {...register("firstName")} />
                  <input type="text" placeholder="Last Name" className="input input-bordered border-slate-200 w-full max-w-xs mt-3"  {...register("lastName")} />
                  <input disabled={false} type="submit" value="Submit" className="btn btn-primary mt-3 w-full" />
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
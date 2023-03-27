import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";

const GettingStarted: NextPage = () => {
  const session = useSession()
  console.log(session);
  const { register, handleSubmit, formState } = useForm();
  // console.log('session', session);
  const onSubmit = data => mutate(data);

  const { mutate } = useMutation(data => {
    return axios.put(`http://localhost:3000/api/user/${session.data?.user.id}`, data)
  })
  return (
    <>
      <Head>
        <title>Getting Started</title>
      </Head>
      <main className="">
        <div className="">
          <h1 className="">
            Lets Get Started!
          </h1>
          <h2>
            Profile Creation
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" {...register("firstName")} />
            <input type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs"  {...register("lastName")} />
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>

        </div>
      </main>
    </>
  );
};

export default GettingStarted;
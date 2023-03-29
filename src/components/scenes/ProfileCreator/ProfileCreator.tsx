import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

interface ProfileData {
  firstName: string;
  lastName: string;
}

const ProfileCreator = ({ setCreatedProfile }) => {
  const { data: session } = useSession()

  const { register, handleSubmit } = useForm();


  const onSubmit = (data: { name: string }) => {
    createProfile(data)
  };

  const { mutate: createProfile, isLoading } = useMutation((data: ProfileData) => {
    return axios.put(`http://localhost:3000/api/user/${session.user.id}`, data)
  },
    {
      onSuccess: () => setCreatedProfile(true)
    })

  return (
    <>
      <h1 className="mt-16 text-4xl font-medium">
        Profile Creation
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center m-auto w-80">
        <input type="text" placeholder="First Name" className="w-full max-w-xs input input-bordered border-slate-200 mt-9" {...register("firstName")} />
        <input type="text" placeholder="Last Name" className="w-full max-w-xs mt-3 input input-bordered border-slate-200"  {...register("lastName")} />
        <button type="submit" className="w-full mt-3 btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default ProfileCreator;
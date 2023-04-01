import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type FC } from "react";

interface ProfileCreatorProps {
  setCreatedProfile: (created: boolean) => void
}

interface ProfileData {
  firstName: string;
  lastName: string;
}

const ProfileCreator: FC<ProfileCreatorProps> = ({ setCreatedProfile }) => {
  const { data: session } = useSession()

  const { register, handleSubmit } = useForm<ProfileData>();


  const onSubmit: SubmitHandler<ProfileData> = (data: ProfileData) => {
    createProfile(data)
  };

  const { mutate: createProfile } = useMutation((data: ProfileData): any => {
    if (session) {
      return axios.put(`http://localhost:3000/api/user/${session.user.id}`, data)
    }
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
        <input type="text" placeholder="First Name" className="w-full max-w-xs input input-bordered border-slate-200 mt-14" {...register("firstName")} />
        <input type="text" placeholder="Last Name" className="w-full max-w-xs mt-6 input input-bordered border-slate-200"  {...register("lastName")} />
        <button type="submit" className="w-full mt-6 btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default ProfileCreator;
import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type FC } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from "./ProfileCreator.validation";
import { Button, Input } from "src/components/atoms";
import type * as z from 'zod';

interface ProfileCreatorProps {
  setCreatedProfile: (created: boolean) => void
}

type ProfileData = z.infer<typeof profileSchema>

const ProfileCreator: FC<ProfileCreatorProps> = ({ setCreatedProfile }) => {
  const { data: session } = useSession()

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<ProfileData> = (data: ProfileData) => {
    createProfile(data)
  };

  const { mutate: createProfile, isLoading } = useMutation((data: ProfileData): any => {
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
        <Input type="text" placeholder="First Name" className="mt-14" error={errors.firstName?.message} register={register} name="firstName" />
        <Input type="text" placeholder="Last Name" className="mt-6" error={errors.lastName?.message} register={register} name="lastName" />
        <Button type="submit" className="mt-6" isLoading={isLoading}>Submit</Button>
      </form>
    </>
  );
}

export default ProfileCreator;
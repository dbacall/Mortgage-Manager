import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type FC } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from "./ProfileCreator.validation";
import { Button, TextInput } from "src/components/atoms";
import type * as z from 'zod';
import { useRouter } from "next/router";

interface ProfileCreatorProps {
  setCreatedProfile: (created: boolean) => void;
}

type ProfileData = z.infer<typeof profileSchema>

export const ProfileCreator: FC<ProfileCreatorProps> = ({ setCreatedProfile }) => {
  const router = useRouter();

  const { data: session } = useSession()

  const methods = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  const { handleSubmit, formState: { errors } } = methods

  const onSubmit: SubmitHandler<ProfileData> = (data: ProfileData) => {
    createProfile(data)
  };

  const { mutate: createProfile, isLoading } = useMutation((data: ProfileData): any => {
    if (session) {
      return axios.put(`http://localhost:3000/api/user/${session.user.id}`, data)
    }
  },
    {
      onSuccess: (data) => {
        console.log('profile creator success', data);
        if (data.data.user.companyId) router.push('/').catch((err) => console.error(err))
        setCreatedProfile(true)
      }
    })

  return (
    <>
      <h1 className="text-4xl font-medium text-content-primary">
        Profile Creation
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full m-auto">
          <TextInput placeholder="First Name" className="mt-14" error={errors.firstName?.message} name="firstName" />
          <TextInput placeholder="Last Name" className="mt-6" error={errors.lastName?.message} name="lastName" />
          <Button type="submit" className="mt-6" isLoading={isLoading}>Submit</Button>
        </form>
      </FormProvider>
    </>
  );
}

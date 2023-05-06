import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, type FC, useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from "./AddMembers.validation";
import { Button, TextInput } from "src/components/atoms";
import type * as z from 'zod';
import { BiCheckCircle } from "react-icons/bi";
import { useRouter } from "next/router";

interface AddMembersProps {
  companyId: string;
}

type ProfileData = z.infer<typeof memberSchema>

export const AddMembers: FC<AddMembersProps> = ({ companyId }) => {
  const [showAlert, setShowAlert] = useState(false);
  console.log('companyId', companyId);
  const router = useRouter();

  const { data: session } = useSession()

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 4000)
    }
  }, [showAlert])

  const methods = useForm<ProfileData>({
    resolver: zodResolver(memberSchema),
  });

  const { handleSubmit, formState: { errors } } = methods

  const onSubmit: SubmitHandler<ProfileData> = (data: ProfileData) => {
    addMember(data)
  };

  const { mutate: addMember, isLoading } = useMutation((data: ProfileData): any => {
    if (session) {
      return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}/member`, data)
    }
  },
    {
      onSuccess: () => {
        setShowAlert(true)
        methods.reset()
      }
    })

  return (
    <>
      <h1 className="text-4xl font-medium text-content-primary">
        Add Members
      </h1>
      <p className="mt-6 text-content-secondary">You can continue and add members later from the settings page if you'd prefer.</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full m-auto">
          <TextInput placeholder="Member email" className="mt-14" error={errors.email?.message} name="email" />
          <div className="flex justify-between w-full gap-2 mt-6">
            <Button className="flex-1 btn-accent" disabled={isLoading} onClick={() => router.push('/')}>Continue</Button>
            <Button type="submit" className="flex-1" isLoading={isLoading}>Add</Button>
          </div>
        </form>
      </FormProvider>
      <div className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 alert alert-success shadow-lg w-2/4 m-auto transition-all duration-700 ${showAlert ? "opacity-100" : "opacity-0"}`}>
        <div>
          <BiCheckCircle size={20} />
          <span>Member added successfully!</span>
        </div>
      </div>
    </>
  );
}

import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useState, type FC } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema } from "./AddClient.validation";
import { Button, FormContainer, TextInput } from "src/components/atoms";
import type * as z from 'zod';
import { BiCheckCircle } from "react-icons/bi";

type ProfileData = z.infer<typeof clientSchema>

interface AddClientProps {
  companyId: string;
}

export const AddClient: FC<AddClientProps> = ({ companyId }) => {
  const [showAlert, setShowAlert] = useState(false)

  const methods = useForm<ProfileData>({
    resolver: zodResolver(clientSchema),
  });

  const { handleSubmit, formState: { errors } } = methods

  const onSubmit: SubmitHandler<ProfileData> = (data: ProfileData) => {
    addClient(data)
  };

  const { mutate: addClient, isLoading } = useMutation((data: ProfileData): any => {
    if (companyId) {
      return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}/client`, data)
    }
  },
    {
      onSuccess: () => {
        methods.reset()
        setShowAlert(true)
      }
    })

  return (
    <FormContainer>
      <h1 className="text-4xl font-medium text-content-primary">
        Add Client
      </h1>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center m-auto"
        >
          <div className="flex w-full gap-2 mt-14">
            <TextInput placeholder="First Name" error={errors.firstName?.message} name="firstName" />
            <TextInput placeholder="Last Name" error={errors.lastName?.message} name="lastName" />
          </div>
          <TextInput placeholder="Email" className="mt-6" error={errors.email?.message} name="email" />
          <TextInput placeholder="Phone number" className="mt-6" error={errors.phone?.message} name="phone" />

          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>Create</Button>
        </form>
      </FormProvider>
      <div className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 alert alert-success shadow-lg w-2/4 m-auto transition-all duration-700 ${showAlert ? "opacity-100" : "opacity-0"}`}>
        <div>
          <BiCheckCircle size={20} />
          <span>Client added successfully!</span>
        </div>
        <div className="flex-none">
          <button className="capitalize btn btn-xs btn-ghost" onClick={() => setShowAlert(false)}>Close</button>
        </div>
      </div>
    </ FormContainer>
  );
}

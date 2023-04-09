import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useState, type FC } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { mortgageSchema } from "./AddMortgage.validation";
import { Button, DatePicker, FormContainer, TextInput, Select, NumberInput } from "src/components/atoms";
import type * as z from 'zod';
import type { Client } from "src/types/interfaces";
import { ClientSelect } from "src/components/atoms/ClientSelect";
import { interestTypeOptions, purchseTypeOptions } from "./AddMortgage.constants";
import { useRouter } from "next/router";


type ProfileData = z.infer<typeof mortgageSchema>

interface AddMortgageProps {
  companyId: string;
}

export const AddMortgage: FC<AddMortgageProps> = ({ companyId }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const router = useRouter();

  const methods = useForm<ProfileData>({
    resolver: zodResolver(mortgageSchema),
  });

  const { handleSubmit, formState: { errors } } = methods

  const onSubmit: SubmitHandler<ProfileData> = (data: ProfileData) => {
    console.log(data);
    addMortgage(data)
  };

  const { mutate: addMortgage, isLoading } = useMutation((data: ProfileData): any => {
    if (companyId && selectedClient) {
      return axios.post(`http://localhost:3000/api/company/${companyId}/client/${selectedClient?.id}/mortgage`, data)
    }
  },
    {
      onSuccess: () => {
        router.push('/')
      }
    })

  const selectedClientName = selectedClient && `${selectedClient?.firstName} ${selectedClient?.lastName}`

  return (
    <FormContainer>
      <h1 className="text-4xl text-content-primary font-medium">
        Add Mortgage
      </h1>
      <div className="flex flex-col items-center m-auto">
        <ClientSelect companyId={companyId} setSelectedClient={setSelectedClient} />
        {selectedClient && (
          <>
            <p className="mt-14">Add mortgage for {selectedClientName}:</p>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=""
              >
                <TextInput placeholder="First line of address" className="mt-6" error={errors.firstLineOfAddress?.message} name="firstLineOfAddress" />
                <div className="flex gap-2 mt-6">
                  <TextInput placeholder="City" error={errors.city?.message} name="city" />
                  <TextInput placeholder="Postcode" error={errors.postcode?.message} name="postcode" />
                </div>
                <div className="flex gap-2 mt-6">
                  <Select options={interestTypeOptions} name="interestType" placeholder="Interest type" className="flex-1" />
                  <Select options={purchseTypeOptions} name="purchaseType" placeholder="Purchase type" className="flex-1" />
                </div>
                <div className="flex gap-2 mt-6">
                  <DatePicker placeholder="Purchase Date" name="purchaseDate" />
                  <DatePicker placeholder="Renewal Date" name="renewalDate" />
                </div>
                <NumberInput placeholder="Initial mortgage amount (£)" className="mt-6" error={errors.initialMortgageAmount?.message} name="initialMortgageAmount" />

                <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>Create</Button>
              </form>
            </FormProvider>
          </>
        )}

      </div>
    </ FormContainer>
  );
}

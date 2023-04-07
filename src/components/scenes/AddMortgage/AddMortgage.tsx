import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useState, type FC, useCallback } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { mortgageSchema } from "./AddMortgage.validation";
import { Button, FormContainer, Input } from "src/components/atoms";
import type * as z from 'zod';
import { BiCheckCircle } from "react-icons/bi";
import debounce from "lodash/debounce";
import AsyncSelect from "react-select/async";

type ProfileData = z.infer<typeof mortgageSchema>

interface AddMortgageProps {
  companyId: string;
}

export const AddMortgage: FC<AddMortgageProps> = ({ companyId }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null);

  const methods = useForm<ProfileData>({
    resolver: zodResolver(mortgageSchema),
  });

  const { handleSubmit, formState: { errors } } = methods

  const onSubmit: SubmitHandler<ProfileData> = (data: ProfileData) => {
    AddMortgage(data)
  };

  const { mutate: addMortgage, isLoading } = useMutation((data: ProfileData): any => {
    if (companyId) {
      return axios.post(`http://localhost:3000/api/company/${companyId}/client`, data)
    }
  },
    {
      onSuccess: () => {
        methods.reset()
        setShowAlert(true)
      }
    })

  const getClientOptions = async (inputText: string): any => {
    const response = await axios.get(
      `http://localhost:3000/api/company/${companyId}/client/search?search=${inputText.toLowerCase()}`
    )

    const clients = response.data;

    return clients.map((client) => ({
      value: client,
      label: `${client.firstName} ${client.lastName} - ${client.email}`,
    }));

  };

  const loadOptions = useCallback(
    debounce((inputText, callback) => {
      getClientOptions(inputText).then((options) => callback(options));
    }, 1000),
    []
  );

  const selectedClientName = `${selectedClient?.firstName} ${selectedClient?.lastName}`

  return (
    <FormContainer>
      <h1 className="text-4xl text-content-primary font-medium">
        Add Mortgage
      </h1>
      <div className="w-80 flex flex-col items-center m-auto">
        <AsyncSelect
          // cacheOptions
          // inputValue={inputValue}
          loadOptions={loadOptions}
          defaultValue={[]}
          isClearable
          defaultOptions={[]}
          placeholder="Search by email..."
          className="mt-14 text-left w-full"
          onChange={(selected) => {
            if (selected) {
              setSelectedClient(selected.value)
            } else {
              setSelectedClient(null)
            }
            console.log('selected', selected);
          }}
        />
        {selectedClient && (
          <p className="mt-6">Add mortgage for {selectedClientName}:</p>
        )}
        {/* <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center m-auto"
        >
          <Input type="text" placeholder="First Name" className="mt-14" error={errors.firstName?.message} name="firstName" />
          <Input type="text" placeholder="Last Name" className="mt-6" error={errors.lastName?.message} name="lastName" />
          <Input type="text" placeholder="Email" className="mt-6" error={errors.email?.message} name="email" />
          <Input type="text" placeholder="Phone number" className="mt-6" error={errors.phone?.message} name="phone" />
          <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>Create</Button>
        </form>
      </FormProvider> */}
      </div>
      {/* <div className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 alert alert-success shadow-lg w-2/4 m-auto transition-all duration-700 ${showAlert ? "opacity-100" : "opacity-0"}`}>
        <div>
          <BiCheckCircle size={20} />
          <span>Client added successfully!</span>
        </div>
        <div className="flex-none">
          <button className="btn btn-xs btn-ghost capitalize" onClick={() => setShowAlert(false)}>Close</button>
        </div>
      </div> */}
    </ FormContainer>
  );
}

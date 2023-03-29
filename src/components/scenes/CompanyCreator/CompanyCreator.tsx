import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { type FC } from "react";

interface CompanyCreatorProps {
  setCreatedCompany: (created: boolean) => void
}

interface FormValues {
  name: string;
}

const CompanyCreator: FC<CompanyCreatorProps> = ({ setCreatedCompany }) => {
  const { register, handleSubmit } = useForm<FormValues>();


  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    createCompany(data)
  };

  const { mutate: createCompany, isLoading } = useMutation((data: FormValues) => {
    return axios.post(`http://localhost:3000/api/company`, data)
  }, {
    onSuccess: () => setCreatedCompany(true)
  })

  return (
    <>
      <h1 className="mt-16 text-4xl font-medium">
        Company Creation
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center m-auto w-80">
        <input type="text" placeholder="Company Name" className="w-full max-w-xs input input-bordered border-slate-200 mt-9" {...register("name")} />
        <input type="file" className="file-input file-input-primary w-full max-w-xs mt-3" />
        <button type="submit" className="w-full mt-3 btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default CompanyCreator;
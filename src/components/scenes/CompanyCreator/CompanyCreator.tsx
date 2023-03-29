import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";

const CompanyCreator = ({ setCreatedCompany }) => {
  const { register, handleSubmit } = useForm();


  const onSubmit = (data: { name: string }) => {
    createCompany(data)
  };

  const { mutate: createCompany, isLoading } = useMutation((data: { name: string }) => {
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
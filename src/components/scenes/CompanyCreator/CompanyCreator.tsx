import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { type FC } from "react";
import * as XLSX from 'xlsx';
import camelcase from "camelcase";

interface CompanyCreatorProps {
  setCreatedCompany: (created: boolean) => void
}

interface FormValues {
  name: string;
  clientsFile: File;
}

const CompanyCreator: FC<CompanyCreatorProps> = ({ setCreatedCompany }) => {
  const { register, handleSubmit } = useForm<FormValues>();


  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const companyName = data.name
    const clientsFile = data.clientsFile[0]

    const reader = new FileReader();
    reader.readAsBinaryString(clientsFile);

    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });

      const headers = rows[0].map((header) => camelcase(header));

      rows.shift();

      const clients = rows.filter(row => row.length > 0).map(row => {
        const obj = {};

        headers.forEach((header, i) => {
          if (header === 'purchaseDate' || header === 'renewalDate') {
            var date1 = row[i].split('/')
            var newDate = date1[1] + '/' + date1[0] + '/' + date1[2];
            obj[header] = new Date(newDate)
          } else if (header === 'initialMortgageAmount') {
            obj[header] = parseInt(row[i])
          }
          else {
            obj[header] = row[i];
          }
        });
        return obj;
      });

      const dataToSend = {
        name: companyName,
        clients
      }

      createCompany(dataToSend);
    };

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
        <input type="text" placeholder="Company Name" className="w-full max-w-xs input input-bordered border-slate-200 mt-14" {...register("name")} />
        <input type="file" className="file-input file-input-primary w-full max-w-xs mt-6" {...register("clientsFile")} />
        <button type="submit" className="w-full mt-6 btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default CompanyCreator;
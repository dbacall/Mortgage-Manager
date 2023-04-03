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

      const clientKeys = ['firstName', 'lastName', 'email', 'phone']

      const mortgageKeys = ['email', 'interestType', 'purchaseType', 'firstLineOfAddress', 'city', 'postcode', 'purchaseDate', 'renewalDate', 'initialMortgageAmount']

      const clients = []
      const mortgages = [];

      rows.filter(row => row.length > 0).forEach(row => {
        const client = {};
        const mortgage = {};

        console.log(headers);

        headers.forEach((header, i) => {

          if (clientKeys.includes(header)) client[header] = row[i]
          if (mortgageKeys.includes(header)) {
            if (header === 'purchaseDate' || header === 'renewalDate') {
              var date1 = row[i].split('/')
              var newDate = date1[1] + '/' + date1[0] + '/' + date1[2];
              mortgage[header] = new Date(newDate)
            } else if (header === 'initialMortgageAmount') {
              mortgage[header] = parseInt(row[i])
            } else {
              mortgage[header] = row[i]
            }
          }
        });
        clients.push(client)
        mortgages.push(mortgage)
      });

      const dataToSend = {
        name: companyName,
        clients,
        mortgages
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
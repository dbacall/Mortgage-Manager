import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useState, type FC } from "react";
import * as XLSX from 'xlsx';
import camelcase from "camelcase";
import { companySchema } from "./CompanyCreator.validation";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FileUpload, TextInput } from "src/components/atoms";

interface CompanyCreatorProps {
  setCreatedCompany: (created: boolean) => void
}

type CompanyData = z.infer<typeof companySchema>

export const CompanyCreator: FC<CompanyCreatorProps> = ({ setCreatedCompany }) => {
  const [downloadedFile, setDownloadedFile] = useState(false)

  const methods = useForm<CompanyData>(
    {
      resolver: zodResolver(companySchema),
    }
  );

  const { handleSubmit, formState: { errors } } = methods;

  console.log(errors);

  const onSubmit: SubmitHandler<CompanyData> = async (data: CompanyData) => {
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

  const { mutate: createCompany, isLoading } = useMutation((data: CompanyData) => {
    return axios.post(`http://localhost:3000/api/company`, data)
  }, {
    onSuccess: () => setCreatedCompany(true)
  })

  return (
    <>
      <h1 className="text-4xl font-medium text-content-primary">
        Company Creation
      </h1>
      <div className="flex flex-col items-center w-full m-auto">
        {!downloadedFile ? (
          <>
            <p className="mt-14 text-content-primary">Click <a className="px-0 btn btn-link" href="/feemo-clients-template.xlsx" download>here</a> to download excel template.</p>
            <button onClick={() => setDownloadedFile(true)} className="w-full mt-14 btn btn-primary">Continue</button>
          </>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} >
              <TextInput placeholder="Company Name" className="mt-14" error={errors.name?.message} name="name" />
              <FileUpload className="mt-6" name="clientsFile" error={errors.clientsFile?.message} />
              <Button type="submit" className="mt-6" isLoading={isLoading}>Submit</Button>
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
}

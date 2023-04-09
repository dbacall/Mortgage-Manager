import axios, { type AxiosResponse } from "axios";
import debounce from "lodash/debounce";
import { type FC, useCallback } from "react";
import AsyncSelect from "react-select/async";
import type { Client } from "src/types/interfaces";
import type { ClientOption, ClientSelectProps } from "./ClientSelect.models";

export const ClientSelect: FC<ClientSelectProps> = ({ companyId, setSelectedClient }) => {

  const getClientOptions = async (inputText: string): Promise<ClientOption[]> => {
    const response: AxiosResponse<Client[]> = await axios.get(
      `http://localhost:3000/api/company/${companyId}/client/search?search=${inputText.toLowerCase()}`
    )

    const clients = response.data;

    return clients.map((client) => ({
      value: client,
      label: `${client.firstName} ${client.lastName} - ${client.email}`,
    }));

  };

  const loadOptions = useCallback(
    debounce((inputText: string, callback: (options: ClientOption[]) => void) => {
      getClientOptions(inputText).then((options) => callback(options)).catch(err => { });
    }, 1000),
    []
  );

  return (
    <AsyncSelect
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
      }}
    />
  );
}

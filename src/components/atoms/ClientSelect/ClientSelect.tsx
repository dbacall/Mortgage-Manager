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
      placeholder="Search by name or email..."
      className="mt-14 text-left w-full"
      onChange={(selected) => {
        if (selected) {
          setSelectedClient(selected.value)
        } else {
          setSelectedClient(null)
        }
      }}
      classNames={{
        control: () => "select select-bordered border-slate-200 font-medium text-md rounded-lg pr-1 bg-none cursor-text shadow-none",
        valueContainer: () => "p-0",
        input: () => "m-0",
        singleValue: () => "m-0 text-md text-content-primary",
        placeholder: () => "m-0 text-md text-content-tertiary",
        dropdownIndicator: () => "text-content-tertiary",
        indicatorSeparator: () => "text-content-tertiary",
        option: (state) => {
          let background = 'transparent';
          let color = 'text-content-primary';
          if (state.isFocused) {
            background = 'bg-primary-content';
            color = 'text-primary-focus'
          }
          if (state.isSelected) {
            background = 'bg-primary';
            color = 'text-primary-content'
          }
          return `m-0 text-sm text-content-primary ${background} ${color}`
        },
        menu: () => "rounded-lg",
        noOptionsMessage: () => "text-sm text-content-tertiary text-left",
        loadingMessage: () => "text-sm text-content-tertiary text-left",
      }}
      components={{
        IndicatorSeparator: null
      }}
    />
  );
}

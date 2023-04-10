import { type FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import ReactSelect from 'react-select';

interface SelectProps {
  options: Option[]
  placeholder: string;
  className?: React.ComponentProps<'select'>['className'];
  name: string
}

interface Option {
  label: string;
  value: string;
}

export const Select: FC<SelectProps> = ({
  options,
  name,
  placeholder,
  className = ""
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <ReactSelect
            placeholder={placeholder}
            options={options}
            className={`text-left w-full ${className}`}
            classNames={{
              control: () => "select select-bordered border-slate-200 font-medium text-md rounded-lg pr-1 bg-none shadow-none",
              valueContainer: () => "p-0",
              input: () => "m-0 focus:outline-content-tertiary",
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
            inputRef={field.ref}
            value={options.find(c => c.value === field.value)}
            onChange={val => field.onChange(val?.value)}
            isSearchable={false}
          />
        )
      }
      }
    />

  );
}

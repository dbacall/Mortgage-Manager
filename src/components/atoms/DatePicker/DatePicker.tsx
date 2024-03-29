import { type FC, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { type DatePickerProps } from "./DatePicker.models";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendarAlt } from 'react-icons/bi';

export const DatePicker: FC<DatePickerProps> = ({
  className = "",
  placeholder,
  name,
  minDate
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const { control } = useFormContext();

  return (
    <div className="relative w-full flex-1">
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ReactDatePicker
            selected={startDate}
            showYearDropdown
            showMonthDropdown
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            scrollableYearDropdown
            dropdownMode="select"
            className={`input input-bordered caret-transparent w-full text-base border-slate-200 text-content-primary placeholder-content-tertiary ${className}`}
            placeholderText={placeholder}
            dateFormat="dd/MM/yyyy"
            minDate={minDate}
            {...field}
            onChange={(date: Date) => {
              setStartDate(date)
              field.onChange(date)
            }}
          />
        )
        }
      />
      <BiCalendarAlt size={20} className="absolute text-content-tertiary right-3 top-1/2 transform -translate-y-1/2" />
    </div>

  );
}

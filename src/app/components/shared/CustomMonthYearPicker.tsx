import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { FieldProps } from 'formik';

interface CustomMonthYearPickerProps extends FieldProps {
  info: string;
  className: string;
}

const CustomMonthYearPicker: React.FC<CustomMonthYearPickerProps> = ({
  field,
  form: { setFieldValue, touched, errors },
  info,
  className,
  ...props
}) => {
  const monthFormat = 'MM/YYYY';

  // Handle change in the date picker
  const handleChange = (value: dayjs.Dayjs | null) => {
    // If value is not null, update the form value
    if (value) {
      // Convert to [MM, YYYY] array
      setFieldValue(
        field.name,
        `${value.format('MM')}/${value.format('YYYY')}`,
      );
    }
  };

  // If field value is in the format ["MM", "YYYY"], convert it to dayjs
  const currentDate =
    field.value && field.value.length === 2
      ? dayjs(field.value, monthFormat)
      : null;

  // Determine error state
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : info;

  return (
    <div>
      <DatePicker
        {...props}
        value={currentDate ? currentDate : undefined}
        format={monthFormat}
        picker="month"
        onChange={handleChange}
        className={className}
      />
      <small className={`text-xs ${isError ? 'text-error' : 'text-darklink'}`}>
        {typeof text === 'string' ? text : info}
      </small>
    </div>
  );
};

export default CustomMonthYearPicker;

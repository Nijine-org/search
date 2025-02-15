import React from 'react';
import { DatePicker } from 'antd';
import { FieldProps } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import { disabledDate } from '@/utils/helper';
import config from '@/services/globalConfig';
interface CustomDatePickerProps extends FieldProps {
  placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  field,
  form,
  ...props
}) => {
  // Handle date change
  const handleChange = (date: Dayjs) => {
    form.setFieldValue(field.name, date.format(config.DATE_FORMAT));
  };

  // Handle blur event
  const handleBlur = () => {
    form.setFieldTouched(field.name, true);
  };

  return (
    <DatePicker
      {...field}
      {...props}
      size="large"
      className="w-full text-xs"
      // defaultValue={dayjs()} // Sets today's date as the default value
      format={config.DATE_FORMAT}
      disabledDate={disabledDate} // Disable dates condition
      onChange={handleChange} // Handle date change
      onBlur={handleBlur} // Handle blur
      value={
        form.values[field.name]
          ? dayjs(form.values[field.name], config.DATE_FORMAT)
          : null
      } // Set selected value
    />
  );
};

export default CustomDatePicker;

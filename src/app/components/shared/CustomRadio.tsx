'use client';
import React from 'react';
import { Radio } from 'antd';
import { FieldProps } from 'formik';

interface Props extends FieldProps {
  info: string;
  options: {
    label: string;
    value: string;
  }[];
}
const CustomRadio = ({ field, form: { touched, errors }, ...props }: Props) => {
  const { info, options, ...config } = props;
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : info;

  return (
    <div>
      <div className="flex items-center gap-2">
        {/* <Label htmlFor={field.name}>{labelText}</Label> */}
        <Radio.Group options={options} {...field} {...config} />
      </div>

      <small
        className={`text-xs ${isError ? 'text-error' : 'text-darklink'}  `}
      >{`${text || ''}`}</small>
    </div>
  );
};

export default CustomRadio;

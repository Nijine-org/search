import React from 'react';
import { Input } from 'antd';
import { FieldProps } from 'formik';

interface Props extends FieldProps {
  info: string;
}
const CustomInput = ({ field, form: { touched, errors }, ...props }: Props) => {
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : props.info;

  return (
    <div>
      <Input className="form-control" {...field} {...props} size="large" />
      <small
        className={`text-xs ${isError ? 'text-error' : 'text-darklink'}  `}
      >{`${text || ''}`}</small>
    </div>
  );
};

export default CustomInput;

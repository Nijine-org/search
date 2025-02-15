import React from 'react';
import { Checkbox } from 'antd';
import { FieldProps } from 'formik';
import { Label } from 'flowbite-react';

interface Props extends FieldProps {
  info: string;
  labelText: string;
}
const CustomCheckBox = ({
  field,
  form: { touched, errors },
  ...props
}: Props) => {
  const { info, labelText, ...config } = props;
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : info;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Checkbox {...field} {...config} />
        <Label htmlFor={field.name}>{labelText}</Label>
      </div>

      <small
        className={`text-xs ${isError ? 'text-error' : 'text-darklink'}  `}
      >{`${text}`}</small>
    </div>
  );
};

export default CustomCheckBox;

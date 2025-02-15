import React from 'react';
import { Input } from 'antd'; // Ant Design Input supports TextArea
import { FieldProps } from 'formik';

const { TextArea } = Input;

interface Props extends FieldProps {
  info: string;
}

const CustomTextArea = ({
  field,
  form: { touched, errors },
  ...props
}: Props) => {
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : props.info;

  return (
    <div>
      <TextArea
        className="form-control"
        {...field}
        {...props}
        size="large"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <small
        className={`text-xs ${isError ? 'text-error' : 'text-darklink'}`}
      >{`${text}`}</small>
    </div>
  );
};

export default CustomTextArea;

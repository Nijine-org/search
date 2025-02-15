import React from 'react';
import { Input, Tooltip } from 'antd';
import { FieldProps } from 'formik';

interface Props extends FieldProps {
  info: string;
}
const CustomInputFieldWithTooltip = ({
  field,
  form: { touched, errors },
  ...props
}: Props) => {
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : props.info;

  return (
    <div>
      <Tooltip
        className="text-error"
        overlayClassName="text-xl"
        color="red"
        title={() => <p>{`${text}`}</p>}
        open={Boolean(isError)}
      >
        <Input className="form-control" {...field} {...props} size="large" />
      </Tooltip>
      {/* <small
        className={`text-xs ${isError ? 'text-error' : 'text-darklink'}  `}
      >{`${text}`}</small> */}
    </div>
  );
};

export default CustomInputFieldWithTooltip;

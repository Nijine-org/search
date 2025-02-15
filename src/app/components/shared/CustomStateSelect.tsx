import React from 'react';
import { Select } from 'antd';
import { FieldProps } from 'formik';
import useSelectComponentOptionFetcher from '@/app/hooks/useSelectComponentOptionFetcher';

interface Props extends FieldProps {
  info: string;
  className: string;
  endpoint: string;
  tags: string[];
}
const CustomStateSelect = ({
  field,
  form: { setFieldValue, touched, errors },
  ...props
}: Props) => {
  // Here I destructuring the Select component attributes
  // in to config
  const { info, className, endpoint, tags, ...config } = props;
  // console.log('custom state select', endpoint);
  // If the input field is get touched and the error is exist then the
  // Error message will get show instead the info
  const depententId = '101';
  const isError = !depententId
    ? 'please select a state'
    : touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : info;
  const { apiData: data, isLoading } = useSelectComponentOptionFetcher<
    {
      label: string;
      value: string;
    }[]
  >({
    endpoint,
    tags,
    data: { country_id: depententId },
  });
  // console.log('data from custom state select', data);
  return (
    <div>
      <Select
        {...props}
        onChange={(value) => setFieldValue(field.name, value)}
        className={`${className} select-md w-full`}
        size="large"
        options={data ? data : undefined}
        {...config}
        loading={isLoading}
        notFoundContent={!depententId && 'please select a state'}
        defaultValue={field.value}
        defaultActiveFirstOption
      />
      <small className={`text-xs ${isError ? 'text-error' : 'text-darklink'}`}>
        {typeof text === 'string' ? text : info}
        {/* Ensures text is a string */}
      </small>
    </div>
  );
};

export default CustomStateSelect;

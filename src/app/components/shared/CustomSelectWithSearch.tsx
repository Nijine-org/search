import React, { useState } from 'react';
import { Select, Space } from 'antd';
import { FieldProps } from 'formik';
import useSelectComponentOptionFetcher from '@/app/hooks/useSelectComponentOptionFetcher';
import { EmployeeOption } from '@/app/(DashboardLayout)/payroll/loans/_types';
interface Props extends FieldProps {
  info: string;
  className: string;
  endpoint: string;
  tags: string[];
  onChange?: (value: string) => void;
  options?: EmployeeOption[];
}

const CustomSelectWithSearch = ({
  field,
  form: { setFieldValue, touched, errors },
  ...props
}: Props) => {
  // Here I destructuring the Select component attributes
  // in to config
  const { info, className, endpoint, tags, options, onChange } = props;

  // If the input field is get touched and the error is exist then the
  // Error message will get show instead the info
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : info;
  const [params, setParams] = useState({
    search: '',
  });
  const { apiData, isLoading } = useSelectComponentOptionFetcher<
    EmployeeOption[]
  >({
    endpoint,
    tags,
    params,
  });
  const handleSearch: (value: string) => void = (value) => {
    setParams((prev) => ({
      ...prev,
      search: value,
    }));
  };
  return (
    <div>
      <Select
        showSearch
        {...props}
        value={field.value || undefined}
        onSearch={handleSearch}
        onChange={
          onChange ? onChange : (value) => setFieldValue(field.name, value)
        }
        className={`${className} select-md w-full`}
        filterOption={false}
        size="large"
        options={options ? options : apiData ? apiData : undefined}
        loading={isLoading}
        optionRender={(option) => (
          <Space>
            <span aria-label={option.data.label}>{option.data.label}</span>
            {` ${option.data.employee_id}`}
          </Space>
        )}
      />
      <small className={`text-xs ${isError ? 'text-error' : 'text-darklink'}`}>
        {typeof text === 'string' ? text : info}
        {/* Ensures text is a string */}
      </small>
    </div>
  );
};

export default CustomSelectWithSearch;

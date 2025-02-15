import React, { useEffect } from 'react';
import { Select } from 'antd';
import { FieldProps } from 'formik';
import useSelectComponentOptionFetcher from '@/app/hooks/useSelectComponentOptionFetcher';
import { empFilterStore } from '@/app/store/empFilterStore';
import { useStore } from '@tanstack/react-store';

type QueryParams = {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | object
    | null
    | undefined;
};
interface Props extends FieldProps {
  info: string;
  className: string;
  endpoint: string;
  tags: string[];
  params?: QueryParams;
  dropdown_value?: number[];
}
const CustomMultiSelect = ({
  field,
  form: { setFieldValue, touched, errors },
  ...props
}: Props) => {
  const { designation_ids } = useStore(empFilterStore, (state) => state);

  // Here I destructuring the Select component attributes
  // in to config
  const { info, className, endpoint, tags, params, dropdown_value, ...config } =
    props;

  // If the input field is get touched and the error is exist then the
  // Error message will get show instead the info
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : info;
  const { apiData, isLoading } = useSelectComponentOptionFetcher<
    {
      label: string;
      value: number;
    }[]
  >({
    endpoint,
    tags,
    params,
  });

  const validDefaultValue =
    endpoint === 'fin-dept_based_designation'
      ? (designation_ids?.filter((value: number) =>
          apiData?.some((option) => Number(option.value) === value),
        ) ?? [])
      : dropdown_value;

  useEffect(() => {
    if (
      endpoint === 'fin-dept_based_designation' &&
      JSON.stringify(designation_ids) !== JSON.stringify(validDefaultValue) &&
      apiData &&
      apiData?.length > 0
    ) {
      empFilterStore.setState((prev) => ({
        ...prev,
        designation_ids: validDefaultValue ?? [],
      }));
    }
  }, [validDefaultValue, endpoint, apiData]);

  return (
    <div>
      <Select
        {...props}
        mode="multiple"
        maxTagCount="responsive"
        // filterOption={true}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        allowClear={true}
        onChange={(value) => setFieldValue(field.name, value)}
        className={`${className} select-md w-full`}
        size="large"
        options={apiData ? apiData : undefined}
        {...config}
        loading={isLoading}
        value={validDefaultValue}
      />
      <small className={`text-xs ${isError ? 'text-error' : 'text-darklink'}`}>
        {typeof text === 'string' ? text : info}
        {/* Ensures text is a string */}
      </small>
    </div>
  );
};

export default CustomMultiSelect;

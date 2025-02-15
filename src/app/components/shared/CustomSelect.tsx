import React from 'react';
import { Select } from 'antd';
import { FieldProps } from 'formik';
import useSelectComponentOptionFetcher from '@/app/hooks/useSelectComponentOptionFetcher';

interface Props extends FieldProps {
  info: string;
  className: string;
  endpoint: string;
  tags: string[];
  onChange?: (value: string) => void;
  options?: {
    label: string;
    value: string;
  }[];
}
const CustomSelect = ({
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

  const { apiData, isLoading } = useSelectComponentOptionFetcher<
    {
      label: string;
      value: string;
    }[]
  >({
    endpoint,
    tags,
  });

  // Load the select options from the Masters API endpoint;
  // useLayoutEffect(() => {
  //   if (!endpoint) {
  //     console.log('Endpoint is not provided');
  //     return;
  //   }
  //   setApiData((prev) => ({ ...prev, isLoading: true }));

  //   // apiClient
  //   //   .getRequest({ endpoint })
  //   axios
  //     .get(endpoint)
  //     .then((res) => {
  //       // console.log('res', res);
  //       setApiData((prev) => ({
  //         ...prev,
  //         isLoading: false,
  //         isSuccess: true,
  //         data: res.data,
  //       }));
  //     })
  //     .catch((err) => {
  //       // console.log('err', err);
  //       setApiData((prev) => ({
  //         ...prev,
  //         isLoading: false,
  //         isError: true,
  //         error: err,
  //       }));
  //     });
  // }, []);
  // const options = data?.map((option) => ({
  //   value: option.id,
  //   label: option.name,
  // }));
  // console.log('option', options);
  // console.log('field', field);
  return (
    <div>
      <Select
        {...props}
        value={field.value || undefined}
        onChange={
          onChange ? onChange : (value) => setFieldValue(field.name, value)
        }
        className={`${className} select-md w-full`}
        size="large"
        options={options ? options : apiData ? apiData : undefined}
        loading={isLoading}
        // defaultActiveFirstOption
        // defaultValue={field.value}
        // value={field.value}
      />
      <small className={`text-xs ${isError ? 'text-error' : 'text-darklink'}`}>
        {typeof text === 'string' ? text : info}
        {/* Ensures text is a string */}
      </small>
    </div>
  );
};

export default CustomSelect;

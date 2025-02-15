import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from 'antd';

const ConsoleValuesButton = () => {
  const { values } = useFormikContext();
  return (
    <Button
      onClick={() => {
        console.log('Formik values:', values);
      }}
    >
      Values
    </Button>
  );
};

export default ConsoleValuesButton;

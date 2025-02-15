import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from 'antd';

const ConsoleErrorsButton = () => {
  const { errors } = useFormikContext();
  return (
    <Button
      onClick={() => {
        console.log('Formik errors:', errors);
      }}
    >
      Errors
    </Button>
  );
};

export default ConsoleErrorsButton;

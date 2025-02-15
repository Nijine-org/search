'use client';

import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { Field, Form, Formik } from 'formik';
import CustomInput from '@/app/components/shared/CustomInput';
import CustomSelect from '@/app/components/shared/CustomSelect';
import { openNotification } from '@/utils/helper';
import { LoanTypeFormData } from '@/app/(DashboardLayout)/payroll/loans/_types';
import { loanTypeFormValidation } from '@/app/(DashboardLayout)/payroll/loans/_validation';
import { notification } from 'antd';
import { Label } from 'flowbite-react';
import Link from 'next/link';
import { loanTypeOptions } from '@/app/(DashboardLayout)/payroll/loans/_constants';

type ModalProps<T> = {
  openEmployeeModal: boolean;
  handleModalClose: () => void;
  action: T;
  initialValues: LoanTypeFormData;
  id?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const LoanTypeModal = <T extends Function>({
  openEmployeeModal,
  handleModalClose,
  action,
  initialValues,
  id,
}: ModalProps<T>) => {
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async (values: LoanTypeFormData) => {
    const response = await action(values, id);
    openNotification({
      type: response.state ? 'success' : 'error',
      title: response.state ? 'Added' : 'Failed',
      description: response.state ? (
        <Link href="/payroll/loans/loan-types">
          <p>Click to see the loan type list</p>
        </Link>
      ) : (
        <p>{response.message}</p>
      ),
      api,
    });
  };

  return (
    <Modal show={openEmployeeModal} size="4xl" onClose={handleModalClose}>
      <Modal.Header>Add Loan Type</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={loanTypeFormValidation}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {contextHolder}
              <div className="grid grid-cols-12 gap-4 w-full">
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="mb-5">
                    <Label htmlFor="name" value="Loan Name" />
                    <Field
                      id="name"
                      name="name"
                      placeholder="Enter a Loan name"
                      component={CustomInput}
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="mb-5">
                    <Label htmlFor="interest" value="Interest Rate(%)" />
                    <Field
                      id="interest"
                      name="interest"
                      placeholder="Enter loan interest"
                      component={CustomInput}
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="mb-5">
                    <Label htmlFor="term" value="Loan Tenure" />
                    <Field
                      id="tenure"
                      name="tenure"
                      placeholder="Enter loan tenure"
                      component={CustomInput}
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="mb-5">
                    <Label htmlFor="interest_type" value="Interest type" />
                    <Field
                      id="interest_type"
                      name="interest_type"
                      placeholder="Select interest type"
                      options={loanTypeOptions}
                      component={CustomSelect}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button color="error" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default LoanTypeModal;

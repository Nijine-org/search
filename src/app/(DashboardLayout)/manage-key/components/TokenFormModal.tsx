'use client';
import CancelButton from '@/app/components/shared/CancelButton';
import CustomInput from '@/app/components/shared/CustomInput';
import SubmitButton from '@/app/components/shared/SubmitButton';
import { openNotification } from '@/utils/helper';
import { notification } from 'antd';
import { Label } from 'flowbite-react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { TokenFormData } from '../type';
import { tokenFormValidation } from '../_validation/tokenFormValidation';
import ModalWarpper from '@/app/components/shared/ModalWarpper';
type Props<T> = {
  modalState: boolean;
  handleOk: () => void;
  id?: string;
  action: T;
  initialValues: TokenFormData;
  handleCancelClick: () => void;
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const TokenFormModal = <T extends Function>({
  action,
  id,
  initialValues,
  handleCancelClick,
  modalState,
  handleOk,
}: Props<T>) => {
  const [api, contextHolder] = notification.useNotification();
  const handleSubmit = async (values: TokenFormData, resetForm: () => void) => {
    const response = await action(values, id);
    resetForm();
    // console.log('responxe', response.message);
    openNotification({
      type: response.state ? 'success' : 'error',
      title: response.state ? 'Added' : 'Failed',
      description: response.message,
      api,
    });
  };

  return (
    <ModalWarpper
      state={modalState}
      handleOk={handleOk}
      handleCancel={handleCancelClick}
    >
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={tokenFormValidation}
          onSubmit={(values, { resetForm }) => {
            //console.log('form submitted', values);
            handleSubmit(values, resetForm);
          }}
        >
          <Form>
            {contextHolder}
            <div className="mb-4">
              <div className="grid grid-cols-12 gap-6 mb-4">
                {/* Grid 1 */}
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-5">
                    <div className="mb-3 block">
                      <Label htmlFor="name" value="Token Name" />
                    </div>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Enter token name"
                      info="Enter token name"
                      component={CustomInput}
                    />
                  </div>
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-5">
                    <div className="mb-3 block">
                      <Label htmlFor="token" value="Token" />
                    </div>
                    <Field
                      id="token"
                      name="token"
                      placeholder="Enter Token"
                      info="Enter Token"
                      component={CustomInput}
                      className="col-span-2 w-full px-2 py-1 border rounded" // Adjust input width here
                    />
                  </div>
                </div>

                <div className=" col-span-10">
                  <div className="sm:flex items-center justify-end gap-3">
                    <SubmitButton />
                    <CancelButton handleClick={handleCancelClick} />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </>
    </ModalWarpper>
  );
};

export default TokenFormModal;

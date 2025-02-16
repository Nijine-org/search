import React from 'react';
import { Modal } from 'antd';
type Props = {
  state: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  children: React.ReactNode;
};
const ModalWarpper = ({ state, handleOk, handleCancel, children }: Props) => {
  return (
    <Modal
      title="Basic Modal"
      open={state}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default ModalWarpper;

'use client';
import { Button, Modal } from 'flowbite-react';
import React from 'react';
import SelectedEmployeeTable from './SelectedEmployeeTable';

type Props = {
  state: boolean;
  toggleFunction: () => void;
};
const SelectedEmployeeModal: React.FC<Props> = ({ state, toggleFunction }) => {
  return (
    <Modal show={state} size="4xl" onClose={toggleFunction}>
      <Modal.Header> </Modal.Header>
      <Modal.Body>
        <SelectedEmployeeTable />
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full flex items-center justify-end gap-2">
          <Button color="error" onClick={toggleFunction}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectedEmployeeModal;

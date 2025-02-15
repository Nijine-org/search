import React from 'react';
import { Button, Modal } from 'flowbite-react';
import CustomMultiSelect from './CustomMultiSelect';
import { Field, useFormikContext } from 'formik';
import EmployeeFilterTable from './EmployeeFilterTable';
import {
  empFilterStore,
  resetEmpFilterState,
} from '@/app/store/empFilterStore';
import { useStore } from '@tanstack/react-store';
import { resetEmpPaginationState } from '@/app/store/empPaginationStore';
import {
  empSelectedStore,
  resetEmpSelectedStore,
  resetSelectedEmployees,
} from '@/app/store/empSelectedStore';

interface ModalProps {
  openEmployeeModal: boolean;
  handleModalClose: () => void;
  selectionMode: 'single' | 'multi' | 'pool';
}

const CustomEmployeeFilter: React.FC<ModalProps> = ({
  openEmployeeModal,
  handleModalClose,
  selectionMode = 'multi',
}) => {
  const { department_ids = [], designation_ids = [] } = useStore(
    empFilterStore,
    (state) => state,
  );
  const { selected_employees = [], confirm_checked_employees = [] } = useStore(
    empSelectedStore,
    (state) => state,
  );

  const areFiltersApplied =
    department_ids?.length > 0 ||
    designation_ids?.length > 0 ||
    selected_employees?.length > 0 ||
    confirm_checked_employees?.length > 0;

  const params = { id: department_ids };
  const { values, setFieldValue } = useFormikContext<{
    employee_list: string[] | { user_id: string; amount: string }[];
  }>();
  const employee = values.employee_list;

  const handleSave = async () => {
    try {
      if (selectionMode !== 'pool') {
        empSelectedStore.setState((prev) => ({
          ...prev,
          confirm_checked_employees: selected_employees,
        }));
        setFieldValue('employee_list', selected_employees);
      } else {
        empSelectedStore.setState((prev) => ({
          ...prev,
          confirm_checked_employees: selected_employees,
        }));
      }
    } catch (error) {
      console.error('Error employee value:', error);
    }
  };
  const handleStoreResets = () => {
    resetEmpSelectedStore();
    resetEmpFilterState();
    resetEmpPaginationState();
    handleModalClose();
    empFilterStore.setState((prev) => ({
      ...prev,
      clearFilter: areFiltersApplied,
    }));
  };

  const handleModalReset = () => {
    if (employee && employee?.length > 0) {
      handleModalClose();
      empFilterStore.setState((prev) => ({
        ...prev,
        clearFilter: true,
      }));
    } else {
      handleStoreResets();
    }
  };
  //clear all filters
  const handleClearFilters = () => {
    resetEmpFilterState();
    resetSelectedEmployees();
    empFilterStore.setState((prev) => ({
      ...prev,
      page: 1,
      limit: 10,
      clearFilter: areFiltersApplied,
    }));
  };

  return (
    <Modal show={openEmployeeModal} size="6xl" onClose={handleModalReset}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <div className="w-full grid grid-cols-12 items-center gap-4 mb-4">
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <Field
              endpoint="fin-dept_list"
              tags={['fin-dept_list-dropdown']}
              placeholder="Choose your Department"
              component={CustomMultiSelect}
              dropdown_value={department_ids}
              onChange={(deptIds: number[]) => {
                empFilterStore.setState((prev) => ({
                  ...prev,
                  department_ids: deptIds,
                }));
              }}
            />
          </div>
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <Field
              endpoint={`fin-dept_based_designation`}
              params={params}
              tags={['fin-dept_based_designation-dropdown']}
              placeholder="Choose your Designation"
              component={CustomMultiSelect}
              dropdown_value={designation_ids}
              onChange={(designIds: number[]) => {
                empFilterStore.setState((prev) => ({
                  ...prev,
                  designation_ids: designIds,
                }));
              }}
            />
          </div>
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <button
              type="button"
              className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ${!areFiltersApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleClearFilters}
              disabled={!areFiltersApplied}
            >
              Clear All Filters
            </button>
          </div>
        </div>

        <EmployeeFilterTable
          selectionMode={selectionMode}
          name={'employee_list'}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full flex items-center justify-end gap-2">
          <Button color="error" onClick={handleModalReset}>
            Cancel
          </Button>
          <Button
            color={'primary'}
            className="sm:mb-0 mb-3 w-fit"
            aria-disabled={false}
            onClick={() => {
              handleSave();
              // handleModalReset();
              handleModalClose();
            }}
          >
            Save changes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomEmployeeFilter;

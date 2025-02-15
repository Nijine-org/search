'use client';
import React from 'react';
// import DefaultButton from '@/app/components/shared/DefaultButton';
import CustomEmployeeFilter from './CustomEmployeeFilter';
type Props = {
  state: boolean;
  toggleFunction: () => void;
  selectionMode: 'single' | 'multi' | 'pool';
};
const EmpolyeeFilter = ({ state, toggleFunction, selectionMode }: Props) => {
  return (
    <>
      <CustomEmployeeFilter
        openEmployeeModal={state}
        handleModalClose={toggleFunction}
        selectionMode={selectionMode}
      />
    </>
  );
};

export default EmpolyeeFilter;

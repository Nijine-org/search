'use client';
import React from 'react';

import SimpleBar from 'simplebar-react';

type ContactListProps = {
  children: React.ReactNode;
};

function EntityListWrapper({ children }: ContactListProps) {
  return (
    <>
      <SimpleBar className="max-h-[690px] ">
        <div className="border-right border-color-divider  h-full w-320">
          <div>{children}</div>
        </div>
      </SimpleBar>
    </>
  );
}

export default EntityListWrapper;

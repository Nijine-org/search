'use client';
import React from 'react';
import BreadcrumbComp from '@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp';
import CardBox from '@/app/components/shared/CardBox';
import { Drawer } from 'flowbite-react';

type ListComponentProps<L> = {
  paramId: string;
  listResponse: { data: L[] };
  openContact: () => void;
};

type DetailsComponentProps<D> = {
  detailsResponse: { data: D };
  onClickMobile: () => void;
};

type Props<L extends object, D> = {
  bCrumbTitle: string;
  bCrumb: { title: string; to: string }[];
  ListComponent: React.FC<ListComponentProps<L>>;
  DetailsComponent: React.FC<DetailsComponentProps<D>>;
  listResponse: { data: L[] };
  detailsResponse: { data: D };
  paramId: string;
};
const DetailsPageWrapper = <L extends object, D>({
  bCrumbTitle,
  bCrumb,
  ListComponent,
  DetailsComponent,
  listResponse,
  detailsResponse,
  paramId,
}: Props<L, D>) => {
  //   const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenChat, setIsOpenChat] = React.useState(false);
  // //console.log('bCrumb', bCrumb);
  const handleClose = () => {
    //console.log('handle close clicked');
    // setIsOpen(false);
  };
  const handleOpenContact = () => {
    //console.log('handleOpenContact clicked');
    // setIsOpen(true);
  };

  return (
    <>
      <BreadcrumbComp title={bCrumbTitle} items={bCrumb} />
      <CardBox className="p-0 overflow-hidden">
        <div className="flex">
          <Drawer
            open={isOpenChat}
            onClose={handleClose}
            className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent max-w-[350px] w-full  lg:z-[0] lg:border-e lg:border-ld border-e-0"
          >
            <ListComponent
              paramId={paramId}
              listResponse={listResponse}
              openContact={handleOpenContact}
            />
          </Drawer>
          {/* ------------------------------------------- */}
          {/* Right part */}
          {/* ------------------------------------------- */}
          <div className="grow w-[75%] shrink-0">
            <DetailsComponent
              detailsResponse={detailsResponse}
              onClickMobile={() => setIsOpenChat(true)}
            />
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default DetailsPageWrapper;

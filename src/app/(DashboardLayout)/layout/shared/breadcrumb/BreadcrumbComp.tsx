'use client';
import React from 'react';
import { Badge, Breadcrumb } from 'flowbite-react';
import CardBox from '@/app/components/shared/CardBox';
import { Icon } from '@iconify/react';
import Link from 'next/link';
interface BreadCrumbType {
  subtitle?: string;
  items?: { title: string; to: string }[];
  title: string;
  children?: JSX.Element;
}
const BreadcrumbComp = ({ items, title }: BreadCrumbType) => {
  //console.log('items', items);

  return (
    <>
      <CardBox className={`mb-[30px]`}>
        <Breadcrumb className="flex justify-between">
          <h6 className="text-base">{title}</h6>
          <div className="flex items-center gap-3 ms-auto">
            {items
              ? items.map((item, index) => (
                  <div key={item.title}>
                    {item.to === '/' ? (
                      <div className="flex">
                        <Link href={item.to}>
                          <Icon
                            icon="solar:home-2-line-duotone"
                            height={20}
                          ></Icon>
                        </Link>
                        <span className="ms-3">/</span>
                      </div>
                    ) : (
                      <div className="flex">
                        {index === items.length - 1 ? (
                          <Link href={item.to}>
                            <Badge color={'lightprimary'}>{item.title}</Badge>
                          </Link>
                        ) : (
                          <>
                            <Link href={item.to}>
                              <Badge
                                color={'lightgray'}
                                className="dark:bg-gray-700"
                              >
                                {item.title}
                              </Badge>
                            </Link>
                            <span className="ms-3">/</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))
              : ''}
          </div>
        </Breadcrumb>
      </CardBox>
    </>
  );
};

export default BreadcrumbComp;

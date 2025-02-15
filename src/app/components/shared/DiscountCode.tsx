"use client";
import React from "react";
import CardBox from "@/app/components/shared/CardBox";
import { Icon } from "@iconify/react";
import {Dropdown } from "flowbite-react";
import { HiOutlineDotsVertical  } from "react-icons/hi";
import CustomInput from "@/app/components/shared/CustomInput";
import { Field, useFormikContext } from "formik";
import { QuoteFormData } from "@/app/(DashboardLayout)/sales/quotes/_types";

// interface Base {
//   item_details : {
//     id:string;
//     quantity:number;
//     rate:number;
//     amount:number;
//   }
// }
type Props = {
   fieldsToExclude? : string[];
}
const DiscountCode = ({fieldsToExclude} : Props) => {

  const dropdownItems = ["Action", "Another action", "Something else"];

  const EarningReportsData = [
    {
      icon: "solar:card-line-duotone",
      title: "Sub Total",
      color: "primary",
      statuscolor: "success",
      statustext: "1500.00",
      placeholder: "Sub total",
      name:'sub_total'
    },
    {
      icon: "ic:baseline-discount",
      title: "Discount",
      color: "error",
      statuscolor: "success",
      statustext: "12.55%",
      placeholder: "Discount",
      name:'discount'
    },
    {
      icon: "solar:course-up-line-duotone",
      title: "Shipping Charges",
      color: "secondary",
      statuscolor: "success",
      statustext: "250.00",
      placeholder: "Shipping Charges",
      name:'shipping_charges'
    },
    {
      icon: "solar:waterdrops-line-duotone",
      title: "Round Off",
      color: "warning",
      statuscolor: "success",
      statustext: "5000.00",
      placeholder: "Round Off",
      name:'round_off'
    },
    {
      icon: "ei:star",
      title: "Total",
      color: "primary",
      statuscolor: "success",
      statustext: "5000.00",
      placeholder: "Total",
      name:'total'
    },
  ];

  const filteredData = EarningReportsData.filter(
    (item) => !fieldsToExclude?.includes(item.name)
  );
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h5 className="card-title">Sub Total</h5>
          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                <HiOutlineDotsVertical size={22} />
              </span>
            )}
          >
            {dropdownItems.map((items, index) => {
              return <Dropdown.Item key={index}>{items}</Dropdown.Item>;
            })}
          </Dropdown>
        </div>

        <div className="flex flex-col">
          {filteredData.map((item, index) => (
            <div className="flex items-center justify-between py-5 border-b border-ld" key={index}>
              <div className="flex w-[75%] gap-3 items-center">
                <span
                  className={`w-14 h-10 rounded-full flex items-center justify-center  bg-light${item.color} dark:bg-dark${item.color} text-${item.color}`}
                >
                  <Icon icon={item.icon} height={24} />
                </span>
                <div>
                  <h4 className="text-sm mb-1">{item.title}</h4>
                </div>
              </div>
              {/* {item.statustext} */}
              <div className="discount_sec">
                <Field
                    id={item.name}
                    name={item.name}
                    type="text"
                    info={item.placeholder}
                    placeholder={item.placeholder}
                    component={CustomInput}
                    className="!w-[110px]"
                  />
              </div>
            </div>
          ))}
        </div>
      </CardBox>
    </>
  );
};

export default DiscountCode;

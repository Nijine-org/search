import { getSelectedEmployeeFilterAction } from '@/app/(DashboardLayout)/payroll/bonus/_actions';
import { EmployeeTableData } from '@/app/(DashboardLayout)/payroll/bonus/_types';
import { empFilterStore } from '@/app/store/empFilterStore';
import { getInitials, getRandomColor, getTextColor } from '@/utils/helper';
import { useStore } from '@tanstack/react-store';
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

type Props = {
  employee_list: string[] | { user_id: number; amount: string }[];
  toggleFunction: () => void;
};
const MembersDesign: React.FC<Props> = ({ employee_list, toggleFunction }) => {
  const { selectedPage, selectedLimit } = useStore(
    empFilterStore,
    (state) => state,
  );
  const [data, setData] = React.useState<EmployeeTableData[]>([]);
  const [totalSelected, setTotalSelected] = useState(0);

  useEffect(() => {
    if (employee_list && employee_list.length > 0) {
      const transformedEmployeeIds = employee_list.map((emp) => String(emp));
      // The action should be call here.
      const initialFetch = async () => {
        const resData = await getSelectedEmployeeFilterAction({
          employee_ids: transformedEmployeeIds,
          selectedPage,
          selectedLimit,
        });
        if (resData?.state) {
          setData(resData?.data || []);
          setTotalSelected(resData?.pagination?.total as number);
        }
      };
      initialFetch();
    } else {
      setData([]);
    }

    // Add dependency array
  }, [employee_list, selectedPage, selectedLimit]);

  const maxVisibleEmployees = 4;
  return (
    <>
      <div className="col-span-2">
        {data?.length ? (
          <ul className=" cursor-pointer" onClick={toggleFunction}>
            {data?.slice(0, maxVisibleEmployees).map((employee) => (
              <li
                key={employee.id}
                className="list-none inline-block -mr-[6px] text-xs relative z-[1] hover:z-[2] transition-all duration-800 ease-in"
              >
                <Tooltip placement="top" title={employee?.employee_name}>
                  <p
                    className={`flex items-center justify-center w-8 h-8 overflow-hidden  
                ${getTextColor(getRandomColor(employee.employee_name))} 
                bg-${getRandomColor(employee.employee_name)} 
                dark:bg-darksecondary rounded-full text-sm font-medium 

                `}
                  >
                    {getInitials(employee.employee_name)}
                  </p>
                </Tooltip>
              </li>
            ))}
            {data?.length > maxVisibleEmployees && (
              <li className="list-none inline-block -mr-3 text-xs relative z-[1] hover:z-[2] transition-all duration-800 ease-in">
                <Tooltip
                  placement="top"
                  title={` +${totalSelected - maxVisibleEmployees} More`}
                >
                  <p
                    className={`flex items-center justify-center w-8 h-8 overflow-hidden 
                             bg-lightsuccess text-success
                             rounded-full text-sm font-medium `}
                  >
                    +{totalSelected - maxVisibleEmployees}
                  </p>
                </Tooltip>
              </li>
            )}
          </ul>
        ) : (
          <ul>
            <li className="list-none inline-block -mr-3 text-xs relative z-[1] hover:z-[2] transition-all duration-800 ease-in">
              <p className="flex items-center justify-center w-8 h-8 text-primary overflow-hidden bg-lightprimary dark:bg-darksecondary rounded-full text-sm font-medium hover:bg-lightprimary">
                0
              </p>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default MembersDesign;

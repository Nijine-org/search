import { Icon } from '@iconify/react';
import { Button, Dropdown, Tooltip } from 'flowbite-react';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleBar from 'simplebar-react';
import { getUserProfileInfo } from '@/app/_actions';
import { ProfileData } from '@/app/_types';
import config from '@/services/globalConfig';
import { useRouter } from 'next/navigation';

type ProfileType = {
  title: string;
  icon: string;
  subtitle: string;
  color: string;
  bgcolor: string;
  url: string;
};
const profileDD: ProfileType[] = [
  {
    icon: 'solar:wallet-2-line-duotone',
    bgcolor: 'bg-lightprimary dark:bg-lightprimary',
    color: 'text-primary',
    title: 'My Profile',
    subtitle: 'Account settings',
    url: '/apps/user-profile/profile',
  },
  {
    icon: 'solar:inbox-line-duotone',
    color: 'text-success',
    bgcolor: 'bg-lightsuccess dark:bg-lightsuccess',
    title: 'My Notes',
    subtitle: 'My Daily Notes',
    url: '/apps/notes',
  },
  {
    icon: 'solar:checklist-minimalistic-line-duotone',
    color: 'text-error',
    bgcolor: 'bg-lighterror dark:bg-lighterror',
    title: 'My Tasks',
    subtitle: 'To-do and Daily tasks',
    url: '/apps/kanban',
  },
];
const Profile = () => {
  const [data, setData] = React.useState<ProfileData>();
  const router = useRouter();
  useEffect(() => {
    getUserProfileInfo()
      .then((res) => {
        if (res.state) setData(res.data);
        // console.log('user profile data', res.data);
      })
      .catch((err) => console.error('Error getting user profile', err));
  }, []);
  const handleClick = async () => {
    const response = await fetch(`${config.API_URL}/logout`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.status === 308 || response.status === 303) {
      if (config.SSO_LINK) {
        router.push(config.SSO_LINK);
      } else throw new Error('SSO_LINK is not defined');
    }
  };
  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="w-screen sm:w-[360px] py-6  rounded-md shadow-md"
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <Image
              src="/images/profile/user-1.jpg"
              alt="logo"
              height="35"
              width="35"
              className="rounded-full"
            />
          </span>
        )}
      >
        <div className="px-6">
          <h5 className="text-md font-semibold text-ld uppercase">
            {data?.company_name}
          </h5>
          <div className="flex items-center gap-6 pb-5 border-b dark:border-darkborder mt-5 mb-3">
            <Image
              src="/images/profile/user-1.jpg"
              alt="logo"
              height="60"
              width="60"
              className="rounded-full"
            />
            <div className="">
              <Tooltip
                content="Devlopment Manager"
                style="light"
                placement="top"
              >
                <h5 className="card-title text- truncate max-w-[200px]">
                  {/* Jonathan Deo */}
                  {data?.name}
                </h5>
              </Tooltip>
              <Tooltip
                content="Devlopment Manager"
                style="light"
                placement="left"
              >
                <span className="text-xs truncate max-w-[180px] block cursor-default">
                  {/* Devlopment Manager */}
                  {data?.designation}
                </span>
              </Tooltip>
              <Tooltip content={data?.email} style="light" placement="left">
                <p className="block card-subtitle mb-0 mt-1 max-w-[200px] items-center truncate text-xs cursor-default">
                  {/* vivek.s@cloudrevelinnovation.com */}
                  {data?.email}
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="mx-5 pb-3  border-b dark:border-darkborder">
          <SimpleBar className="">
            {profileDD.map((items, index) => (
              <Dropdown.Item
                as={Link}
                href={items.url}
                className="flex justify-between items-center bg-hover group/link w-full hover:text-inherit rounded-md"
                key={index}
              >
                <div className="flex items-center w-full">
                  <div
                    className={`h-8 w-11 flex-shrink-0 rounded-md flex justify-center items-center `}
                  >
                    <Icon
                      icon={items.icon}
                      height={20}
                      className="text-gray-500 font-bold dark:text-white"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-3/4 ">
                      <div className=" text-sm font-normal">{items.title}</div>
                    </div>
                  </div>
                </div>
              </Dropdown.Item>
            ))}
          </SimpleBar>
        </div>

        <div className="pt-6 px-6">
          <Button
            // as={Link}
            onClick={handleClick}
            // href="/auth/auth1/login"
            className="w-full rounded-md border-[#ff6b6b] bg-transparent border dark:border-[#ff6b6b] text-[#ff6b6b] dark:text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white dark:hover:text-white"
          >
            <Icon icon="line-md:logout" height={20} className="font-bold" />
            Logout
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;

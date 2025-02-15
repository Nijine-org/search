import { Button } from 'flowbite-react';
import React from 'react';
import finance from '../../../../public/images/chat/finance.png';
import Image from 'next/image';
import Link from 'next/link';

const ComingSoon = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full lg:w-[40%] flex flex-col items-start justify-center lg:px-2 xl:px-0 text-center">
        <p className="text-3xl md:text-6xl dark:text-gray-300 font-bold tracking-wider text-black">
          COMING SOON....
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-8">
          The page you are looking for will be available soon.
        </p>
        <Button color="primary">
          <Link href="/bank">Return To Home Page</Link>
        </Button>
      </div>
      <div className="w-1/2 lg:h-full flex lg:items-center justify-center p-4">
        <Image src={finance} alt="coming_soon" className="w-full" />
      </div>
    </div>
  );
};

export default ComingSoon;

'use client';
import React from 'react';
import Image from 'next/image';
import Logo from '/public/images/logos/dark-logo.svg';
import Logowhite from '/public/images/logos/light-logo.svg';
import ledgerLogo from '/public/images/logos/logo.png';
import Link from 'next/link';
const FullLogo = () => {
  return (
    <Link href={'/'}>
      {/* Dark Logo   */}
      <Image
        width={160}
        src={ledgerLogo}
        alt="logo"
        className="block dark:hidden rtl:scale-x-[-1]"
      />
      {/* Light Logo  */}
      <Image
        width={160}
        src={ledgerLogo}
        alt="logo"
        className="hidden dark:block rtl:scale-x-[-1]"
      />
    </Link>
  );
};

export default FullLogo;

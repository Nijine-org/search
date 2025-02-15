'use client';
import React, { useContext } from 'react';
import Sidebar from './layout/vertical/sidebar/Sidebar';
import Header from './layout/vertical/header/Header';
import { Customizer } from './layout/shared/customizer/Customizer';
import { CustomizerContext } from '@/app/context/customizerContext';
import { ConfigProvider, theme as antdTheme } from 'antd';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeLayout, isLayout, activeMode } = useContext(CustomizerContext);
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;
  return (
    <ConfigProvider
      theme={{
        algorithm: activeMode === 'light' ? defaultAlgorithm : darkAlgorithm,
        components: {
          Input: {
            activeBorderColor: '#00b808',
            hoverBorderColor: '#00b808',
          },
        },
        token: {
          colorBgContainer: 'transparent', // Makes input background transparent
          colorBgElevated: activeMode === 'light' ? '#fff' : '#1a2537',
          colorPrimaryHover: '#00b808',
        },
      }}
    >
      <div className="flex w-full min-h-screen">
        <div className="page-wrapper flex w-full">
          {/* Header/sidebar */}
          {activeLayout == 'vertical' ? <Sidebar /> : null}
          <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
            {/* Top Header  */}
            {activeLayout == 'horizontal' ? (
              <Header layoutType="horizontal" />
            ) : (
              <Header layoutType="vertical" />
            )}

            {/* Body Content  */}
            <div
              className={` ${
                isLayout == 'full'
                  ? 'w-full py-[30px] md:px-[30px] px-5'
                  : 'container mx-auto  py-[30px]'
              } ${activeLayout == 'horizontal' ? 'xl:mt-3' : ''}
            `}
            >
              {children}
            </div>
            <Customizer />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

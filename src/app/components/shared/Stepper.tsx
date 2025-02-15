'use client';
import React, { useState } from 'react';
import { Steps } from 'antd';

const steps = [
  {
    title: '',
    content: '1-content',
  },
  {
    title: '',
    content: '2-content',
  },
  {
    title: '',
    content: '3-content',
  },
  {
    title: '',
    content: '4-content',
  },
  {
    title: '',
    content: '5-content',
  },
];

const Stepper = () => {
  const [current, setCurrent] = useState(0);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-sectionPara font-semibold mb-3">
          Fill Your Personal Details
        </h1>
        <p className="text-footerPara mb-4">
          Fill all fields to proceed to the next step
        </p>

        {/* <div style={contentStyle}>{steps[current].content}</div> */}
      </div>
      <div className="grid grid-cols-12 justify-center items-center">
        <div className="col-span-3"></div>
        <div className="col-span-6">
          <Steps current={current} onChange={onChange} items={items} />
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
};

export default Stepper;

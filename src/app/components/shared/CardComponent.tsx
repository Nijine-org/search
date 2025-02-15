import React from 'react';
import GraphComponent from './GraphComponent';
import CustomCard from './CustomCard';
import CustomClientIcon from './CustomClientIcon';

// Define the type for each item in the data array
type CardData = {
  title: string;
  data: string | number;
  stats: {
    value: string;
    positive: boolean;
  };
  bgColor: string;
  bgicon: string;
  chartColor: string;
};

interface CardComponentProps {
  data: CardData;
}

const CardComponent: React.FC<CardComponentProps> = ({ data }) => {
  // Customize chart data for each card

  return (
    <CustomCard
      className={`${data.bgColor || 'bg-lightsecondary dark:bg-lightsecondary'} !shadow-none  rounded-lg`}
    >
      <div className="flex items-center gap-3 mb-4 p-2">
        <span
          className={`w-14 h-10 rounded-full flex items-center justify-center bg-${data.bgicon} text-white`}
        >
          <CustomClientIcon
            icon="solar:users-group-rounded-bold-duotone"
            height={24}
          />
        </span>
        <h5 className="text-base opacity-70">{data.title}</h5>
      </div>

      <div className="flex justify-between  items-end">
        <div className="flex-1 basis-full md:basis-7/12 xl:basis-7/12">
          <h2 className="text-3xl mb-3">{data.data}</h2>
          <span className="font-semibold border rounded-full border-black/5 dark:border-white/10 py-0.5 px-[10px] leading-[normal] text-xs text-dark dark:text-darklink">
            <span className="opacity-70">{data.stats.value}</span>
          </span>
        </div>
        <div className="flex-1 basis-full md:basis-5/12 xl:basis-5/12">
          <div className="rounded-bars md:ps-7">
            <GraphComponent id={data.title} color={data.chartColor} />
          </div>
        </div>
      </div>
    </CustomCard>
  );
};

export default CardComponent;

'use client';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
type Props = {
  id: string;
  color: string;
};
const GraphComponent = ({ color }: Props) => {
  //   console.log('id', id, 'color', color);
  const chartOptions: ApexOptions = {
    series: [
      {
        name: '1',
        color: color || 'var(--color-secondary)', // Use chartColor from the item
        data: [29, 52, 38, 47, 56],
      },
      {
        name: '2',
        data: [71, 71, 71, 71, 71],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: 100,
      stacked: true,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 1,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: [
      'var(--color-error)',
      'var(--color-black, rgba(17, 28, 45, 0.10))',
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 3,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
    },
    legend: {
      show: false,
    },
  };
  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height="80px"
        width="100%"
      />
    </div>
  );
};

export default GraphComponent;

import { FileType } from '@/app/(DashboardLayout)/types/apps';
import { amountValEnum } from '@/app/_types';
import { NotificationInstance } from 'antd/es/notification/interface';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

type NotificationProps = {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: React.ReactNode;
  api: NotificationInstance;
};

const openNotification = ({
  type,
  title,
  description,
  api,
}: NotificationProps) => {
  api.open({
    type,
    message: title,
    description,
    placement: 'bottomRight',
  });
};
const disabledDate = (current: Dayjs | null): boolean => {
  // Disable dates outside the current month
  return (
    !!current &&
    (current.isBefore(dayjs().startOf('month')) ||
      current.isAfter(dayjs().endOf('month')))
  );
};

const dateFormat = 'DD/MM/YYYY';

// Helper function to construct query strings
// const createQueryString = <P>(params: P): string => {
//   const query = new URLSearchParams(params as Record<string, string>);
//   return query.toString() ? `?${query.toString()}` : '';
// };
const createQueryString = <P extends Record<string, unknown>>(
  params: P,
): string => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle array values, joining them with commas
      query.append(key, value.join(','));
    } else if (value !== undefined && value !== null) {
      // non-array values
      query.append(key, String(value));
    }
  });
  return query.toString() ? `?${query.toString()}` : '';
};

const setLocalFun = <T>(key: string, value: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const setSessionFun = <T>(key: string, value: T) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

// Name Hashing
const getInitials = (name: string) => {
  const splitName = name.split(' ');
  if (splitName.length === 1) {
    return splitName[0][0]?.toUpperCase() + splitName[0][1]?.toUpperCase();
  }
  return splitName[0][0]?.toUpperCase() + splitName[1][0]?.toUpperCase();
};

// Function to hash a string (e.g., name) into a number for color generation
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer hashcode
  }
  return hash;
};

// hash color
const getRandomColor = (str: string) => {
  const colors = [
    `lightprimary`,
    `lightsecondary`,
    `lightsuccess`,
    `lightwarning`,
    `lighterror`,
  ];
  const colorIndex = Math.abs(hashString(str)) % colors.length;
  return colors[colorIndex];
};
const getTextColor = (bgColor: string, val = `text-`) => {
  if (bgColor.startsWith('light')) {
    return bgColor.replace(`light`, val);
  }
  return bgColor;
};

const amountTypeMap: Record<string, amountValEnum> = {
  flat: amountValEnum.Flat,
  pool: amountValEnum.Pool,
  percentage: amountValEnum.Percentage,
};

const mapPayrollAmountType = (type: string): amountValEnum => {
  const mappedType = amountTypeMap[type.toLowerCase()];
  if (mappedType === undefined) {
    throw new Error(`Unknown bonus type: ${type}`);
  }
  return mappedType;
};

const getBadgeColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'lightprimary';
    case 'scheduled':
      return 'lightwarning';
    default:
      return 'lightsecondary';
  }
};
const toCapitalize = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const formatKMAmount = (amount: number) => {
  if (amount >= 1_000_000) {
    const formatted = (amount / 1_000_000).toFixed(1);
    return formatted.endsWith('.0')
      ? (amount / 1_000_000).toFixed(0) + 'M'
      : formatted + 'M';
  }
  if (amount >= 1_000) {
    const formatted = (amount / 1_000).toFixed(1);
    return formatted.endsWith('.0')
      ? (amount / 1_000).toFixed(0) + 'k'
      : formatted + 'k';
  }
  return amount.toString();
};

export {
  openNotification,
  disabledDate,
  dateFormat,
  createQueryString,
  setLocalFun,
  setSessionFun,
  getInitials,
  getRandomColor,
  getTextColor,
  mapPayrollAmountType,
  getBadgeColor,
  toCapitalize,
  getBase64,
  formatKMAmount,
};

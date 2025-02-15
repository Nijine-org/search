import { GetProp, UploadProps } from 'antd';

type NotificationProps = {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
};
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export type { NotificationProps, FileType };

import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Label } from 'flowbite-react';

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      //console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
type UploadfileProps = {
  labelName: string; // Define the prop type for the label
};

const UploadFile: React.FC<UploadfileProps> = ({ labelName }) => (
  <>
    <div className="mb-3 block">
      <Label htmlFor="purchase_subject" value={labelName} />
      {/* <span className="text-error ms-1">*</span> */}
    </div>
    <Upload {...props}>
      <Button
        className=""
        style={{
          borderWidth: '1px',
          borderStyle: 'dashed',
          height: '50px',
          width: '200px',
        }}
        icon={<UploadOutlined className="mr-2" />}
      >
        Click to Upload
      </Button>
    </Upload>
  </>
);

export default UploadFile;

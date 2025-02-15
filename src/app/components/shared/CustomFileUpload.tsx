'use client';
import React, { useEffect, useState } from 'react';
import { FieldProps, useFormikContext } from 'formik';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { Image, UploadFile, Modal } from 'antd';
import { getBase64 } from '@/utils/helper';
import { FileType } from '@/app/(DashboardLayout)/types/apps';

type FileItem = {
  key: number;
  value: string;
};

interface UploadFileProps extends FieldProps {
  info: string;
  className: string;
}

interface CustomUploadFile extends UploadFile {
  key: string;
}

const CustomFileUpload: React.FC<UploadFileProps> = ({
  field,
  form: { setFieldValue, touched, errors },
  ...props
}) => {
  const { info } = props;
  const [previewImage, setPreviewImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<
    'image' | 'pdf' | 'excel' | null
  >(null);

  const { values } = useFormikContext<{
    added_files: { key: number; value: string }[];
  }>();
  const initialValues = values.added_files;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const isError = touched[field.name] && errors[field.name];
  const text = isError ? errors[field.name] : info;

  //GET DELETED ID
  const [deletedFileId, setDeletedFileId] = useState<number[]>([]);
  const getFileType = (file: UploadFile) => {
    const fileName = file.name?.toLowerCase() || '';
    if (
      file.type?.includes('image') ||
      /\.(jpg|jpeg|png|gif|svg)$/i.test(fileName)
    ) {
      return 'image';
    }
    if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
      return 'pdf';
    }
    if (
      file.type?.includes('excel') ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      /\.(xlsx|xls|csv)$/i.test(fileName)
    ) {
      return 'excel';
    }
    return null;
  };

  useEffect(() => {
    if (initialValues && Array.isArray(initialValues)) {
      const formattedData: UploadFile[] = initialValues
        .map((item: FileItem | File, index: number) => {
          if ('key' in item && 'value' in item) {
            const fileUrl = item.value;
            const fileName = fileUrl.split('/').pop() || `File ${index + 1}`;
            const fileType = fileName.toLowerCase();

            // const fileType = item.toLowerCase();
            const type = fileType.endsWith('.pdf')
              ? 'application/pdf'
              : fileType.match(/\.(xlsx|xls)$/i)
                ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                : fileType.match(/\.(jpg|jpeg|png|svg)$/i)
                  ? 'image/jpeg'
                  : 'application/octet-stream';

            return {
              uid: `existing-${index}`,
              key: Number(item.key),
              url: fileUrl,
              name: fileName,
              status: 'done',
              type,
            };
          } else if (item instanceof File) {
            return {
              uid: `file-${index}`,
              name: item.name,
              status: 'done',
              type: item.type,
              originFileObj: item,
              size: item.size,
            };
          }
          return null;
        })
        .filter(Boolean) as UploadFile[];

      const processedItems = new Set();
      const uniqueFiles = formattedData.filter((file) => {
        const identifier = file.url || file.name;
        if (processedItems.has(identifier)) {
          return false;
        }
        processedItems.add(identifier);
        return true;
      });

      setFileList(uniqueFiles);
    } else {
      setFileList([]);
    }
  }, [initialValues]);

  const handleChange = (info: { fileList: UploadFile[] }) => {
    //  const existingUrls = field.value.filter((item: any) => typeof item === 'string');
    const newFiles = info.fileList
      .filter((file) => file.originFileObj)
      .map((file) => file.originFileObj);
    // const combinedFiles = [...existingUrls, ...newFiles];
    setFileList(info.fileList);
    setFieldValue(field.name, newFiles);
  };

  const handlePreview = async (file: UploadFile) => {
    const fileType = getFileType(file);
    setPreviewType(fileType);

    if (fileType === 'image') {
      let previewUrl = file.url;
      if (!previewUrl && file.originFileObj) {
        previewUrl = await getBase64(file.originFileObj as FileType);
      }
      if (previewUrl) {
        setPreviewImage(previewUrl);
        setPreviewOpen(true);
      }
    } else if (fileType === 'pdf' || fileType === 'excel') {
      let url = file.url;
      if (!url && file.originFileObj) {
        url = URL.createObjectURL(file.originFileObj);
      }

      // excell
      if (fileType === 'excel' && url) {
        // Microsoft Office Online Viewer first
        url = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
      }

      setPreviewUrl(url as string);
      setPreviewOpen(true);
    }
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
    setPreviewImage('');
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
    setPreviewType(null);
  };

  const getPreviewTitle = () => {
    switch (previewType) {
      case 'pdf':
        return 'PDF Preview';
      case 'excel':
        return 'Excel Preview';
      default:
        return 'File Preview';
    }
  };
  const handleRemove = (file: UploadFile) => {
    // Extract the key or unique identifier
    const customFile = file as CustomUploadFile;
    const fileKey = Number(customFile.key);
    if (isNaN(fileKey)) {
      return;
    }

    setDeletedFileId((prev) => [...prev, fileKey]);

    // Filter out the removed file
    // const updatedFileList = fileList.filter((item) =>Number((item as CustomUploadFile).key) !== fileKey);
    const combinedDeletedFiles = [...deletedFileId, fileKey];
    setFieldValue('deleted_files', combinedDeletedFiles);
  };
  return (
    <div>
      <Dragger
        name="file"
        multiple
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={handleRemove}
        listType="picture-card"
        accept=".jpg,.jpeg,.png,.pdf,.xlsx,.xls,.csv"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Supports: JPG, PNG, PDF, XLSX, XLS, CSV
        </p>
      </Dragger>
      <small className={`text-xs ${isError ? 'text-error' : 'text-darklink'}`}>
        {typeof text === 'string' ? text : info}
      </small>

      {/* Image Preview */}
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen && previewType === 'image',
            onVisibleChange: (visible) => {
              if (!visible) handlePreviewClose();
            },
          }}
          src={previewImage}
        />
      )}

      {/* PDF and Excel Preview */}
      <Modal
        title={getPreviewTitle()}
        open={previewOpen && (previewType === 'pdf' || previewType === 'excel')}
        onCancel={handlePreviewClose}
        footer={null}
        width="80%"
        style={{ top: 20 }}
        styles={{
          body: {
            height: '80vh',
            padding: '8px',
            textAlign: 'center',
          },
        }}
      >
        <div style={{ height: '100%' }}>
          <iframe
            src={previewUrl}
            //src={`${previewUrl}#toolbar=0`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title={getPreviewTitle()}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CustomFileUpload;

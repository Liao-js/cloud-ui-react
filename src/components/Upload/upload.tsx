import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'

import Button from '../Button/button'
import Dragger from './dragger'
import UploadList from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (err: any, file: UploadFile) => void;
  onChange?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}

interface updateFileListFn {
  fn?: Function
  arg?: any[]
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>, callback?: updateFileListFn[]) => {
    setFileList(prevList => {
      const newList = prevList.map(file => {
        if (file.uid === updateFile.uid) {
          const newFile = { ...file, ...updateObj }

          callback && callback.forEach(item => {
            const arg = item.arg ? [...item.arg, newFile] : [newFile]
            item.fn && item.fn(...arg)
          })

          return newFile
        } else {
          return file
        }
      })
      return newList
    })
  }

  const handleClick = () => {
    fileInput.current && fileInput.current.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    fileInput.current && (fileInput.current.value = '')
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processFile) => {
            post(processFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }

    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' }, [
            {
              fn: onProgress,
              arg: [percentage]
            }
          ])
          // onProgress && onProgress(percentage, _file)
        }
      }
    }).then(resp => {
      updateFileList(_file, { status: 'success', response: resp.data }, [
        {
          fn: onSuccess,
          arg: [resp.data]
        },
        {
          fn: onChange
        }
      ])
      // onSuccess && onSuccess(resp.data, _file)
      // onChange && onChange(_file)
    }).catch(err => {
      console.error(err)
      updateFileList(_file, { status: 'error', error: err }, [
        {
          fn: onError,
          arg: [err]
        },
        {
          fn: onChange
        }
      ])
      // onError && onError(err, _file)
      // onChange && onChange(_file)
    })
  }

  return (
    <div
      className="cloud-upload-component"
    >
      <div className="cloud-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {
          drag ?
            <Dragger onFile={(files) => { uploadFiles(files) }}>
              {children}
            </Dragger> :
            (children || <Button btnType="primary" size="sm">Upload File</Button>)}
        <input
          className="cloud-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
  withCredentials: false
}

export default Upload;
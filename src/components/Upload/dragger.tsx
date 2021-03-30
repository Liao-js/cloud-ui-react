import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'

import Icon from '../Icon/icon'

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('cloud-uploader-dragger', {
    'is-dragover': dragOver,
    'is-middle': !children
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }

  return (
    <div
      className={classes}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {
        children ||
        (<div className="cloud-uploader-tip">
          <Icon icon="upload" size="3x" theme="secondary" />
          <div className="cloud-uploader-text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
        </div>)}
    </div>
  )
}

export default Dragger;

import React, { useState } from 'react';
import classNames from 'classnames';

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

export interface AlertProps {
  onClose?: () => void;
  title?: string;
  type?: AlertType;
  closable?: boolean,
  closeTest?: string
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = (props) => {
  const [closed, setClosed] = useState(false);
  const [closing, setClosing] = useState(true);
  const {
    onClose,
    title,
    type,
    closeTest,
    closable,
    children,
  } = props
  // 点击关闭的方法
  function handleAlertClick() {
    if (closed) return;
    setClosed(true)
    onClose && onClose()
    setTimeout(() => {
      setClosing(false)
    }, 200)
  }
  // 默认都有 alert 的 class
  const classes = classNames('alert', {
    [`alert-${type}`]: type,
    'closing': closed && closing
  })
  const contentClasses = classNames('alert__content')
  const titleClasses = classNames('alert__title', {
    'is-bold': children
  })
  const descriptionClasses = classNames('alert__description')
  const closebtnClasses = classNames('alert__closebtn', {
    'is-customed': closeTest
  })
  return (
    <div className={classes} style={{ display: (closing ? "block" : "none") }}>
      <div className={contentClasses}>
        {title && <span className={titleClasses}>{title}</span>}
        {children && <p className={descriptionClasses}>{children}</p>}
        <i className={closebtnClasses} style={{ display: (closable ? "block" : "none") }} onClick={handleAlertClick}>{closeTest}</i>
      </div>
    </div>
  )
}

Alert.defaultProps = {
  type: AlertType.Default,
  closable: true,
  closeTest: '关闭'
}

export default Alert;
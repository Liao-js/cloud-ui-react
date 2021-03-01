import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert, { AlertProps ,AlertType } from './alert';

const defaultProps: AlertProps = {
  onClose: jest.fn()
}

describe('test Alert component', () => {
  it('should render the correct default Alert', () => {
    const wrapper = render(<Alert {...defaultProps}>Nice</Alert>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('DIV')
    expect(element).toHaveClass('alert alert-default')
  })
})
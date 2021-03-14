import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'

config.disabled = true

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
]

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

interface testArrayType {
  value: string;
  number: number;
}
const renderOption = (item: DataSourceType) => {
  const itemWithType = item as DataSourceType<testArrayType>
  return (
    <>
      <h2>Name: {itemWithType.value}</h2>
      <p>Number: {itemWithType.number}</p>
    </>
  )
}
const testTemplateProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
  renderOption: renderOption
}


const fetchSuggestions = (query: string) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(testArray)
    }, 300)
  }).then((items: any) => {
    return items.filter((item: any) => item.value.includes(query))
  });
  return promise
}
const testPromiseProps: AutoCompleteProps = {
  fetchSuggestions: fetchSuggestions,
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}


let wrapper: RenderResult, inputNode: HTMLInputElement
let wrapper2: RenderResult, inputNode2: HTMLInputElement
let wrapper3: RenderResult, inputNode3: HTMLInputElement

describe('test AutoComplete component in default', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestions items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    // fill the input
    expect(inputNode.value).toBe('ab')
  })

  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass("is-active")
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass("is-active")
    // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass("is-active")
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('click outside should hide the dropdown', async () => {
     // input change
     fireEvent.change(inputNode, { target: { value: 'a' } })
     await waitFor(() => {
       expect(wrapper.queryByText('ab')).toBeInTheDocument()
     })
     fireEvent.click(document)
     expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
})

describe('test AutoComplete component in template', () => {
  beforeEach(() => {
    wrapper2 = render(<AutoComplete {...testTemplateProps} />)
    inputNode2 = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  it('renderOption should generate the right template', async () => {
    // input change
    fireEvent.change(inputNode2, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper2.queryByText('Name: ab')).toBeInTheDocument()
    })
    expect(wrapper2.queryByText('Number: 11')).toBeInTheDocument()
  })
})

describe('test AutoComplete component in promise', () => {
  beforeEach(() => {
    wrapper3 = render(<AutoComplete {...testPromiseProps} />)
    inputNode3 = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  it('async fetchSuggestions should works fine', async () => {
    // input change
    fireEvent.change(inputNode3, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper3.queryByText('ab')).toBeInTheDocument()
    })
    expect(wrapper3.container.querySelectorAll('.suggestion-item').length).toEqual(2)
  })
})
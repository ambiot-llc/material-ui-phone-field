import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PhoneField from '../src'

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<PhoneField value="" onChange={() => {}} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders with default country', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <PhoneField value="" onChange={() => {}} defaultCountry="RU" />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders with different language', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <PhoneField
        value=""
        onChange={() => {}}
        defaultCountry="RU"
        language="ru"
      />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders with different language without default country', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <PhoneField value="" onChange={() => {}} language="ru" />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PhoneField from '../src'

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<PhoneField value="" onChange={() => {}} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

import React from 'react'
import { render } from 'react-dom'
import { MemoryRouter, Switch } from 'react-router'

import { Switcher } from './containers/popup/Popup.js'

const browser = chrome || msBrowser || browser

let port = browser.runtime.connect('mablllhehmmfhidkdipdfbakahfibgda')
port.onMessage.addListener(function(message, sender) {
  render(
    <MemoryRouter>
      <Switch>
        <Switcher isUserLogged={message.isUserLogged}/>
      </Switch>
    </MemoryRouter>,
    document.querySelector('.root'))
})
render(
  <MemoryRouter>
    <Switch>
      <Switcher isUserLogged={true}/>
    </Switch>
  </MemoryRouter>,
  document.querySelector('.root'))
// render(<Switcher isUserLogged={false}/>, document.querySelector('.root'))

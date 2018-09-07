import React from 'react'
import { render } from 'react-dom'

import { Popup } from './containers/popup/Popup.js'

const browser = chrome || msBrowser || browser

let port = browser.runtime.connect('mablllhehmmfhidkdipdfbakahfibgda')
port.onMessage.addListener(function(message, sender) {
  // console.log(message, sender)
  alert(JSON.stringify(message,null,2))
})

render(<Popup/>, document.querySelector('.root'))

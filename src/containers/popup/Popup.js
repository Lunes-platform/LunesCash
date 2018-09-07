// import preact, { Component, h } from 'preact'
import React, { Component, Fragment } from 'react'
import { Stores } from './render/stores.js'
import { animChildren } from 'Functions'

export class Popup extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    setTimeout(() => {
      animChildren(document)
    }, 100)
  }
  render() {
    return (
      <Fragment>
        <header className="anim-onload">
          <img className="logo anim-onload" src="img/lns.png"/>
        </header>
        <h1 className="title anim-onload">Lunes cashback</h1>
        <section className="stores anim-onload">
          <Stores/>
        </section>
        <footer>
        </footer>
      </Fragment>
    )
  }
}

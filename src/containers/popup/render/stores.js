import React, { Component } from 'react'
import { Loading } from 'Components'
import { animChildren } from 'Functions'

export class Stores extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: { type: 'loading', message: '' },
      stores: []
    }
  }
  redirect = () => {
    alert('Should I redirect ?')
  }
  componentDidMount = async () => {
    let stores = await this.getStores()
  }
  getStores = () => {
    return new Promise((resolve, reject) => {
      let stores = [
        { name: 'Americanas', shortname: 'Americanas', icon: '/img/stores/store.png', cashback: '10%', link: 'http://americanas.com' },
        { name: 'Netshoes', shortname: 'Netshoes', icon: '/img/stores/store.png', cashback: '5%', link: 'http://americanas.com' },
        { name: 'Casas Bahia', shortname: 'CBahia', icon: '/img/stores/store.png', cashback: '1%', link: 'http://americanas.com' },
        { name: 'Elmo', shortname: 'Elmo', icon: '/img/stores/store.png', cashback: '3%', link: 'http://americanas.com' },
      ]
      setTimeout(() => {
        this.setState({ stores, status: {type: 'complete'} })
        resolve(stores) }, 3000)
    })
  }
  _renderEmpty = () => {
    return (
      <img className="popup-stores-empty" src="/img/nothin-found.png"/>
    )
  }
  _renderError = (message) => {
    return <h1>{message}</h1>
  }
  _renderStores = (stores) => {
    setTimeout(() => {
      animChildren(document.querySelector('.stores'))
    }, 500)
    return stores.map((store, key) => {
      return (
        <div className="store anim-onload" onClick={this.redirect} key={key}>
          <img className="icon anim-onload" src={store.icon}/>
          <div className="name">{store.name}</div>
          <div className="cashback">{store.cashback}</div>
        </div>
      )
    })
  }
  render() {
    let { status, stores } = this.state
    if (status.type === 'loading')
      return <Loading/>

    if (!stores) {
      console.error('popup/render/stores, props.stores is an falsy value')
      return this._renderError(`Couldnt load stores, try contact us`)
    }
    if (stores.constructor.name !== 'Array') {
      console.error('popup/render/stores, props.stores is not an array')
      return this._renderError('Couldnt load stores, try contact us')
    }
    if (stores.length > 0)
      return this._renderStores(stores)
    else
      return this._renderEmpty()
  }
}

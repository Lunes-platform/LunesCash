// import preact, { Component, h } from 'preact'
import React, { Component, Fragment } from 'react'
import { Stores } from './render/stores.js'
import { animChildren } from 'Functions'
import { Route } from 'react-router'

export class Popup extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    setTimeout(() => {
      animChildren(document)
    }, 100)
  }
  componentWillMount() {
    // if (this.props.isUserLogged)
      this.props.history.push('/login')
  }
  render() {
    console.log('this.props',this.props)
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
export class Switcher extends Component {
  render() {
    // if (this.props.isUserLogged)
    //   return <Popup/>
    // else
    //   return <Home/>
    // this.props.location.push('/login')
    // console.log('this.props',this.props)
    return (
      <Fragment>
        <Route exact path={"/"} render={(props) => {
          return <Popup {...props}/>
        }}/>
        <Route path={"/home"} component={Home}/>
        <Route path={"/login"} component={Login}/>
        <Route path={"/register"} component={Home}/>
      </Fragment>
    )
  }
}
class Home extends Component {
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
        <h1 className="title anim-onload">{"You're not logged in"}</h1>
        <section className="buttons anim-onload">
          <button className="btn no-bg cl-white">Log in</button>
          <button className="btn green-theme">Register</button>
        </section>
      </Fragment>
    )
  }
}

class Login extends Component {
  render() {
    return <h1>{"You're just going to do the login!"}</h1>
  }
}

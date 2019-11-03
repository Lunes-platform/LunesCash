// import preact, { Component, h } from 'preact'
import React, { Component, Fragment } from "react";
import { Stores } from "./render/stores";
import { Coupons } from "./render/coupons";
import { User } from "./render/user";
import { animChildren } from "Functions";
import { Route } from "react-router";

export class Popup extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      animChildren(document);
    }, 100);
  }
  render() {
    return (
      <Fragment>
        <header className="anim-onload">
          <h1 className="cash-logo">
            Lun<span className="cash-logo green">e</span>s Ca
            <span className="cash-logo green">s</span>h
          </h1>
        </header>
        <section className="stores anim-onload">
          <User />
        </section>
      </Fragment>
    );
  }
}
export class Switcher extends Component {
  render() {
    if (this.props.isUserLogged) return <Popup />;
    else return <Popup />;
    // this.props.location.push('/login')
    // console.log('this.props',this.props)
    // return (
    //   <Fragment>
    //     <Route exact path={"/"} render={(props) => {
    //       return <Popup {...props}/>
    //     }}/>
    //     <Route exact path={"/home"} component={Home}/>
    //     <Route exact path={"/login"} component={Home}/>
    //     <Route exact path={"/register"} component={Home}/>
    //   </Fragment>
    // )
  }
}
class Home extends Component {
  componentDidMount() {
    setTimeout(() => {
      animChildren(document);
    }, 100);
  }
  handleLogin() {
    return <Login />;
  }
  render() {
    return (
      <Fragment>
        <header className="anim-onload">
          <div className="logo-container">
            <img className="logo anim-onload" src="img/lns.png" />
          </div>
        </header>
        <h1 className="title anim-onload">{"Bem vindo!"}</h1>
        <section className="buttons anim-onload">
          <button
            onClick={() => this.handleLogin()}
            className="btn no-bg cl-white"
          >
            Login
          </button>
          <a
            href="https://luneswallet.app/create"
            target="_blank"
            className="btn-login btn-singup"
          >
            Cadastre-se
          </a>
        </section>
      </Fragment>
    );
  }
}

class Login extends Component {
  render() {
    return (
      <Fragment>
        <header className="anim-onload">
          <div className="logo-container">
            <h1 className="cash-logo">
              Lun<span className="cash-logo green">e</span>s Ca
              <span className="cash-logo green">s</span>h
            </h1>
          </div>
        </header>
        <section>
          <form className="form-login">
            <input className="login-input" type="text" placeholder="email" />
            <input
              className="login-input input-pass"
              type="password"
              placeholder="senha"
            />
            <input
              type="submit"
              className="btn btn-login full-width"
              value="Login"
            />
          </form>
        </section>
        <footer>
          <div className="footer-login">
            <p className="footer-signin">
              Não tem uma conta?{" "}
              <a href="https://luneswallet.app/create" target="_blank">
                inscrever-se
              </a>
            </p>
            <a
              href="https://luneswallet.app/reset"
              target="_blank"
              className="footer-signin"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </footer>
      </Fragment>
    );
  }
}

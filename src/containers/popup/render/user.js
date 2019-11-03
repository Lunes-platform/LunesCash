import React, { Component } from "react";
import { Loading } from "Components";
import { animChildren } from "Functions";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { type: "loading", message: "" }
    };
  }
  render() {
    let { status } = this.state;
    if (status.type === "loading") return <Loading />;

    return <h1>Informações do usuário</h1>;
  }
}

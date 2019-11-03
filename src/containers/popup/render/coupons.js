import React, { Component } from "react";
import { Loading } from "Components";
import { animChildren } from "Functions";

export class Coupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { type: "loading", message: "" },
      coupons: []
    };
  }
  redirect = () => {
    alert("Should I redirect ?");
  };
  componentDidMount = async () => {
    let coupons = await this.getCoupons();
  };
  getCoupons = () => {
    return new Promise((resolve, reject) => {
      let coupons = [
        {
          store: "Americanas",
          offer: "R$ 30 OFF em compras de R$ 150 ",
          icon: "/img/stores/americanas.png",
          cashback: "1,5%",
          link: "http://americanas.com"
        },
        {
          store: "Netshoes",
          offer: "Nas compras de duas fragância Olympéa ",
          icon: "/img/stores/netshoes.png",
          cashback: "1,5%",
          link: "http://americanas.com"
        },
        {
          store: "Casas Bahia",
          offer: "10% OFF na primeira compra ",
          icon: "/img/stores/casas-bahia.png",
          cashback: "1,5%",
          link: "http://americanas.com"
        },
        {
          store: "Submarino",
          offer: "Preços de BLACK FRIDAY na Evino!",
          icon: "/img/stores/submarino.png",
          cashback: "1,5%",
          link: "http://submarino.com"
        },
        {
          store: "Elmo",
          offer: "Preços de BLACK FRIDAY na Evino! ",
          icon: "/img/stores/elmo.png",
          cashback: "1,5%",
          link: "http://americanas.com"
        }
      ];
      setTimeout(() => {
        this.setState({ coupons, status: { type: "complete" } });
        resolve(coupons);
      }, 3000);
    });
  };
  _renderEmpty = () => {
    return (
      <h1 className="title-no-stores">Ainda não há cupons para mostrar</h1>
    );
  };
  _renderError = message => {
    return <h1>{message}</h1>;
  };
  _renderCoupons = coupons => {
    setTimeout(() => {
      animChildren(document.querySelector(".stores"));
    }, 500);
    return coupons.map((coupon, key) => {
      return (
        <div className="store anim-onload" onClick={this.redirect} key={key}>
          <img className="icon anim-onload" src={coupon.icon} />
          <div className="offer-link">
            <div className="offer-name">
              <p className="name">{coupon.offer}</p>
              <p className="win">Ganhe {coupon.cashback}</p>
              <p className="cashback">de casback</p>
            </div>
            <img className="icon-go-img" src="img/icon-go.svg" alt="" />
          </div>
        </div>
      );
    });
  };
  render() {
    let { status, coupons } = this.state;
    if (status.type === "loading") return <Loading />;

    if (!coupons) {
      console.error("popup/render/coupons, props.coupons is an falsy value");
      return this._renderError(`Couldnt load coupons, try contact us`);
    }
    if (coupons.constructor.name !== "Array") {
      console.error("popup/render/coupons, props.coupons is not an array");
      return this._renderError("Couldnt load coupons, try contact us");
    }
    if (coupons.length > 0) return this._renderCoupons(coupons);
    else return this._renderEmpty();
  }
}

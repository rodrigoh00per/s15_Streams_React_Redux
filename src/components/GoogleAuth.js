import React, { Component } from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";
class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      //primero tenemos que ver cuando esta arriba la libreria de google auth
      window.gapi.client
        .init({
          //despues ya se inicia el respectivo cliente
          clientId:
            "234993623182-oes3ijbd4p8toavbdl723fcsll0u4b1n.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance(); //este regresa el objeto con todos los metodos tanto para loguears como para ver el status

          /* this.setState({ isSignedIn: this.auth.isSignedIn.get() }); //asigno al estado el estatus de la autenticación. */
          this.onAutChange(this.auth.isSignedIn.get());

          this.auth.isSignedIn.listen(this.onAutChange); //este metodo nos permite cambiar el estado si estoy o no logueado
        });
    });
  }
  onAutChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId()); //se mandan a llamar los actions
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};
//el connnect nos sirve para poder pasar actions y poder acceder a la store
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);

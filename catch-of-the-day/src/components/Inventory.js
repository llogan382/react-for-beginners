import React from "react";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from "./base";


class Inventory extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  }

  // When loading the page, check if there is a user
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    })
  }

  authHandler = async (authData) => {

    // 1. Look up store in firebase DB
    const store = await base.fetch(this.props.storeId, { context: this })

    // 2. Claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.email
      });
    }

    // 3. Set state of inventory to reflect current user
    this.setState({
      email: authData.user.email,
      owner: store.owner || authData.user.email
    })
    console.log(authData);
  };


  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    this.setState({ email: null })
  }
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>
    // Check if user is logged in

    if (!this.state.email) {
      return <Login
        authenticate={this.authenticate}

      />;
    }

    // Check if email matches email for owner
    if (this.state.email !== this.state.owner) {
      return (
        <div>
          Sorry you are not the owner!
          {logout}
        </div>
      )
    }

    // They must be the owner, render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key =>
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;

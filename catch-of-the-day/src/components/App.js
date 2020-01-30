import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from './Fish';
import base from "./base";

class App extends React.Component {

  // State lives here and is passed down to other components
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    // ref is a piece of data in the firebase database

    // son't sync entire database
    const { params } = this.props.match;

    // reinstate local storage before updating state
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    // go into just the "fishes" part of the firebase database
    // syncstate requires two items be passed in
    // Create this so it can be removed when the component is unmounted
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,

      // just sync the fish state
      state: 'fishes'
    });
  }


  componentDidUpdate() {

    // store item from this particular store in local storage
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  // After component is unmounted, don't watch for changes anymore
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of current state
    const fishes = { ...this.state.props };

    // 2. update the state
    fishes[key] = updatedFish;

    // 3. set that to state
    this.setState({ fishes });
  }


  deleteFish = (key) => {
    // 1. Take a copy of state.
    const fishes = { ...this.state.fishes }

    // 2. update state
    fishes[key] = null;

    // 3. update state. Thei is the FIREBASE syntax
    this.setState({ fishes });
  }


  // Load fishes button. Created here, passed to Inventory
  loadSampleFishes = () => {

    // Update STATE when clicked; update it to SAMPLEFISHES
    this.setState({ fishes: sampleFishes });
  }


  // Create a function in App. It takes in "key"
  addToOrder = key => {
    // Make a copy of state
    const order = { ...this.state.order };
    // Update order or add to order
    order[key] = order[key] + 1 || 1;
    //call set state to update our state
    this.setState({ order });

  }

  // Create a function in App. It takes in "key"
  removeFromOrder = key => {
    // Make a copy of state
    const order = { ...this.state.order };
    // delete from order
    delete order[key];
    //call set state to update our state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">{Object.keys(this.state.fishes).map(key => <Fish
            // If you need access to the key, you must pass the key
            key={key}
            index={key}
            details={this.state.fishes[key]}

            // When this function is run in FISH, it updates STATE above
            addToOrder={this.addToOrder}
          />)}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}

        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;

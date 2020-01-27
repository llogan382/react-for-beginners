import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from './Fish';

class App extends React.Component {

  // State lives here and is passed down to other components
  state = {
    fishes: {},
    order: {}
  };
  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

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
        />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;

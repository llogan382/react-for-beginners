import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {

  renderOrder = key => {
    //  Grab the fishe we are looping over
    const fish = this.props.fishes[key];

    // How many of each are we buying
    const count = this.props.order[key];

    const isAvailable = fish && fish.status === 'available';
    if (!fish) return null;
    if (!isAvailable) {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is not available</li>;
    }

    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.removeFromOrder(key)}>Remove</button>
      </li>
    );
  }

  removeFromOrder = (key) => {
    // 1. Take a copy of state.
    const order = { ...this.props.order }

    // 2. update state
    order[key] = null;

    // 3. update state. Thei is the FIREBASE syntax
    // this.setState({ fishes });
  }

  render() {
    const orderIds = Object.keys(this.props.order);

    // Make total of how much they cost
    // Better than a loop. Take in data, and show what is relevant
    const total = orderIds.reduce((prevTotal, key) => {
      //  Grab the fishe we are looping over
      const fish = this.props.fishes[key];

      // How many of each are we buying
      const count = this.props.order[key];


      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order!!!</h2>
        <ul className="order">{/* Reduce Code. Insert the function above, and map over it */}
          {orderIds.map(this.renderOrder)}
        </ul>

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;

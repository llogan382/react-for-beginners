import React from "react";
import PropTypes from "prop-types";

import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {

  static propTypes = {
    fishes: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
    }),
    order: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
    }),
    removeFromOrder: PropTypes.func
  }
  renderOrder = key => {
    //  Grab the fishe we are looping over
    const fish = this.props.fishes[key];

    // How many of each are we buying
    const count = this.props.order[key];

    const isAvailable = fish && fish.status === 'available';

    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    }
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>

          <li key={key}>Sorry, {fish ? fish.name : 'fish'} is not available</li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
                <span>
                  {count}
                </span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>Remove</button>
          </span>

        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">{/* Reduce Code. Insert the function above, and map over it */}
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;

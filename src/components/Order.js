import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    // Create a separate render function to clean up some space from our other render runction.
    renderOrder = key => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvalable = fish && fish.status === 'available';

        //make sure fish is loaded before we continue
        if (!fish) return null;
        if (!isAvalable) {
            return <li key={key}>
                Sorry {fish ? fish.name : 'fish'} is no longer available.
            </li>
        }
        return (
            <li key={key}>
                {count} lbs {fish.name}
                {formatPrice(count * fish.price)}
            </li>
        );
    };
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                {/* Call the secondary render function we created */}
                <ul className="order">{orderIds.map(this.renderOrder)}</ul>
                <div className="total">
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }

}

export default Order;
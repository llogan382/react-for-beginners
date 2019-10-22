import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    render() {
        const { image, name, price, description, status } = this.props.details;

        return (
            <li className="menu-fish">
                <img src={this.props.details.image} alt={this.props.details.image} srcset="" />
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>

                </h3>
                <p>{description}</p>
                <button>Add to Cart</button>
            </li>
        )
    }
}

export default Fish;
import React from "react";
import PropTypes from "prop-types";

import { formatPrice } from '../helpers';

class Fish extends React.Component {

    // use "sttic" becuase there are multiple instances of the fish prop
    static propTypes = {
        details: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            desc: PropTypes.string,
            image: PropTypes.string,
        }),
        addToOrder: PropTypes.func,
    }

    // Run a function when clicked
    handleClick = () => {

        // Pull in FUNCTION sent via PROPS, and pass in INDEX via PROPS
        this.props.addToOrder(this.props.index);
    }
    render() {

        const { name, price, status, desc, image } = this.props.details;
        const isAvailable = status === 'available';

        return <li className="menu-fish">
            <img src={image} alt={name} />
            <h3 className="fish-name">{name}
                <span className="price">{formatPrice(price)}</span>
            </h3>
            <p>{desc}</p>
            {/* Hide the button if it is not available */}
            <button disabled={!isAvailable}

                // When clicked, pass info into FUNCTION via PROPS
                onClick={this.handleClick}>
                {isAvailable ? `Add to Order` : `Sold Out!`}</button>
        </li>
    }
}


export default Fish;

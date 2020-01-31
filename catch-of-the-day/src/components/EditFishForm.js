import React from 'react';
import PropTypes from "prop-types";


class EditFishForm extends React.Component {

    static propTypes = {
        updateFish: PropTypes.func,
        index: PropTypes.string,
        fish: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            desc: PropTypes.string,
            image: PropTypes.string,
        })

    }

    // Run the function on click.
    handleChange = (event) => {

        // update the fish
        // 1. Take a copy of the fish.
        const updatedFish = {
            ...this.props.fish,

            // use the new es6 feature, "computed module names"
            [event.currentTarget.name]: event.currentTarget.value
        };

        // run the function that is passed in; pass in the INDEX, passed through props, and pass in the updated fish, a key/value pair
        this.props.updateFish(this.props.index, updatedFish)

    }
    render() {
        return (
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
                <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} />
                <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
                <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} /><button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        )
    }
}

export default EditFishForm;
import React from 'react';
import PropTypes from "prop-types";


class EditFishForm extends React.Component {
    static propTypes = {
        fish: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            image: PropTypes.string,
            index: PropTypes.string,
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func,
    };
    handleChange = (event) => {

        // Update the object. Here we are spreading the props and assigning them to updatedFish
        // This is send UPSTREAM into app, to update STATE with what is entered in the form
        const updatedFish = {

            // Take a copy of the fish, and overwrite what has changed.
            //using spread, take the target NAME with the target VALUE
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish)
    }

    render() {
        return (
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
                <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} />
                <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
                <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} />
                <button onClick={() => this.props.deleteFish(this.props.index)}>
                    Remove Fish
                </button>

            </div>
        )
    };
}

export default EditFishForm;
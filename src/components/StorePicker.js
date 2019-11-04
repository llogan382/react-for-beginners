import React from 'react';
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {

    static propTypes = {
        history: PropTypes.object,
    }
    // create the refs
    myInput = React.createRef();

    // create the event handler
    goToStore = event => { //this syntax will bind "this"
        event.preventDefault(); //prevent form from submitting by default

        const storeName = this.myInput.current.value; //get input value

        //change the url without using anything in memory
        this.props.history.push(`/store/${storeName}`);
    };

    render() {
        return (
            <form action="" className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input
                    type="text"
                    ref={this.myInput}
                    required placeholder="Store Name"
                    defaultValue={getFunName()} />
                <button type="submit">Visit Store </button>
            </form>
        );
    }
}

export default StorePicker;
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base'; //import firebase db


class App extends React.Component {
    state = {
        fishes: {}, //what State am I using in this component? fishes, which is an empty object
        order: {}
    };

    //check if the db from firebase mounted
    componentDidMount() {

        //refs in firebase are a reference to a piece of data
        const { params } = this.props.match;

        //reinstate local storage if it is there
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate() {

        // set the key and value for local storage
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {

        //when leaving the store, don't reference the data anymore
        base.removeBinding(this.ref);
    }


    addFish = fish => {
        // In order to update state, you need to use the UPDATE STATE API.
        const fishes = { ...this.state.fishes };
        // add a new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;

        // set new fishes object to state
        this.setState({
            fishes //takes old fishes and updates with current set of updated fishes.
        });

    };


    // Take info from the input, and update state.
    updateFish = (key, updatedFish) => {

        // Take a copy of the current State
        const fishes = { ...this.state.fishes };

        // Update that state
        fishes[key] = updatedFish;

        //set this to strate.
        this.setState({ fishes });

    }

    deleteFish = key => {

        //take a copy of state
        const fishes = { ...this.state.fishes };

        //update the state
        fishes[key] = null;

        // update state
        this.setState({ fishes });
    };
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        //take a copy of state
        const order = { ...this.state.order };
        //either add to the order or update the number in the order
        order[key] = order[key] + 1 || 1;

        //call setstate to update state object
        this.setState({ order });
    }

    removeFromOrder = (key) => {
        //take a copy of state
        const order = { ...this.state.order };
        //either add to the order or update the number in the order
        delete order[key];

        //call setstate to update state object
        this.setState({ order });
    }
    render() {
        return (
            <div className="catch-of-the-day" >
                <div className="menu">
                    <Header tagline={true} />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder} />)
                        )}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}

                />

                <Inventory
                    addFish={this.addFish}
                    deleteFish={this.deleteFish}
                    updateFish={this.updateFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;
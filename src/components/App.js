import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';


class App extends React.Component {
    state = {
        fishes: {}, //what State am I using in this component? fishes, which is an empty object
        order: {}
    };

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
    render() {
        return (
            <div className="catch-of-the-day" >
                <div className="menu">
                    <Header tagline="Luke da man" age={34} zip={27403} />
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
                />

                <Inventory loadSampleFishes={this.loadSampleFishes} addFish={this.addFish} />
            </div>
        );
    }
}

export default App;
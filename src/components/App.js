import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';


class App extends React.Component {
    state = {
        fishes: {}, //what State am I using in this component? fishes, which is an empty object
        order: {}
    };

    addFish = fish => {
        // In order to update state, you need to use the UPDATE STATE API.
        const fishes = { ...this.state.fishes };
        // add a new fish to that fishes variable
        fishes[`fishe${Date.now}`] = fish;

        // set new fishes object to state
        this.setState({
            fishes //takes old fishes and updates with current set of updated fishes.
        });

    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };
    render() {
        return (
            <div className="catch-of-the-day" >
                <div className="menu">
                    <Header tagline="Luke da man" age={34} zip={27403} />
                </div>
                <Order />

                <Inventory loadSampleFishes={this.loadSampleFishes} addFish={this.addFish} />
            </div>
        );
    }
}

export default App;
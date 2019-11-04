import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase';
import Login from './Login';
import AddFishForm from './AddFishForm';
import EditFishForm from "./EditFishForm";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };


    // Local state only used for this component
    state = {
        uid: null,
        owner: null
    }
    // On page reload, check if user is signed in.
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    }
    authHandler = async authData => {
        // lookup current store in firebase DB
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        //Claim it if there is no owner
        if (!store.owner) {
            // Save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        //Set state of the inventory to reflect current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    };

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };
    logout = async () => {
        console.log('Logging Out!!!');
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render() {

        const logout = <button onClick={this.logout}>Log Out!</button>
        //check if they are logged in
        if (!this.state.uid) {
            return (
                <Login authenticate={this.authenticate} />
            );
        }
        // Check if they are the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>
                        Sorry you are not the owner!
                    {logout}
                    </p>
                </div>
            );
        }

        // They must be the owner, just render the inventory
        return (
            <div className="inventory">
                <h2>Inventory!</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}

                    />
                ))}
                {/* Info is being passed down from APP, so it uses PROPS */}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }

}

export default Inventory;

import React from 'react';
import PropTypes from "prop-types";

/*
This is a stateless functional component
If it is just taking in props and returning JSX data, use this
*/
const Header = (props) => (
    <header className="top" >
        <h1>Catch
            <span className="ofThe">
                <span className="of"> of</span>
                <span className="the">the</span>
            </span>
            Day</h1>
        <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
    </header>
);

//Here is the same thing as above as a regular component:

Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;

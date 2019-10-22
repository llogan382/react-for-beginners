import React from 'react';

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


// class Header extends React.Component {
//     render() {
//         return (
//             <header className="top" >
//                 <h1>Catch
//                     <span className="ofThe">
//                         <span className="of"> of</span>
//                         <span className="the">the</span>
//                     </span>
//                     Day</h1>
//                 <h3 className="tagline">
//                     <span>{this.props.tagline}</span>
//                     {console.log(this.props)}
//                 </h3>
//             </header>
//         )
//     }
// }

export default Header;

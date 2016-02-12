
import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src="images/pluralsight-logo.png" />
                    </Link>
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/groceries">Groceries</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <footer className="footer navbar-fixed-bottom">
                <div className="container">
                    <p className="text-muted">Pluralsight</p>
                </div>
            </footer>
        );
    }
}

export default Footer;
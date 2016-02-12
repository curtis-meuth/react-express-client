import React from 'react';
import Header from './common/header';
import Footer from './common/footer';
import { Router, Route, Link } from 'react-router';

class App extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
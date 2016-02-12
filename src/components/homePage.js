import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="jumbotron">
                <h1>React Express</h1>
                <p>This is the front-end of our Node/Express - React application.</p>
            </div>
        );
    }
}

export default Home;
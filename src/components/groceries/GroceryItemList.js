import React from 'react';
import GroceryItem from './GroceryItem';
import GroceryListAddItem from './GroceryListAddItem';
import GroceryStore from '../../stores/groceryStore';

class GroceryItemList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            groceries: GroceryStore.getAllGroceries()
        };

        this._onChange = this._onChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

    }

    _onChange() {
        this.setState({
            groceries: GroceryStore.getAllGroceries()
        });
        console.log('Item List: ' + this.state.groceries);
    }

    componentWillMount() {
        GroceryStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        GroceryStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Grocery Listify</h1>
                    <div className="col-md-6">
                        {
                            this.state.groceries.map(function (item, index) {
                                return (
                                    <GroceryItem item={item} key={"item" + index} />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <GroceryListAddItem />
                </div>
            </div>
        );
    }
}

export default GroceryItemList;
import React from 'react';
import GroceryActions from '../../actions/groceryActions';
import Input from '../common/textInput';

class GroceryListAddItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            grocery: { name: '', purchased: false },
            dirty: false,
            errors: {}
        };

        this.setGroceryState = this.setGroceryState.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    setGroceryState(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.grocery[field] = value;
        return this.setState({grocery: this.state.grocery});
    }

    addItem(event) {
        event.preventDefault();
        GroceryActions.addItem(this.state.grocery);

        this.setState({
            grocery: {
                name: ''
            },
            dirty: false
        });

    }

    render() {
        return (
            <div className="grocery-addItem col-md-4">
                <form onSubmit={this.addItem}>
                    <Input
                        name="name"
                        label="Add Item"
                        value={this.state.grocery.name}
                        onChange={this.setGroceryState}
                        error={this.state.errors.name} />
                    <button className="btn btn-success" onClick={this.state.addItem}> Add Item </button>
                </form>
            </div>
        );
    }
}

export default GroceryListAddItem;
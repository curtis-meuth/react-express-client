import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actionTypes';
import EventEmitter from 'events';
import _ from 'lodash';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

const _groceries = [];

class GroceryStore extends EventEmitter {

    constructor(){
        super();

        this.addChangeListener = this.addChangeListener.bind(this);
        this.removeChangeListener = this.removeChangeListener.bind(this);
        this.emitChange = this.emitChange.bind(this);
        this.getAllGroceries = this.getAllGroceries.bind(this);
        this.getGroceryById = this.getGroceryById.bind(this);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getAllGroceries() {
        return _groceries;
    }

    getGroceryById(id) {
        return _.find(_groceries, {id: id});
    }

}

const groceryStoreInstance = new GroceryStore();

groceryStoreInstance.dispatchToken = Dispatcher.register((action) => {
   switch (action.actionType) {
       case ActionTypes.INITIALIZE:
           Array.prototype.unshift.apply(_groceries, action.initialData.groceries);
           groceryStoreInstance.emitChange();
           break;
       case ActionTypes.CREATE_GROCERY:
           _groceries.push(action.author);
           groceryStoreInstance.emitChange();
           break;
       case ActionTypes.UPDATE_GROCERY:
           const existingAuthorIndex = _.findIndex(_groceries, {id: action.grocery.id});
           _groceries.splice(existingAuthorIndex, 1, action.grocery);
           groceryStoreInstance.emitChange();
           break;
       case ActionTypes.DELETE_GROCERY:
           _.remove(_groceries, function (grocery) {
               return action.id === grocery.id;
           });
           groceryStoreInstance.emitChange();
           break;
       default:
       // no op

   }
});

export default groceryStoreInstance;
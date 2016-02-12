import Dispatcher from '../dispatcher/dispatcher';
import ActionsTypes from '../constants/actionTypes';
import $ from 'jquery';

let url = '/api/groceries';

export default {
    addItem(grocery) {
        if(grocery.purchased === null) {
            grocery.purchased = false;
        }
        let newItem = {};
        $.post(url, grocery, (results) => {
            newItem = results;
        });

        Dispatcher.dispatch({
            actionType: ActionsTypes.CREATE_GROCERY,
            grocery: newItem
        });
    }
};
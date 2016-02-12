import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actionTypes';
import $ from 'jquery';

let url = '/api/groceries';

export default {
    initApp(){

        let groceries = {};
        $.getJSON( url, (results) => {
            console.log('got');
            groceries = results;
            console.log(groceries);
        });

        console.log(groceries);

        Dispatcher.dispatch({
            actionTypes: ActionTypes.INITIALIZE,
            initialData: {
                groceries: groceries
            }
        });
    }
};
import { createStore } from 'redux';

const defaultState = {
    prevVal: '0',
    currVal: '0',
    formula: '',
    inputArr: []
}

const evalReducer = (state = defaultState, action) => {
    console.log('evaluating');
}

const store = createStore(evalReducer);

export default store;
import { createStore } from 'redux';

const defaultState = {
    inputVal: '',
    currVal: '0',
    prevVal: '',
    formula: '',
};


const evalReducer = (state = defaultState, action) => {

    let newValue = '';

    switch(action.type){
        case 'digits':  
            
            //if starting with zero overwrite with non-zero input.
            //else if head is non-zero then append number.
            //else return unchanged.
            if ((/^0+(?!\.)/).test(state.currVal) ) { 
                newValue = action.inputVal;
            } else if ((/^[1-9]\d*/).test(state.currVal) || (/^(\d*\.)/).test(state.currVal)){
                newValue = state.currVal + action.inputVal;
            } else {
                newValue = state.currVal;
            }

            return {
                ...state,    
                currVal: newValue,
                prevVal: newValue,
            };

        case 'operator': 

            //if current formula has no operator at the end, add one.
            //else if formula already has operator at the end, overwrite end with new one.
            //else return unchanged.
            if (state.formula === '') {
                newValue = state.currVal + action.inputVal;
            } else if((/(\d*[-+*/%])$/).test(state.formula) && state.currVal !== '0') { 
                newValue = state.formula + state.currVal + action.inputVal;
            } else if ((/[-+*/%]$/).test(state.formula)) {
                newValue = state.formula.slice(0,state.formula.length-1) + action.inputVal;
            } else {
                newValue = state.formula;
            }
            
            return {
                ...state,
                formula: newValue,
                currVal: '0',
            };

        case 'decimal':
            
            //if current input starts with a zero or non-zero numbers does have a decimal, tadd a decimal dot. 
            //else return unchanged state value.
            if ((/^0+(?!\.)/).test(state.currVal) || (/^([1-9]\d*(?!\.))*$/).test(state.currVal) ) {
                newValue = state.currVal + action.inputVal;
            } else {
                newValue = state.currVal; 
            }

            return {
                ...state,    
                currVal: newValue,
                prevVal: newValue
            };

        case 'AC': 
            //clear all values in the state.
            return {  
                inputVal: '',
                currVal: '0',
                prevVal: '',
                formula: '',
            };

        case 'evaluate': 
                

            return {
                ...state,
                formula: state.formula,
            };
        default: 
            return state;
    }
};

const store = createStore(evalReducer);

export default store;
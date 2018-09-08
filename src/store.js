import { createStore } from 'redux';
import * as math from 'mathjs';


const defaultState = {
    inputVal: '',   //input value from calculator app
    showVal: '',    //display value 
    showExp: '0',   //display expression
    currVal: '',    //current value
    currExp: '',    //current expression
    isSolved: false,    //boolean evaluation
};

const precision = 9;
const InputLen = 16;

const evalReducer = (state = defaultState, action) => {

    let newValue, 
        evalResult,
        newFormula;
    
    //check length.
    const checkLength = (str) => (str.length >= InputLen);

    switch(action.type){
        case 'digits':
            //if initial state or post-evaluation, then overwrite input.
            if (state.currVal === '' || state.currVal === '0' || state.isSolved) { 
                newValue = action.inputVal;
                newFormula = ((state.currExp !== '' && state.currVal !== '0') && !state.isSolved) ? state.currExp + action.inputVal : action.inputVal;
            }
            //else if head is non-zero then append input number.
            else if (((/^[1-9]\d*/).test(state.currVal) || (/^(\d*\.)/).test(state.currVal))){
                newValue = state.currVal + action.inputVal;
                newFormula = state.currExp + action.inputVal;
                //if input limit has been met.
                if(checkLength(newValue)){
                    newValue = newValue.slice(0,newValue.length-1);
                    newFormula = newFormula.slice(0,newFormula.length-1);
                }
            }
            //else keep unchanged.
            else {
                newValue = state.currVal;
                newFormula = state.currExp;
            }

            return {
                ...state,    
                showVal: newValue,
                currVal: newValue,
                currExp: newFormula,
                isSolved: false,
            };

        case 'operator': 
            //if current currExp has no operator at the end, then add one.
            if (!(/^[+*/%]/).test(state.currExp) && (/\d\.*$/).test(state.currVal)) {
                newFormula = state.currExp + action.inputVal;
            }
            //else if currExp already has operator at the end, overwrite end with new one. 
            else if ((/[-+*/%]$/).test(state.currExp)) {
                newFormula = state.currExp.slice(0,state.currExp.length-1) + action.inputVal;
            }
            //else keep unchanged. 
            else {
                newFormula = state.currExp;
            }
            
            return {
                ...state,
                showVal: action.inputVal,
                showExp: newFormula,
                currVal: '',
                currExp: newFormula,
                isSolved: false,
            };


        case 'decimal':
            //if input is just a zero, then add dot after.
             if (state.currVal === '') {
                newValue = '0' + action.inputVal;
                newFormula = state.currExp + '0' + action.inputVal;
            }
            //if current input starts with a zero or non-zero numbers does have a decimal, append a dot.
            else if ((/^([1-9]\d*)(?!\.)$/).test(state.currVal) || (/^0(?!\.)$/).test(state.currVal)) {
                newValue = state.currVal + action.inputVal;
                newFormula = state.currExp + action.inputVal;
            }
            //else keep unchanged.
            else {
                newValue = state.currVal; 
                newFormula = state.currExp; 
            }

            return {
                ...state,    
                showVal: newValue,
                currVal: newValue,
                currExp: newFormula,
                isSolved: false,
            };


        case 'AC': 
            //clear all values in the state.
            return {  
                inputVal: '',
                showVal: '0',
                currVal: '',
                currExp: '',
                isSolved: false,
            };


        case 'evaluate': 
            //if entry is empty then return state.
            if (state.currExp === '' && state.currVal === ''){
                return state;
            }
            //if currExp is not evaluated yet, then evaluate. 
            else if (!state.isSolved) {
                //if currExp ends with an operator, exclude it then evaluate.
                if ((/[-+*/%]$/).test(state.currExp)) {
                    newFormula = state.currExp.slice(0,state.currExp.length-1);
                    evalResult = math.format(math.eval(newFormula) , precision);
                }
                //else evaluate normally
                else {
                    newFormula = state.currExp;
                    evalResult = math.format(math.eval(newFormula) , precision);
                }
            }
            //else keep unchanged. 
            else {
                newFormula = state.currExp;
                evalResult = state.currVal;
            }

            return {
                ...state,
                showVal: evalResult,
                showExp: newFormula + action.inputVal,
                currVal: evalResult,
                currExp: '('+evalResult+')',
                isSolved: true,
            };
        default: 
            return state;
    }
};

const store = createStore(evalReducer);

export default store;
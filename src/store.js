import { createStore } from 'redux';
import * as math from 'mathjs';


const defaultState = {
    inputVal: '',   //input value from calculator app
    showVal: '',   //display value 
    showExp: '0',    //display expression
    currVal: '',    //current value
    currExp: '',    //current expression
    isSolved: false,    //boolean evaluation
};

const precision = 13;

const evalReducer = (state = defaultState, action) => {

    let newValue, 
        evalResult,
        newFormula;


    switch(action.type){
        case 'digits':
            //if initial state or post-evaluation, then overwrite input.
            if (state.currVal === '' || state.currVal === '0') { 
                newValue = action.inputVal;
                newFormula = (state.currExp !== '' && state.currVal !== '0') ? state.currExp + action.inputVal : action.inputVal;
            }
            //else if head is non-zero then append input number.
            else if (((/^[1-9]\d*/).test(state.currVal) || (/^(\d*\.)/).test(state.currVal))){
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
                //showExp: newFormula,
                currVal: newValue,
                currExp : newFormula,
                isSolved: false,
            };


        case 'operator': 
            //if current currExp has no operator at the end, then add one.
            if ((!(/^[-+*/%]/).test(state.currExp) && (/\d\.*$/).test(state.currVal)) && !state.isSolved) {
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
            else if (((/^([1-9]\d*)(?!\.)$/).test(state.currVal) || (/^0(?!\.)$/).test(state.currVal)) && !state.isSolved) {
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
                showExp: state.currExp,
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
            //if currExp is not evaluated yet, then evaluate. 
            if (!state.isSolved) {
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
                newFormula = math.format(math.eval(newFormula), precision);
                evalResult = state.currVal;
            }

            console.log(newFormula,newValue);

            return {
                ...state,
                showVal: evalResult,
                showExp: newFormula + action.inputVal,
                currVal: '',
                currExp: '',
                isSolved: true,
            };
        default: 
            return state;
    }
};

const store = createStore(evalReducer);

export default store;
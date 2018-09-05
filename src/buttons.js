import React from 'react';
import { connect } from 'react-redux';
import './Buttons.css';

function Buttons (props) {
    return(
        <div className='buttons'>
            <button id='zero'   value='0'   onClick={props.clickedBtn}> 0 </button>
            <button id='one'    value='1'   onClick={props.clickedBtn}> 1 </button>
            <button id='two'    value='2'   onClick={props.clickedBtn}> 2 </button>
            <button id='three'  value='3'   onClick={props.clickedBtn}> 3 </button>
            <button id='four'   value='4'   onClick={props.clickedBtn}> 4 </button>
            <button id='five'   value='5'   onClick={props.clickedBtn}> 5 </button>
            <button id='six'    value='6'   onClick={props.clickedBtn}> 6 </button>
            <button id='seven'  value='7'   onClick={props.clickedBtn}> 7 </button>
            <button id='eight'  value='8'   onClick={props.clickedBtn}> 8 </button>
            <button id='nine'   value='9'   onClick={props.clickedBtn}> 9 </button>
            <button id='dot'    value='.'   onClick={props.clickedBtn}> . </button>
            <button id='add'    value='+'   onClick={props.clickedBtn}> + </button>
            <button id='subtract' value='-' onClick={props.clickedBtn}> - </button>
            <button id='multiply' value='*' onClick={props.clickedBtn}> x </button>
            <button id='divide' value='/'   onClick={props.clickedBtn}> / </button>
            <button id='modulo' value='%'   onClick={props.clickedBtn}> % </button>
            <button id='equal'  value='='   onClick={props.clickedBtn}> = </button>
            <button id='allclear' value='AC' onClick={props.clickedBtn}> AC </button>
        </div>
    );
} 


const mapDispatchToProps = (dispatch) => {
    return {
        clickedBtn: (event) => {

            //check the type of the clicked input 
            const actionType  = (val) => {
                if((/\d/).test(val)) { return 'digits'; }
                else if((/[-+*/%]/).test(val)) { return 'operator'; }
                else if((/\./).test(val)) { return 'decimal'; }
                else if(val === 'AC') { return 'AC'; } 
                else { return 'evaluate'; }
            };

            const action = {
                type: actionType(event.target.value),
                inputVal: event.target.value,
            };
            dispatch(action);
        }
    }
};


export default connect(null, mapDispatchToProps)(Buttons);

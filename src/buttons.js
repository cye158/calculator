import React from 'react';
import { connect } from 'react-redux';
import './Buttons.css';

function Buttons (props) {
    return(
        <div className='buttons'>
            <button id='zero'   value='0'   onClick={props.clickedValue}> 0 </button>
            <button id='one'    value='1'   onClick={props.clickedValue}> 1 </button>
            <button id='two'    value='2'   onClick={props.clickedValue}> 2 </button>
            <button id='three'  value='3'   onClick={props.clickedValue}> 3 </button>
            <button id='four'   value='4'   onClick={props.clickedValue}> 4 </button>
            <button id='five'   value='5'   onClick={props.clickedValue}> 5 </button>
            <button id='six'    value='6'   onClick={props.clickedValue}> 6 </button>
            <button id='seven'  value='7'   onClick={props.clickedValue}> 7 </button>
            <button id='eight'  value='8'   onClick={props.clickedValue}> 8 </button>
            <button id='nine'   value='9'   onClick={props.clickedValue}> 9 </button>
            <button id='dot'    value='.'   onClick={props.clickedValue}> . </button>
            <button id='add'    value='+'   onClick={props.clickedValue}> + </button>
            <button id='subtract' value='-' onClick={props.clickedValue}> - </button>
            <button id='multiply' value='*' onClick={props.clickedValue}> x </button>
            <button id='divide' value='/'   onClick={props.clickedValue}> / </button>
            <button id='modulo' value='%'   onClick={props.clickedValue}> % </button>
            <button id='equal'  value='='   onClick={props.clickedValue}> = </button>
            <button id='allclear' value='AC' onClick={props.clickedValue}> AC </button>
            
        </div>
    );
} 

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps');
    return {
        clickedValue: (value) => {
        }
    }
}

export default connect(mapDispatchToProps)(Buttons);

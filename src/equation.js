import React from 'react';
import { connect } from 'react-redux';
import './Equation.css';


function Equation (props) { 
  return (
      <div>
        <div className='formula'>{props.formula}</div>
        <div className='answer'>{props.currVal}</div>
      </div>
  );
}

const mapStateToProps = (state) => {
    return{
      currVal: state.currVal,
      formula: state.formula,
    };
};

export default connect(mapStateToProps,null)(Equation);
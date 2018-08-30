import React from 'react';
import { connect } from 'react-redux';
import './Equation.css';


function Equation (props) { 
  return (
      <div>
        <div className='formula'>13+123={props.formula}</div>
        <div className='answer'>136{props.currVal}</div>
      </div>
  );
}

const mapStateToProps = (state) => {
    return{
    };
}

export default connect(mapStateToProps)(Equation);
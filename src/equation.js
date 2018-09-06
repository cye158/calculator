import React from 'react';
import { connect } from 'react-redux';
import './Equation.css';


function Equation (props) { 
  return (
      <div>
        <div className='formula'>{props.showExp}</div>
        <div className='answer'>{props.showVal}</div>
      </div>
  );
}

const mapStateToProps = (state) => {
    return{
      showVal: state.showVal,
      showExp: state.showExp,
    };
};

export default connect(mapStateToProps,null)(Equation);
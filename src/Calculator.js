import React, { Component } from 'react';
import './Calculator.css';
import Equation from './Equation';
import Buttons from './Buttons';
//import Footer from './Footer';


class Calculator extends Component {
  render() {
    return (
      <div className='calc'>
          <Equation />
          <Buttons />
      </div>
    );
  }
}

export default Calculator;

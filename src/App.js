import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">CALCULATOR</h1>
        </div>

        <div className='calculator'>
          <div className='equation' value>123+456+100=</div>
          <div className='answer'>679</div>
          <div className='buttons'>
            <button id='zero'>0</button>
            <button id='one'>1</button>
            <button id='two'>2</button>
            <button id='three'>3</button>
            <button id='four'>4</button>
            <button id='five'>5</button>
            <button id='six'>6</button>
            <button id='seven'>7</button>
            <button id='eight'>8</button>
            <button id='nine'>9</button>
            <button id='dec'>.</button>
            <button id='add'>+</button>
            <button id='subtract'>-</button>
            <button id='multiply'>x</button>
            <button id='divide'>/</button>
            <button id='modulo'>%</button>
            <button id='allclear'>AC</button>
            <button id='equal'>=</button>
          </div>
          <div className='author'>CYE-MN0106</div>
        </div>
      </div>
    );
  }
}

export default App;

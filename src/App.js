import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';

class App extends Component {
   render() {
      return (
         <div>
            <Board />
            <br />
      {/*radios to select ships and ship orientation for placement, also radios to toggle between ships board and target board*/}
            <Toggles />   
         </div>
        
      );
  }
}

class Board extends Component {
   render() {
      return (
         <div>
            <button class="btn-lg center-block buildButton">build</button>
            <div class="gameBoard container">
               <div class="row no-gutters colHeadings"></div>
               <div class="row no-gutters grid"></div>
               <div class="row no-gutters colHeadings"></div>     
            </div>
         </div>
      );
   }
}

class Toggles extends Component {
   render() {
      return (
         <div class="container shipSelect">
               <div class="row no-gutters">
                  <div class="col-sm-6">
               
                     <form>
                        <h5><u>Board Toggle</u></h5>
                        <input type="radio" class="radioBtn" name="board" value="ships" /> ships<br />
                        <input type="radio" class="radioBtn" name="board" value="targets" /> target<br />
                        <br />
                        <h5><u>Ship Orientation</u></h5>
                        <input type="radio" class="radioBtn" name="orientation" value="vertical" /> vertical<br />
                        <input type="radio" class="radioBtn" name="orientation" value="horizontal" /> horizontal<br />
                     </form>
                  </div>
                  <div class="col-sm-6">
                     <form>
                        <h5><u>Ship Select</u></h5>
                        <input type="radio" class="radioBtn" name="ship" value="shipAir" /> 5 - Aircraft Carrier<br />
                        <input type="radio" class="radioBtn" name="ship" value="shipBat" /> 4 - Battleship<br />
                        <input type="radio" class="radioBtn" name="ship" value="shipSub" /> 3 - Submarine<br />
                        <input type="radio" class="radioBtn" name="ship" value="shipDes" /> 3 - Destroyer<br />
                        <input type="radio" class="radioBtn" name="ship" value="shipPtrl" /> 2 - Patrol Boat<br />
                     </form>
                  </div>
               </div>           
            </div>
      );
   }
}

export default App;

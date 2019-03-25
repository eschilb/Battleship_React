import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
//import './game';

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
            <div class="gameBoard container">
               <GridHeadings />
               <Grid />
               <GridHeadings />   
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

class GridHeadings extends Component {
   render() {
      return (
         <div class="row no-gutters colHeadings">{this.renderHeadings()}</div>
      );
   }
   
   renderHeadings() {
      // arrayto return to GridHeadings div
      var colHeadings = [];
      
      // loop to build column heading cells
      for (var i=0; i<12; i++) {
         var headingLabel = i;
         if (i === 0 || i === 11) {
            headingLabel = "";
         }
         colHeadings.push(<div class="col-xs-1 cell">{headingLabel}</div>);
      }
      return colHeadings;
   }
}

class Grid extends Component {
   render() {
      return (
         <div>
            <div class="row no-gutters grid">{this.renderGrid()}</div>
         </div>
      );
   }

   renderGrid() {
      // array to return to Grid div
      var gridRows = [];
      
      // loop to add cells to gridRows object
      for (var i=0; i<10; i++) {
         // array to hold gridCells constituting an object added to gridRows
         var gridCells = [];
         // add row heading at start of row
         var headingLabel = convertNumberToLetter(i+1);
         gridCells.push(<div class="col-xs-1 rowHeading cell">{headingLabel}</div>);

         // loop to add targetting coordinate gridCells
         for (var j=0; j<10; j++) {
            // generate gridCell id
            var cellId = headingLabel + (j+1);
            gridCells.push(<div class="col-xs-1 gridCell cell" id={cellId}></div>)
         }

         // add row heading at end of row
         gridCells.push(<div class="col-xs-1 rowHeading cell">{headingLabel}</div>);

         // add gridCells object to gridRows
         gridRows.push(gridCells);
        } 
      return gridRows;
   } 
}

// function to convert number to letter for row headings and coordinate IDs
function convertNumberToLetter(num) {
   switch(num) {
      case 1:
         return 'A';
         break;
      case 2:
         return 'B';
         break;
      case 3:
         return 'C';
         break;
      case 4:
         return 'D';
         break;
      case 5:
         return 'E';
         break;
      case 6:
         return 'F';
         break;
      case 7:
         return 'G';
         break;
      case 8:
         return 'H';
         break;
      case 9:
         return 'I';
         break;
      case 10:
         return 'J';
         break;
      default:
         return '';
   }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import {battleShip} from './battleShip';

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
            <div className="gameBoard container">
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
                        <BoardToggle value="ships" /> ships<br />
                        <BoardToggle value="targets" /> target<br />
                        <br />
                        <h5><u>Ship Orientation</u></h5>
                        <OrientToggle value="vertical" /> vertical<br />
                        <OrientToggle value="horizontal" /> horizontal<br />
                     </form>
                  </div>
                  <div class="col-sm-6">
                     <form>
                        <h5><u>Ship Select</u></h5>
                        <ShipToggle value="shipAir" /> 5 - Aircraft Carrier<br />
                        <ShipToggle value="shipBat" /> 4 - Battleship<br />
                        <ShipToggle value="shipSub" /> 3 - Submarine<br />
                        <ShipToggle value="shipDes" /> 3 - Destroyer<br />
                        <ShipToggle value="shipPtrl" /> 2 - Patrol Boat<br />
                     </form>
                  </div>
               </div>           
            </div>
      );
   }
}

class BoardToggle extends Component {
   render() {
      return (
         <input 
            type="radio" 
            className="radioBtn" 
            name="board" 
            value={this.props.value} 
            onClick={() => battleShip.toggleBoard(this)}
         />
      );
   }
}

class OrientToggle extends Component {
   render() {
      return (
         <input type="radio" className="radioBtn" name="orientation" value={this.props.value} />
      );
   }
}

class ShipToggle extends Component {
   render() {
      return (
         <input type="radio" className="radioBtn" name="ship" value={this.props.value} />
      );
   }
}

class GridHeadings extends Component {
   render() {
      return (
         <div className="row no-gutters colHeadings">{this.renderHeadings()}</div>
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
         colHeadings.push(<div className="col-xs-1 cell">{headingLabel}</div>);
      }
      return colHeadings;
   }
}

class Grid extends Component {
   render() {
      return (
         <div>
            <div className="row no-gutters grid">{this.renderGrid()}</div>
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
         var headingLabel = battleShip.convertNumberToLetter(i+1);
         gridCells.push(<div className="col-xs-1 rowHeading cell">{headingLabel}</div>);

         // loop to add targetting coordinate gridCells
         for (var j=0; j<10; j++) {
            // generate gridCells with id and push GridCell component to array gridCells
            var cellId = headingLabel + (j+1);
            gridCells.push(
               <GridCell id={cellId} />)
         }

         // add row heading at end of row
         gridCells.push(<div className="col-xs-1 rowHeading cell">{headingLabel}</div>);

         // add gridCells object to gridRows
         gridRows.push(gridCells);
      } 
      return gridRows;
   } 
}

class GridCell extends Component {
   render() {
      return (
         <div
            className="col-xs-1 gridCell cell"
            id={this.props.id}
            onMouseOver={() => battleShip.highlightCell(this.props.id)}
            onMouseOut={() => battleShip.removeHighlight(this.props.id)}
         ></div>
      );
   }
}



export default App;

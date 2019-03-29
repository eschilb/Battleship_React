import React, { Component } from 'react';
import './App.css';
import './style.css';
import {battleShip} from './battleShip';

class App extends Component {
   
   render() {
      return <BattleshipGame />;
  }
}

class BattleshipGame extends Component {
   constructor(props) {
      super(props);
      this.state = {
         player: 0,
         shipsHit: [], //hits on own grid
         shipsAll: [],
         shipAir: [], //5
         shipBat: [], //4
         shipDes: [], //3
         shipSub: [], //3
         shipPtrl: [], //2
         targetsHit: [], //offensive hits
         targetsMissed: [], //offensive misses
         wins: 0,
         losses: 0,
         currentBoard: "ships", // value is "ships" or "targets", indicating which board is active--defense or offense
         gameMode: "setup",
         shipOrientation: "vertical",
         currentShip: "shipAir",
      };
   }
   render() {
      return (
         <div>
            <Board />
            <br />
      {/*radios to select ships and ship orientation for placement, also radios to toggle between ships board and target board*/}
            <GameToggles 
               currentBoardState={this.state.currentBoard}
               shipOrientState={this.state.shipOrientation}
               currentShipState={this.state.currentShip}
               toggleAction={this.handleToggleAction}
            />   
         </div>
        
      );
   }
   handleToggleAction = (toggleName, toggleValue) => {
      switch (toggleName) {
         case "board": 
            this.setState({currentBoard: toggleValue});
            console.log("state.currentBoard set to " + toggleValue);
            break;
         case "orientation":
            this.setState({shipOrientation: toggleValue});
            console.log("state.shipOrientation set to " + toggleValue);
            break;
         case "ship":
            this.setState({currentShip: toggleValue});
            console.log("state.currentShip set to " + toggleValue);
            break;
         default: console.log("toggleBoard error: not a valid toggle name!");
      }
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

class GameToggles extends Component {
   render() {
      return (
         <div className="container shipSelect">
            <div className="row no-gutters">
               <div className="col-sm-6">         
                  <form>
                     <h5><u>Board Toggle</u></h5>
                      <Toggle
                        name="board"
                        value="ships" 
                        toggleState={this.props.currentBoardState}
                        toggleAction={this.props.toggleAction}
                     /> ships<br />
                     <Toggle 
                        name="board"
                        value="targets" 
                        toggleState={this.props.currentBoardState}
                        toggleAction={this.props.toggleAction}
                     /> targets<br />
                     <br />

                     <h5><u>Ship Orientation</u></h5>
                     <Toggle
                        name="orientation"
                        value="vertical" 
                        toggleState={this.props.shipOrientState}
                        toggleAction={this.props.toggleAction} 
                     /> vertical<br />
                     <Toggle
                        name="orientation"
                        value="horizontal" 
                        toggleState={this.props.shipOrientState}
                        toggleAction={this.props.toggleAction}
                     /> horizontal<br />
                  </form>
               </div>

               <div className="col-sm-6">
                  <form>
                     <h5><u>Ship Select</u></h5>
                     <Toggle 
                        name="ship"
                        value="shipAir" 
                        toggleState={this.props.currentShipState}
                        toggleAction={this.props.toggleAction}
                     /> 5 - Aircraft Carrier<br />
                     <Toggle 
                        name="ship"
                        value="shipBat"
                        toggleState={this.props.currentShipState}
                        toggleAction={this.props.toggleAction}
                     /> 4 - Battleship<br />
                     <Toggle 
                        name="ship"
                        value="shipSub" 
                        toggleState={this.props.currentShipState} 
                        toggleAction={this.props.toggleAction}
                     /> 3 - Submarine<br />
                     <Toggle 
                        name="ship"
                        value="shipDes" 
                        toggleState={this.props.currentShipState} 
                        toggleAction={this.props.toggleAction}
                     /> 3 - Destroyer<br />
                     <Toggle 
                        name="ship"
                        value="shipPtrl" 
                        toggleState={this.props.currentShipState} 
                        toggleAction={this.props.toggleAction}
                     /> 2 - Patrol Boat<br />
                  </form>
               </div>
            </div>           
         </div>
      );
   }
}

class Toggle extends Component {
   render() {
      return (
         <input 
            type="radio" 
            className="radioBtn" 
            name={this.props.name} 
            value={this.props.value}
            onClick={this.handleToggleAction}
            checked={this.props.value===this.props.toggleState}
         />
      );
   }
   handleToggleAction = () => {
      this.props.toggleAction(this.props.name, this.props.value);
   }
}

class GridHeadings extends Component {
   render() {
      return (
         <div className="row no-gutters colHeadings">{this.renderHeadings()}</div>
      );
   }
   
   renderHeadings() {
      return ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ''].map(headingLabel => (
        <div className="col-xs-1 cell">{headingLabel}</div>
      ));
   }
}

class Grid extends Component {
   render() {
      return (
         <div className="row no-gutters grid">{this.renderGrid()}</div>
      );
   }

   renderGrid() {
      return (
         ['A','B','C','D','E','F','G','H','I','J'].map(headingLabel => {
            // array to hold gridCells constituting an object added to gridRows
            var gridCells = [];

            // add row heading at start of row
            gridCells.push(<div className="col-xs-1 rowHeading cell">{headingLabel}</div>);

            // loop to add targetting coordinate gridCells
            gridCells.push(
               [1,2,3,4,5,6,7,8,9,10].map(num => <GridCell id={headingLabel + num} />)
            );

            // add row heading at end of row
            gridCells.push(<div className="col-xs-1 rowHeading cell">{headingLabel}</div>);
            
            // return array of divs for each row
            return gridCells;
         })
      );
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
import React, { Component } from 'react';
import './App.css';
import './style.css';

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
         shipsAlive: [], //cells of all ships not yet hit
         shipsHit: [], //hits on own grid
         shipAir: [], //5
         shipBat: [], //4
         shipDes: [], //3
         shipSub: [], //3
         shipPtrl: [], //2
         targetsHit: ["B3", "B4", "B5", "B6"], //offensive hits
         targetsMissed: ["H3", "H4", "I6"], //offensive misses
         wins: 0,
         losses: 0,
         isGameLive: false,
         currentBoard: "ships", // value is "ships" or "targets", indicating which board is active--defense or offense
         shipOrientation: "vertical",
         currentShip: "shipAir",
         currentShipCells: [],
         
      };
   }
   render() {
      return (
         <div>
            <Board 
               isGameLive={this.state.isGameLive} 
               currentBoard={this.state.currentBoard}
               shipOrientation={this.state.shipOrientation}
               currentShip={this.state.currentShip}
               currentShipCells={this.state.currentShipCells}
               shipsAlive={this.state.shipsAlive}
               shipsHit={this.state.shipsHit}
               targetsHit={this.state.targetsHit}
               targetsMissed={this.state.targetsMissed}
               updateCurrentShipCells={this.updateCurrentShipCells}
            />
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
   handleToggleAction = (element) => {
      switch (element.props.name) {
         case "board": 
            this.setState({currentBoard: element.props.value});
            break;
         case "orientation":
            this.setState({shipOrientation: element.props.value});
            break;
         case "ship":
            this.setState({currentShip: element.props.value});
            break;
         default: console.log("toggleBoard error: not a valid toggle name!");
      }
   }
   updateCurrentShipCells = (array) => {
      this.setState({currentShipCells: array});
   }
}

class Board extends Component {
   
   render() {
      return (
         <div>
            <div className="gameBoard container">
               <GridHeadings />
               <Grid 
                  isGameLive={this.props.isGameLive} 
                  currentBoard={this.props.currentBoard}
                  shipOrientation={this.props.shipOrientation}
                  currentShip={this.props.currentShip}
                  currentShipCells={this.props.currentShipCells}
                  shipsAlive={this.props.shipsAlive}
                  shipsHit={this.props.shipsHit}
                  targetsHit={this.props.targetsHit}
                  targetsMissed={this.props.targetsMissed}
                  updateCurrentShipCells={this.props.updateCurrentShipCells}
               />
               <GridHeadings />   
            </div>
         </div>
      );
   }/*
   static defaultProps = {
      currentShipCells: [""],
      shipAir: [""],
      shipBat: [""],
      shipDes: [""],
      shipSub: [""],
      shipPtral: [""],
      shipsAlive: [""],
      shipsHit: [""],
      targetsMissed: [""],
      targetsHit: [""]
   }*/
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
      this.props.toggleAction(this);
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
               [1,2,3,4,5,6,7,8,9,10].map(
                  num => 
                     <GridCell 
                        id={headingLabel + num}
                        isGameLive={this.props.isGameLive} 
                        currentBoard={this.props.currentBoard}
                        shipOrientation={this.props.shipOrientation}
                        currentShip={this.props.currentShip}
                        currentShipCells={this.props.currentShipCells}
                        shipsAlive={this.props.shipsAlive}
                        shipsHit={this.props.shipsHit}
                        targetsHit={this.props.targetsHit}
                        targetsMissed={this.props.targetsMissed}
                        updateCurrentShipCells={this.props.updateCurrentShipCells}
                     />
               )
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
   constructor(props){
      super(props);
      this.state = {
         //isHovered: false,
         classes: this.renderClasses(),
         currentShipCells: this.props.currentShipCells
      };
      this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
      this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
   }
   render() {
      return (
         <div
            className={this.state.classes}
            id={this.props.id}
            onMouseOver={this.handleOnMouseOver}
            onMouseOut={this.handleOnMouseOut}
            onClick={this.handleOnClick}
         ></div>
      );    
   }

   renderClasses = () => {     
      if (this.props.isGameLive) {
         return this.renderLiveClasses();
      }
      else {
         return this.renderSetupClasses();
      }
   }

   renderLiveClasses = () => {
      if ("ships"===this.props.currentBoard) {
         return this.renderLiveShipClasses();
      }
      else {
         return this.renderLiveTargetClasses();
      }
      
   }

   renderLiveShipClasses = () => {
      if (this.props.shipsAlive.includes(this.props.id)) {
         return "col-xs-1 gridCell cell cellShip";
      }
      else if (this.props.shipsHit.includes(this.props.id)) {
         return "col-xs-1 gridCell cell cellHit";
      }
      else {
         return "col-xs-1 gridCell cell";
      }
   }

   renderLiveTargetClasses = () => {
      if (this.props.targetsMissed.includes(this.props.id)) {
         return "col-xs-1 gridCell cell cellMissed";
      }
      else if (this.props.targetsHit.includes(this.props.id)) {
         return "col-xs-1 gridCell cell cellHit";
      }
      else {
         return "col-xs-1 gridCell cell";
      }
   }

   renderSetupClasses = () => {
      //code to calculate what cells are turned gray to represent possible ship placement
      if (this.props.shipsAlive.includes(this.props.id)) {
         return "col-xs-1 gridCell cell cellShip";
      }
      else if (this.props.currentShipCells.includes(this.props.id)) {
         return "col-xs-1 gridCell cell cellShipSelect"
      }
      else {
         return "col-xs-1 gridCell cell"
      }
   }

   renderTargetHighlight = () => {
      return "col-xs-1 gridCell cell cellTarget";
   }

   generateShipSelectArray = () => {
      // function to return array of cells indicating ship placement option
      // add a ton of functionality to update array with other cell IDs based on ship selected and orientation
      //this.props.currentShipCells.push(this.props.id);
   }

   handleOnMouseOver = () => {
      if ("targets"===this.props.currentBoard) {
         this.setState({classes: this.renderTargetHighlight()});
      }
      else if (!this.props.isGameLive) {
         this.generateShipSelectArray()
         this.props.updateCurrentShipCells(this.props.currentShipCells);
      }
   }
   handleOnMouseOut = () => {
      this.setState({classes: this.renderClasses()});
   }
   handleOnClick = () => {
      this.props.currentShipCells.push(this.props.id);
      this.props.updateCurrentShipCells(this.props.currentShipCells);
   }
}

export default App;
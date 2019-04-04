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
         targetsHit: [], //offensive hits
         targetsMissed: [], //offensive misses
         wins: 0,
         losses: 0,
         isGameLive: true,
         currentBoard: "ships", // value is "ships" or "targets", indicating which board is active--defense or offense
         shipOrientation: "vertical", // orientation of ship to be placed on board
         placeShip: "shipAir", // ship type currently selected to be placed on board
         placeShipCells: [], // array of cells showing where ship is to be placed
         placeShipCellsError: [], // array of cells showing where ship tries to be placed, but fails
         currentTargetCell: "" // string of cell ID player currently hovering over when selecting target to strike
      };
   }
   render() {
      return (
         <div>
            <Board
               isGameLive={this.state.isGameLive}
               currentBoard={this.state.currentBoard}
               shipsAlive={this.state.shipsAlive}
               shipsHit={this.state.shipsHit}
               targetsHit={this.state.targetsHit}
               targetsMissed={this.state.targetsMissed}
               placeShip={this.state.placeShip}
               placeShipCells={this.state.placeShipCells}
               placeShipCellsError={this.state.placeShipCellsError}
               currentTargetCell={this.state.currentTargetCell}
               updatePlaceShipCells={this.updatePlaceShipCells}
               mouseHoverAction={this.handleHoverEvent}
               mouseClickAction={this.handleClickEvent}
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
      this.updatePlaceShipCells([]);
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

   // hover methods
   handleHoverEvent = (cellId) => {
      const stateUpdate = (
         this.state.isGameLive
         ? this.handleHoverLive(cellId)
         : this.handleHoverSetup(cellId)
      );
      if (stateUpdate !== null) {
         this.setState(stateUpdate);
      }
   }
   handleHoverLive = (cellId) => {
      if ("targets"===this.state.currentBoard) {
         return this.handleHoverTargets(cellId);
      }
   }
   handleHoverTargets = (cellId) => {
      return (
         (!this.state.targetsHit.includes(cellId) && !this.state.targetsMissed.includes(cellId))
         ? {currentTargetCell: cellId}
         : {currentTargetCell: ""}
      );
   }
   handleHoverSetup = (cellId) => {

   }

   // method to set what cells render to indicate ship placement position
   updatePlaceShipCells = (cellId) => {
      let arr = [];
      // code to figure out what cells to render as potential ship placement

      this.setState({currentShipCells: arr});
   }

   // click methods
   handleClickEvent = (cellId) => {

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
                  shipsAlive={this.props.shipsAlive}
                  shipsHit={this.props.shipsHit}
                  targetsHit={this.props.targetsHit}
                  targetsMissed={this.props.targetsMissed}
                  placeShip={this.props.placeShip}
                  placeShipCells={this.props.placeShipCells}
                  placeShipCellsError={this.props.placeShipCellsError}
                  currentTargetCell={this.props.currentTargetCell}
                  mouseHoverAction={this.props.mouseHoverAction}
                  mouseClickAction={this.props.mouseClickAction}
               />
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
                  num => {
                     let cellId = headingLabel + num;
                     let classes = this.renderClasses(cellId);
                     return (
                        <GridCell 
                           id={cellId}
                           classes={classes}
                           mouseHoverAction={this.props.mouseHoverAction}
                           mouseClickAction={this.props.mouseClickAction}
                        />
                     );
                  }   
               )
            );

            // add row heading at end of row
            gridCells.push(<div className="col-xs-1 rowHeading cell">{headingLabel}</div>);
            
            // return array of divs for each row
            return gridCells;
         })
      );
   }

   renderClasses = (cellId) => {     
      if (this.props.isGameLive) {
         return this.renderLiveClasses(cellId);
      }
      else {
         return this.renderSetupClasses(cellId);
      }
   }

   renderLiveClasses = (cellId) => {
      if ("ships"===this.props.currentBoard) {
         return this.renderLiveShipClasses(cellId);
      }
      else {
         return this.renderLiveTargetClasses(cellId);
      }
      
   }

   renderLiveShipClasses = (cellId) => {
      if (this.props.shipsAlive.includes(cellId)) {
         return "col-xs-1 gridCell cell cellShip";
      }
      else if (this.props.shipsHit.includes(cellId)) {
         return "col-xs-1 gridCell cell cellHit";
      }
      else {
         return "col-xs-1 gridCell cell";
      }
   }

   renderLiveTargetClasses = (cellId) => {
      if (this.props.targetsMissed.includes(cellId)) {
         return "col-xs-1 gridCell cell cellMissed";
      }
      else if (this.props.targetsHit.includes(cellId)) {
         return "col-xs-1 gridCell cell cellHit";
      }
      else if (this.props.currentTargetCell===cellId) {
         return "col-xs-1 gridCell cell cellTarget";
      }
      else {
         return "col-xs-1 gridCell cell";
      }
   }

   renderSetupClasses = (cellId) => {
      //code to calculate what cells are turned gray to represent possible ship placement
      if (this.props.shipsAlive.includes(cellId)) {
         return "col-xs-1 gridCell cell cellShip";
      }
      else if (this.props.placeShipCells.includes(cellId)) {
         return "col-xs-1 gridCell cell cellPlaceShip"
      }
      else if (this.props.placeShipCellsError.includes(cellId)) {
         return "col-xs-1 gridCell cell cellPlaceShipError"
      }
      else {
         return "col-xs-1 gridCell cell"
      }
   }
}

class GridCell extends Component {
   render() {
      return (
         <div
            className={this.props.classes}
            id={this.props.id}
            onMouseEnter={this.handleOnMouseEnter}
            onClick={this.handleOnClick}
         ></div>
      );    
   }

   handleOnMouseEnter = () => {
      console.log("onMouseEnter");
      this.props.mouseHoverAction(this.props.id);
   }
   handleOnClick = () => {
      this.props.mouseClickAction(this.props.id);
   }
}

export default App;
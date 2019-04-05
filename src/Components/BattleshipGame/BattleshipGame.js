import React, {Component} from 'react';
import Board from '../Board/Board';
import GameToggles from '../GameToggles/GameToggles';
import ShipPlacement from './ShipPlacement';

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
         isGameLive: false,
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
               mouseExitAction={this.handleMouseLeaveEvent}
               mouseClickAction={this.handleClickEvent}
            />
            <br />
      {/*radios to select ships and ship orientation for placement, also radios to toggle between ships board and target board*/}
            <GameToggles 
               currentBoardState={this.state.currentBoard}
               shipOrientState={this.state.shipOrientation}
               placeShipState={this.state.placeShip}
               toggleAction={this.handleToggleAction}
            />   
         </div>
        
      );
   }
   
   // function to update states based on GameToggles selection
   handleToggleAction = (element) => {
      switch (element.props.name) {
         case "board": 
            this.setState({currentBoard: element.props.value});
            break;
         case "orientation":
            this.setState({shipOrientation: element.props.value});
            break;
         case "ship":
            this.setState({placeShip: element.props.value});
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
      // code for ship placement
      const shipPlacement = new ShipPlacement(this.state);
      this.setState(shipPlacement.selectPlaceShipCells(cellId, this.state));
   }

   // function to handle event when mouse cursor leaves GridCell: reset state values based on what is currently triggering render
   handleMouseLeaveEvent = () => {
      if (this.state.currentTargetCell.length) { // isGameLive: true, currentBoard: targets -> Player choosing strike targets
         this.setState({currentTargetCell: ""});
      }
      else if (this.state.placeShipCells.length) { //isGameLive: false, currentBoard: ships -> game setup
         this.setState({placeShipCells: ""});
      }
      else if (this.state.placeShipCellsError.length) { // isGameLive: false, currentBoard: ships -> game setup (invalid ship positions)
         this.setState({placeShipCellsError: ""});
      }
   }

   // click methods
   handleClickEvent = (cellId) => {

   }

   // function to set states for start of game
   startGame = () => {
      this.setState({
         isGameLive: true,
         placeShip: "",
         placeShipCells: [],
         placeShipCellsError: []
      });
   }
}

export default BattleshipGame;
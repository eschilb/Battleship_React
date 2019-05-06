import React, {Component} from 'react';
import Board from '../Board/Board';
import GameToggles from '../GameToggles/GameToggles';
import ShipPlacement from './ShipPlacement/ShipPlacement';
import Fleet from './Fleet/Fleet';

class BattleshipGame extends Component {
   constructor(props) {
      super(props);
      this.state = {
         player: 0,
         wins: 0,
         losses: 0,
         isGameLive: false,
         currentBoard: "ships", // value is "ships" or "targets", indicating which board is active--defense or offense
         fleet: this.createFleet(), // object containing all ship objects
         shipOrientation: "vertical", // orientation of ship to be placed on board
         placeShip: "shipAir", // ship type currently selected to be placed on board
         placeShipCells: [], // array of cells showing where ship is to be placed
         placeShipCellsError: [], // array of cells showing where ship tries to be placed, but fails
         targetsHit: [], //offensive hits
         targetsMissed: [], //offensive misses
         currentTargetCell: "", // string of cell ID player currently hovering over when selecting target to strike
      };
   }
   componentDidMount() {
      document.body.addEventListener("keydown", this.onkeyupSwitchOrientation);
   }

   componentWillUnmount() {
      document.body.removeEventListener("keydown", this.onkeyupSwitchOrientation);
   }

   render() {
      return (
         <div>
            <Board
               isGameLive={this.state.isGameLive}
               fleet={this.state.fleet}
               targetsHit={this.state.targetsHit}
               targetsMissed={this.state.targetsMissed}
               currentBoard={this.state.currentBoard}
               placeShip={this.state.placeShip}
               placeShipCells={this.state.placeShipCells}
               placeShipCellsError={this.state.placeShipCellsError}
               currentTargetCell={this.state.currentTargetCell}
               updatePlaceShipCells={this.updatePlaceShipCells}
               mouseHoverAction={this.handleHoverEvent}
               mouseExitAction={this.handleMouseLeaveEvent}
               mouseClickLive={this.handleClickEventLive}
               mouseClickSetup={this.handleClickEventSetup}
            />
            <br />
      {/*radios to select ships and ship orientation for placement, also radios to toggle between ships board and target board*/}
            <GameToggles
               fleet={this.state.fleet}
               currentBoardState={this.state.currentBoard}
               shipOrientState={this.state.shipOrientation}
               placeShipState={this.state.placeShip}
               toggleBoard={this.toggleBoard}
               toggleOrientation={this.toggleOrientation}
               toggleShip={this.toggleShip}

               // development specific
               isGameLiveState={this.state.isGameLive}
               toggleMode={this.toggleMode}
            />   
         </div>
        
      );
   }
   // function to create and return a Fleet object
   createFleet = () => {
      let obj = new Fleet();
      return obj;
   }

   // functions to update states based on GameToggles selection
   toggleBoard = (board) => {
      this.setState({currentBoard: board});
   }
   toggleOrientation = (orientation) => {
      this.setState({shipOrientation: orientation});
   }
   toggleShip = (ship) => {
      this.setState({placeShip: ship});
   }
   // function to toggle game mode -> strictly for development purposes
   toggleMode = (mode) => {
      this.setState({isGameLive: !"setup" === mode});
   }

   // function to toggle orientation with spacebar, during setup
   onkeyupSwitchOrientation = (event) => {
      if (32 === event.keyCode) {
         event.preventDefault(); // firefox has spacebar set to scroll -> bye, felicia
         if ("vertical" === this.state.shipOrientation) {
            this.setState({shipOrientation: "horizontal"});
         }
         else {
            this.setState({shipOrientation: "vertical"});
         }
      }
   }

   // hover methods
   handleHoverEvent = (cellId) => {
      const stateUpdate = (
         this.state.isGameLive
         ? this.hoverLive(cellId)
         : this.hoverSetup(cellId)
      );
      if (stateUpdate !== null && stateUpdate !== undefined) {
         this.setState(stateUpdate);
      }
   }
   hoverLive = (cellId) => {
      if ("targets"===this.state.currentBoard) {
         return this.hoverTargets(cellId);
      }
   }
   hoverTargets = (cellId) => {
      return (
         (!this.state.targetsHit.includes(cellId) && !this.state.targetsMissed.includes(cellId))
         ? {currentTargetCell: cellId}
         : {currentTargetCell: ""}
      );
   }
   hoverSetup = (cellId) => {
      // code for ship placement
      if (this.state.placeShip.length !== 0) {
         const shipPlacement = new ShipPlacement(this.state.fleet, this.state.shipOrientation, this.state.placeShip);
         this.setState(shipPlacement.selectPlaceShipCells(cellId));
      }
      else {
         return;
      }   
   }

   // function to handle event when mouse cursor leaves GridCell: reset state values based on what is currently triggering render
   handleMouseLeaveEvent = () => {
      if (this.state.currentTargetCell.length) { // isGameLive: true, currentBoard: targets -> Player choosing strike targets
         this.setState({currentTargetCell: ""});
      }
      else if (this.state.placeShipCells.length) { //isGameLive: false, currentBoard: ships -> game setup
         this.setState({placeShipCells: []});
      }
      else if (this.state.placeShipCellsError.length) { // isGameLive: false, currentBoard: ships -> game setup (invalid ship positions)
         this.setState({placeShipCellsError: []});
      }
   }

   // click methods
   // function to handle click event when game is live
   handleClickEventLive = (cellId) => {
      if (this.state.currentBoard === "targets") {
         // select cellId as target for strike
      }
   }
   // function to handle click event when game is in setup mode
   handleClickEventSetup = (cellId) => {
      const shipPlacement = new ShipPlacement(this.state.fleet, this.state.shipOrientation, this.state.placeShip);
      let updateState = shipPlacement.clickGridCell(cellId);
      console.log("updateState object:");
      console.log(updateState);
      if (updateState !== null && updateState !== undefined) {
         this.setState(updateState, this.readyGame);
      }
   }

   // function to ask user if they are ready to start game
   readyGame = () => {
      if (this.state.fleet.ships.size === 5) {
         if (window.confirm("Is your fleet ready to battle?")) {
            this.startGame();
         }
         else {
            alert("Please ready your fleet or click 'Ready' to begin.")
         }
      }
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
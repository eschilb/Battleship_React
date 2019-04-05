import React, {Component} from 'react';
import Board from '../Board/Board';
import GameToggles from '../GameToggles/GameToggles';

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
               mouseExitAction={this.handleMouseLeaveEvent}
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
      // code for ship placement
      // take cellId, based on ship, add cells to placeShipCells where ship would occupy if selected
      // --> will probably need to make new functions, one for each ship to evaluate what those cells are
      // make use of function convertNumberToLetter, convertLetterToNumber to calculate what cells to add and if they are still on the board
      // also need to check if cells are already occupied in shipsAlive, and if so, set as placeShipCellsError
   }

   handleMouseLeaveEvent = () => {
      this.setState({currentTargetCell: ""});
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
   convertNumberToLetter =  (num) => {
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
}

export default BattleshipGame;
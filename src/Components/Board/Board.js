import React, {Component} from 'react';
import GridHeadings from '../GridHeadings/GridHeadings';
import Grid from '../Grid/Grid';

class Board extends Component {
   
   render() {
      return (
         <div>
            <div className="gameBoard container">
               <GridHeadings />
               <Grid
                  isGameLive={this.props.isGameLive}
                  currentBoard={this.props.currentBoard}
                  fleet={this.props.fleet}
                  shipsHit={this.props.shipsHit}
                  targetsHit={this.props.targetsHit}
                  targetsMissed={this.props.targetsMissed}
                  placeShip={this.props.placeShip}
                  placeShipCells={this.props.placeShipCells}
                  placeShipCellsError={this.props.placeShipCellsError}
                  currentTargetCell={this.props.currentTargetCell}
                  mouseHoverAction={this.props.mouseHoverAction}
                  mouseExitAction={this.props.mouseExitAction}
                  mouseClickAction={this.props.mouseClickAction}
               />
               <GridHeadings />   
            </div>
         </div>
      );
   }
}

export default Board;
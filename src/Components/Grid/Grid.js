import React, {Component} from 'react';
import GridCell from '../GridCell/GridCell';

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
                           mouseExitAction={this.props.mouseExitAction}
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

export default Grid;
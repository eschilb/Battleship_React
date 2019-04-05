import React, {Component} from 'react';
import Toggle from '../Toggle/Toggle';

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

export default GameToggles;
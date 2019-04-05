import React, {Component} from 'react';

class GridCell extends Component {
   render() {
      return (
         <div
            className={this.props.classes}
            id={this.props.id}
            onMouseEnter={this.handleOnMouseEnter}
            onMouseLeave={this.handleOnMouseLeave}
            onClick={this.handleOnClick}
         ></div>
      );    
   }

   handleOnMouseEnter = () => {
      this.props.mouseHoverAction(this.props.id);
   }
   handleOnMouseLeave = () => {
      this.props.mouseExitAction();
   }
   handleOnClick = () => {
      this.props.mouseClickAction(this.props.id);
   }
}

export default GridCell;
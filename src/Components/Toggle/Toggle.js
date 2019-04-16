import React, {Component} from 'react';

class Toggle extends Component {
   render() {
      return (
         <input 
            type="radio" 
            className="radioBtn" 
            name={this.props.name} 
            value={this.props.value}
            onClick={this.handleToggleAction}
            checked={this.isChecked()}
            disabled={this.props.disabled}
         />
      );
   }
   handleToggleAction = () => {
      this.props.toggleAction(this.props.value);
   }
   isChecked = () => {
      if (!this.props.disabled && this.props.value===this.props.toggleState) {
         return true;
      }
      else {
         return false;
      }
   }
}

export default Toggle;
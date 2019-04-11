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
            checked={this.props.value===this.props.toggleState}
         />
      );
   }
   handleToggleAction = () => {
      this.props.toggleAction(this.props.value);
   }
}

export default Toggle;
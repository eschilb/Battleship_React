import React, {Component} from 'react';

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

export default GridHeadings;
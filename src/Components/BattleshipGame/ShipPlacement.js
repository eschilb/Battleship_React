class ShipPlacement  {

   constructor(stateObject) {
      this.states = stateObject;
   }

   /* HOVER EVENT functions */
   // function to set what and how cells render to indicate ship placement position
   selectPlaceShipCells = (cellId, stateObject) => {
      this.states = stateObject;
      let arr = this.generatePlaceShipCells(cellId); // array with which to update state.placeShipCells or state.placeShipCellsError
      arr = this.validateCellIds(arr); // replace invalid cellIds with empty string
      let placementValid = this.isPlaceShipValid(arr); // boolean to determine validity of ship placement position
      
      if (placementValid) {
         return {placeShipCells: arr};
      }
      else {
         return {placeShipCellsError: arr};
      }
   }

   // function to select cellIds for ship placement based on ship type selected
   generatePlaceShipCells = (cellId) => {
      switch (this.states.placeShip) {
         case "shipAir":
            return this.generateCellIds(cellId, 5);
         case "shipBat":
            return this.generateCellIds(cellId, 4);
         case "shipDes":
         case "shipSub":
            return this.generateCellIds(cellId, 3);
         case "shipPtrl":
            return this.generateCellIds(cellId, 2);
         default:
            console.log("Invalid placeShip " + this.states.placeShip + " or invalid cellId " + cellId );
      }
   }

   // function to select cellIds based on ship orientation
   generateCellIds = (cellId, arrSize) => {
      return (
         ("horizontal" === this.states.shipOrientation) 
         ? this.selectCellsHorizontal(cellId, arrSize) 
         : this.selectCellsVertical(cellId, arrSize)
      );
   }

   // function to get horizontal cellIds based on ship size
   selectCellsHorizontal = (cellId, arrSize) => {
      let arr = [cellId];
      switch (arrSize) {
         case 5:
            arr.push(this.selectCellRight(this.selectCellRight(cellId)));
         case 4:
            arr.push(this.selectCellLeft(this.selectCellLeft(cellId)));
         case 3:
            arr.push(this.selectCellRight(cellId));
         case 2:
            arr.push(this.selectCellLeft(cellId));
            break;
         default: 
            console.log("selectCellsHorizontal Exception: invalid cellId " + cellId + " and/or invalid arrSize " + arrSize);
      }
      return arr;
   }

   // function to get vertical cellIds based on ship size
   selectCellsVertical = (cellId, arrSize) => {
      let arr = [cellId];
      switch (arrSize) {
         case 5:
            arr.push(this.selectCellDown(this.selectCellDown(cellId)));
         case 4:
            arr.push(this.selectCellUp(this.selectCellUp(cellId)));
         case 3:
            arr.push(this.selectCellDown(cellId));
         case 2:
            arr.push(this.selectCellUp(cellId));
            break;
         default: 
            console.log("selectCellsVertical Exception: invalid cellId " + cellId + " and/or invalid arrSize " + arrSize);
      }
      return arr;
   }

   // function to return cell to left of cellId
   selectCellLeft = (cellId) => {
      if (""===cellId) {
         return "";
      }
      else if (1!=cellId.substring(1)) { // validate cellId is not in column 1
         return cellId.substring(0,1) + (parseInt(cellId.substring(1)) - 1);
      }
      return "";
   }
   // function to return cell to right of cellId
   selectCellRight = (cellId) => {
      if (""===cellId) {
         return "";
      }
      else if (10!=cellId.substring(1)) { // validate cellId is not in column 10
         return cellId.substring(0,1) + (parseInt(cellId.substring(1)) + 1);
      }
      return "";
   }
   // function to return cell above cellId
   selectCellUp = (cellId) => {
      if (""===cellId) {
         return "";
      }
      else if ("A"!==cellId.substring(0,1)) { // validate cellId is not in row A
         return String.fromCharCode((cellId.charCodeAt(0) - 1)) + cellId.substring(1);
      }
      return "";
   }
   // function to return cell under cellId
   selectCellDown = (cellId) => {
      if (""===cellId) {
         return "";
      }
      else if ("J"!==cellId.substring(0,1)) { // validate cellId is not in row J
         return String.fromCharCode((cellId.charCodeAt(0) + 1)) + cellId.substring(1);
      }
      return "";
   }

   // function to take array of cellIds and replace cellIds not in grid with empty strings
   validateCellIds = (arr) => {
      return arr.map( cellId => {
         if (!(/[A-J]/).test(cellId.substring(0,1))) { // verify start of cellId is letter A-J
            return "";
         }
         let num = cellId.substring(1);
         if (1>num || 10<num) { // verify that number portion of cellId is 1-10
            return "";
         }
         return cellId;
      });  
   }

   // function to determine if ship placement position is valid--within grid and not on top of already placed ships
   isPlaceShipValid = (arr) => {
      if (arr.includes("")) { // if array contains empty string value, invalid placement
         return false;
      }
      for (let i=0; i<arr.length; i++) {
         if (this.states.shipsAlive.includes(arr[i])) {
            return false;
         }
      }
      return true;
   }

   /* CLICK EVENT functions */
   // functions to return states to update and update values when on click event
   clickGridCell = (cellId) => {
      let arr = this.generatePlaceShipCells(cellId);
      let placementValid = this.isPlaceShipValid(arr);
      if (!placementValid) {
         alert("This is not a valid ship placement, ya dingus!");
      }    
      else {
         return this.generateStateUpdates(arr);
      }         
   }

   generateStateUpdates = (arr) => {
      let shipType = this.getShipName();
      let placeShipHere = window.confirm("Do you want to position your " + shipType + " here?");
      let shipsAlive = this.states.shipsAlive.slice();
      if (placeShipHere) {
         arr.map(cellId => {
            shipsAlive.push(cellId);
         });   
         let obj = JSON.parse("{\"shipsAlive\":\"\",\"" + this.states.placeShip + "\":\"\"}")
         obj["shipsAlive"] = shipsAlive;
         obj[this.states.placeShip] = arr;
         return obj;
      }
   }

   getShipName = () => {
      switch (this.states.placeShip) {
         case "shipAir":
            return "Aircraft Carrier";
         case "shipBat":
            return "Battleship";
         case "shipSub":
            return "Submarine";
         case "shipDes":
            return "Destroyer";
         case "shipPtrl":
            return "Patrol Boat";
         default: return;
      }
   }
}

export default ShipPlacement;
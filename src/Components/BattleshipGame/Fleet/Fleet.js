import Ship from '../Ship/Ship';

// Object of all ships in player's fleet
class Fleet {

   constructor(fleetObj = {ship: []}) {
      this.ships = new Map(fleetObj.ships); // Map containing ["shipType", {shipObj}] elements
   }
   
   // function to return true if shipType is already in fleet
   hasShip = (shipType) => {
      return this.ships.has(shipType);
   }

   // function to copy passed in Map to this.ships
   copyFleet = (shipsMap) => {
      this.ships = new Map(...shipsMap);
   }

   // function to add ship to fleet by key shipType with data shipObject
   addShip = (shipType, shipObject) => {
      this.ships.set(shipType, shipObject);
   }
   // // function to return copy of current fleet object
   // copyFleetObject = (fleetMaster) => {
   //    if (!fleetMaster instanceof Fleet) {
   //       console.log("copyFleetObject failed: param is not instanceOf Fleet");
   //       return {};
   //    }
   //    var fleet = this;
   //    fleet.activeKeys = fleetMaster.activeKeys;
   //    for (let key of fleet.activeKeys) {
   //       const shipObj = new Ship();
   //       shipObj.copyShipObject(fleetMaster[key]);
   //       fleet[key] = shipObj;
   //    }
   // }
   // function to return boolean indicating if fleet occupies given cellId
   isFleetHere = (cellId) => {
      let bool = false;
      this.ships.forEach( shipObj => {
         if (shipObj.isShipHere(cellId)) {
            bool = true;
         }
      });
      return bool;
      // var fleet = this;
      // for (let key of this.activeKeys) {
      //    if (fleet[key].isShipHere(cellId)) {
      //       return true;
      //    }
      // }
      // return false;
   }
   // function to return boolean indicating if fleet has been hit at given cellId
   isFleetHitHere = (cellId) => {
      let bool = false;
      this.ships.forEach( shipObj => {
         if (shipObj.isShipHitHere(cellId)) {
            bool = true;
         }
      });
      return bool;
   }
}

export default Fleet;
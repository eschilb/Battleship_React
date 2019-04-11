import Ship from '../Ship/Ship';

// Object of all ships in player's fleet
class Fleet {

   constructor() {
      this.numInstances = 1;
      this.shipAir = {};
      this.shipBat = {};
      this.shipSub = {};
      this.shipDes = {};
      this.shipPtrl = {};
      this.activeKeys = [];
   }
   
   // function to return true if shipType is already in fleet
   hasShip = (shipType) => {
      var fleet = this;
      return !(Object.keys(fleet[shipType]).length === 0);
   }

   // function to add ship to fleet by key shipType with data shipObject
   addShip = (shipType, shipObject) => {
      var fleet = this;
      fleet[shipType] = shipObject;
      this.activeKeys.push(shipType); // update list of activeKeys
   }
   // function to return copy of current fleet object
   copyFleetObject = (fleetMaster) => {
      if (!fleetMaster instanceof Fleet) {
         console.log("copyFleetObject failed: param is not instanceOf Fleet");
         return {};
      }
      var fleet = this;
      fleet.activeKeys = fleetMaster.activeKeys;
      for (let key of fleet.activeKeys) {
         const shipObj = new Ship();
         shipObj.copyShipObject(fleetMaster[key]);
         fleet[key] = shipObj;
      }
   }
   // function to return boolean indicating if fleet occupies given cellId
   isFleetHere = (cellId) => {
      var fleet = this;
      for (let key of this.activeKeys) {
         if (fleet[key].isShipHere(cellId)) {
            return true;
         }
      }
      return false;
   }
   // function to return boolean indicating if fleet has been hit at given cellId
   isFleetHitHere = (cellId) => {
      var fleet = this;
      for (let key of this.activeKeys) {
         if (fleet[key].isShipHitHere(cellId)) {
            return true;
         }
      }
      return false;
   }
}

export default Fleet;
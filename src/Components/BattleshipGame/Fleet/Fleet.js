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

   // function to return boolean indicating if fleet occupies given cellId
   isFleetHere = (cellId) => {
      for (let shipsItem of this.ships) {
         if (shipsItem[1].isShipHere(cellId)) {
            return true;
         }
      }
      return false;
   }
   // function to return key(placeShip) of Ship object that occupies given cellId
   whatShipIsHere = (cellId) => {
      for (let [shipKey,shipObj] of this.ships) {
         if (shipObj.isShipHere(cellId)) {
            return shipKey;
         }
      }
      return "";
   }
   // function to return boolean indicating if fleet has been hit at given cellId
   isFleetHitHere = (cellId) => {
      for (let shipsItem of this.ships) {
         if (shipsItem[1].isShipHitHere(cellId)) {
            return true;
         }
      }
      return false;
   }
}

export default Fleet;
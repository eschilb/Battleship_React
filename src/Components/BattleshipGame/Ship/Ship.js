class Ship {
   constructor(placeShip="", position=[]) {
      this.name = this.findName(placeShip);
      this.position = position;
      this.hits = [];
   }

   // // getters
   // getName = () => {
   //    return this.name;
   // }
   // getPosition = () => {
   //    return this.position;
   // }
   // getHits = () => {
   //    return this.hits;
   // }

   // // setters
   // setName = (name="") => {
   //    this.name = name;
   // }
   // setPosition = (position=[]) => {
   //    this.position = position;
   // }
   // setHits = (hits=[]) => {
   //    this.hits = hits;
   // }

   // // function that returns copy of current Ship object
   // copyShipObject = (shipMaster) => {
   //    if (!shipMaster instanceof Ship) {
   //       console.log("copyShipObject failed: param is not instanceOf Ship");
   //       return {};
   //    }
   //    this.name = shipMaster.name;
   //    this.position = shipMaster.position;
   //    this.hits = shipMaster.hits;
   //    this.isAlive = shipMaster.isAlive;
   // }
   // function to return name of ship by shipType({shipAir, shipBat, shipSub, shipDes, shipPtrl)
   findName = (shipType) => {
      switch (shipType) {
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
         default: return "Invalid shipType: " + shipType;
      }
   }
   // functiont to return boolean indicating if ship occupies given cellId
   isShipHere = (cellId) => {
      if (this.position.includes(cellId)) {
         return true;
      }
      else {
         return false;
      }
   }

   // function to return boolean indicating if ship is hit at given cellId
   isShipHitHere = (cellId) => {
      if (this.hits.includes(cellId)) {
         return true;
      }
      else {
         return false;
      }
   }

   // function to return boolean indicating if this ship is sunk
   isSunk = () => {
      if (this.position.length === this.hits.length) {
         return true;
      }
      else {
         return false;
      }
   }
   
}

export default Ship;
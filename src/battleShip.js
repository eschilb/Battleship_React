export const battleShip = {
   //variables
   player: 0,
   shipsHit: [], //hits on own grid
   shipsAll: [],
   shipAir: [], //5
   shipBat: [], //4
   shipDes: [], //3
   shipSub: [], //3
   shipPtrl: [], //2
   targetsHit: [], //offensive hits
   targetsMissed: [], //offensive misses
   wins: 0,
   losses: 0,
   currentBoard: "ships", // value is "ships" or "targets", indicating which board is active--defense or offense
   gameMode: "setup", // value is "setup" or "live", indicating if player is setting up board or if game has started

   // function to add cell coloring class to gridCell
   highlightCell: function (elementId) {
      if (battleShip.currentBoard==="ships") {
         if (battleShip.gameMode==="setup") {
            battleShip.highlightCellsByShip(elementId);
         }
      }
      else {
         document.getElementById(elementId).classList.add("target");
      }
   },

   // function to show player where ship will be placed
   highlightCellsByShip: function (elementId) {
      // need to add highlight to other ship cells, based on what ship is selected
      // will probably need new array variable indicating cells where ship will be placed
      document.getElementById(elementId).classList.add("cellShipOpt");
   },

   // function to remove cell coloring class to gridCell
   removeHighlight: function (elementId) {
      if (battleShip.currentBoard==="ships") {
         if (battleShip.gameMode==="setup") {
            battleShip.removeHighlightByShip(elementId);
         }
      }
      else {
         document.getElementById(elementId).classList.remove("target");
      }
   },

   // function to remove highlights on cells showing where ship will be placed
   removeHighlightByShip: function (elementId) {
      // need to incorporate loop that removes class from all cells indicating where ship will be placed
      // will probably need new array variable indicating cells where ship will be placed
      document.getElementById(elementId).classList.remove("cellShipOpt");
   },

   // function to switch between ships board and targets board
   toggleBoard: function (element) {
      battleShip.currentBoard = element.props.value;
   },

   // function to convert number to letter for row headings and coordinate IDs
   convertNumberToLetter: function(num) {
      switch(num) {
         case 1:
            return 'A';
            break;
         case 2:
            return 'B';
            break;
         case 3:
            return 'C';
            break;
         case 4:
            return 'D';
            break;
         case 5:
            return 'E';
            break;
         case 6:
            return 'F';
            break;
         case 7:
            return 'G';
            break;
         case 8:
            return 'H';
            break;
         case 9:
            return 'I';
            break;
         case 10:
            return 'J';
            break;
         default:
            return '';
      }
   }
}
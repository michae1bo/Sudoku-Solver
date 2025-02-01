'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();


  function letterToNumberCoordinate(coordinateLetter) {
    switch(coordinateLetter.toUpperCase()) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
      case "E":
        return 4;
      case "F":
        return 5;
      case "G":
        return 6;
      case "H":
        return 7;
      case "I":
        return 8;
      default:
        return -1;
    }
  }


  app.route('/api/check')
    .post((req, res) => {
      let response;
      let isValid = true;
      const puzzleString = req.body.puzzle;
      const coordinate = req.body.coordinate;
      const value = req.body.value;
      if(puzzleString && coordinate && value) {
        if (value.match(/^[1-9]+$/) !== null && parseInt(value) <= 9) {
          const validation = solver.validate(puzzleString);
          if (validation.isValid) {
            const x = coordinate[1] - 1;
            const y = letterToNumberCoordinate(coordinate[0]);
            console.log()
            if (x >= 0 && x <= 8 && y >= 0 && y <= 8 && coordinate.length === 2) {
              const reasonsForInvalid = [];
              if (!solver.checkRowPlacement(puzzleString, y, x, value)) {
                reasonsForInvalid.push('row');
                isValid = false;
              }
              if (!solver.checkColPlacement(puzzleString, y, x, value)) {
                reasonsForInvalid.push('column');
                isValid = false;
              }
              if (!solver.checkRegionPlacement(puzzleString, y, x, value)) {
                reasonsForInvalid.push('region');
                isValid = false;
              }
              if (isValid) {
                response = { valid: isValid };
              } else {
                response = { valid: isValid, conflict: reasonsForInvalid };
              }
            } else {
              response = { error: 'Invalid coordinate' };
            }
          } else {
            response = { error: validation.error };
          }
        } else {
          response = { error: 'Invalid value' };
        }

      } else {
        response = { error: 'Required field(s) missing' };
      }

      res.json(response);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzleInput = req.body.puzzle;
      let response;
      if (puzzleInput) {
        const validation = solver.validate(puzzleInput);
        if (validation.isValid) {
          if (solver.solve(puzzleInput)) {
            const solution = solver.solve(puzzleInput);
            response = { solution };
          } else {
            response = { error: "Puzzle cannot be solved" };
          }
        } else {
          response = { error: validation.error };
        }
      } else {
        response = { error: "Required field missing" };
      
      }
      res.json(response);
    });
};

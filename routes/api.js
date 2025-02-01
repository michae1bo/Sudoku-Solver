'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();


  app.route('/api/check')
    .post((req, res) => {
      res.json({});
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

const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const puzzleStrings = require('../controllers/puzzle-strings.js')
let solver;
let puzzlesAndSolutions;

suite('Unit Tests', () => {
    solver = new Solver();
    puzzlesAndSolutions = puzzleStrings.puzzlesAndSolutions;
    test('Logic handles a valid puzzle string of 81 characters', function() {
        assert.isTrue(solver.validate(puzzlesAndSolutions[0][0]).isValid);
    })
    test('Logic handles a puzzle string with invalid characters', function() {
        const falseCharacterPuzzle = 'q.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.isFalse(solver.validate(falseCharacterPuzzle).isValid);
    })
    test('Logic handles a puzzle string that is not 81 characters in length', function() {
        const shortPuzzle = '..9..5.1.85.4....2432....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.isFalse(solver.validate(shortPuzzle).isValid);
    })
    test('Logic handles a valid row placement', function() {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 0, '7'));
        })
    test('Logic handles an invalid row placement', function() {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 0, "1"));
    })
    test('Logic handles a valid column placement', function() {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'; 
        assert.isTrue(solver.checkColPlacement(puzzleString, 0, 0, '2'));
    })
    test('Logic handles an invalid column placement', function() {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'; 
        assert.isFalse(solver.checkColPlacement(puzzleString, 0, 0, '8'));
    })
    test('Logic handles a valid region (3x3 grid) placement', function() {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'; 
        assert.isTrue(solver.checkRegionPlacement(puzzleString, 0, 0, '1'));
    })
    test('Logic handles a invalid region (3x3 grid) placement', function() {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'; 
        assert.isFalse(solver.checkRegionPlacement(puzzleString, 0, 0, '2'));
    })
    test('Valid puzzle strings pass the solver', function() {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'; 
        assert.isNotFalse(solver.solve(puzzleString));
    })
    test('Invalid puzzle strings fail the solver', function() {
        const invalidPuzzleString = '..9..5.1.85.4....2432.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        assert.isFalse(solver.solve(invalidPuzzleString));
    })
    test('Solver returns the expected solution for an incomplete puzzle', function() {
        assert.equal(solver.solve(puzzlesAndSolutions[0][0]), puzzlesAndSolutions[0][1])
    })
});

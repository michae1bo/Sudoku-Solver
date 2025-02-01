class SudokuSolver {

  construct2DArray(puzzleString) {
    const puzzleArray = puzzleString.split('');
    const puzzleArray2D = [];
    let start = 0;
    let end = 8;
    for (let i = 0; i < (puzzleArray.length / 9); i++) {
      puzzleArray2D[i] = puzzleArray.slice(start, end + 1);
      start += 9;
      end += 9;
    }
    return puzzleArray2D;
  }

  validate(puzzleString) {
    let isValid = true;
    const sodokuRegex = /[1-9]|\./
    if (puzzleString.length !== 81) {
      isValid = false;
      console.error("string is not the right size");
    } else {
      const puzzleArray = puzzleString.split("");
      puzzleArray.forEach(element => {
        const match = element.match(sodokuRegex);
        if (match === null) {
          isValid = false;
          console.error(element, "is not a valid character");
        }
      });
      if (isValid) {
        const puzzleArray2D = this.construct2DArray(puzzleString);

        for (let x = 0; x < puzzleArray2D[0].length; x++) {
          for (let y = 0; y < puzzleArray2D.length; y++) {
            if(!this.checkRowPlacement(puzzleString, y, x, puzzleArray2D[y][x])) {
              isValid = false;
            }
            if(!this.checkColPlacement(puzzleString, y, x, puzzleArray2D[y][x])) {
              isValid = false;
            }
            if(!this.checkRegionPlacement(puzzleString, y, x, puzzleArray2D[y][x])) {
              isValid = false;
            }
          }
        }
      }
    }
    return isValid;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let isValid = true;
    const puzzleArray2D = this.construct2DArray(puzzleString);
    
    // check placement
    if (value !== ".") {
      for (let i = 0; i < puzzleArray2D.length; i++) {
        if (i === column) {
          continue;
        } else {
          if (puzzleArray2D[row][i] === value) {
            isValid = false;
            break;
          }
        }
      }
    }

    return isValid;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let isValid = true;
    const puzzleArray2D = this.construct2DArray(puzzleString);

    // check placement
    if (value !== ".") {
      for (let i = 0; i < puzzleArray2D.length; i++) {
        if (i === row) {
          continue;
        } else {
          if (puzzleArray2D[i][column] === value) {
            isValid = false;
            break;
          }
        }
      }
    }
    return isValid;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let isValid = true;
    const puzzleArray2D = this.construct2DArray(puzzleString);

    let maxColumn;
    let minColumn;
    let maxRow;
    let minRow;
    switch (column) {
      case 0:
      case 1:
      case 2:
        maxColumn = 2;
        minColumn =0;
        break;
      case 3:
      case 4:
      case 5:
        maxColumn = 5;
        minColumn = 3;
        break;
      case 6:
      case 7:
      case 8:
        maxColumn = 8;
        minColumn = 6;
        break;
    }
    switch (row) {
      case 0:
      case 1:
      case 2:
        maxRow = 2;
        minRow =0;
        break;
      case 3:
      case 4:
      case 5:
        maxRow = 5;
        minRow = 3;
        break;
      case 6:
      case 7:
      case 8:
        maxRow = 8;
        minRow = 6;
        break;
    }
    if (value !== ".") {
      for (let x = minColumn; x <= maxColumn; x++) {
        for (let y = minRow; y <= maxRow; y++) {
          if(y === row && x === column) {
            continue;
          } else {
            if (puzzleArray2D[y][x] === value) {
              isValid = false;
            }
          }
        }
      }
    }
    
    return isValid;
  }

  solve(puzzleString) {
    const potentialNumbers = {}
    const puzzleArray2D = this.construct2DArray(puzzleString);

    if (!puzzleString.includes('.')) {
      console.log(this.validate(puzzleString))
      console.log(puzzleString.length);
      console.log(puzzleString)
      return puzzleString;
    }

    for (let x = 0; x < puzzleArray2D[0].length; x++) {
      for (let y = 0; y < puzzleArray2D.length; y++) {
        if (puzzleArray2D[y][x] === ".") {
          potentialNumbers[`${y},${x}`] = []
          for (let i = 1; i <= 9; i++) {
            const potentialNumber = i.toString();
            let isPotentialNumber = true;
            if(!this.checkRowPlacement(puzzleString, y, x, potentialNumber)) {
              isPotentialNumber = false;
            }
            if(!this.checkColPlacement(puzzleString, y, x, potentialNumber)) {
              isPotentialNumber = false;
            }
            if(!this.checkRegionPlacement(puzzleString, y, x, potentialNumber)) {
              isPotentialNumber = false;
            }
            if (isPotentialNumber) {
              potentialNumbers[`${y},${x}`].push(potentialNumber );
            }
          }
          if (potentialNumbers[`${y},${x}`].length === 1) {
            puzzleArray2D[y][x] = potentialNumbers[`${y},${x}`][0];
          }
        }
      }
    }
    const newPuzzleArray = [];
    puzzleArray2D.forEach(row => {
      newPuzzleArray.push(row.join(""));
    })
    const newPuzzleString = newPuzzleArray.join('');
    return this.solve(newPuzzleString);
  }
}

module.exports = SudokuSolver;


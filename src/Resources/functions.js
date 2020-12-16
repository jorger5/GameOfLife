//this object has all the functions used in the Game Component

export const helperFunctions ={
    clearGridX : (gridLayout) => { //function used to reset the grid
        const rows=[];
        //iterate from 0 to numRows (set by user) and for each row, create numCols (also set by user)
        for (let i = 0; i < gridLayout[0]; i++) {
            //here we push to row Array using .from method, the length will be numCols and for each one
            //we map a value of 0 (dead cell state)
            rows.push(Array.from(Array(gridLayout[1]), () => 0 ));
        }
        return rows;
    },
    gridSize: ((rows = 50, cols = 30) => { //function used to resize the grid
        const size = [rows, cols];
        return size;
    }),
    countLiving : (grid, rows, cols, neighborsLoc, gridLayout) => { //function used to count alive neighbors
        return neighborsLoc.reduce((acc, [xCoord, yCoord]) => { //this takes the neighborsLoc Arr and returns a number to see how many are alive
          const row = (rows + xCoord + gridLayout[0]) % gridLayout[0]; //checks every row and col to get alive (1) or dead(0) status
          const col = (cols + yCoord + gridLayout[1]) % gridLayout[1]; // we do this with the modulus operator
          acc += grid[row][col];
          return acc;
        }, 0);
      },
    timeSet: (time) => { //function used to set the running time of each turn
        return time;
    }
};
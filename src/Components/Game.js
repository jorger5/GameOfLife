import React, { useState, useCallback, useRef } from 'react';
import {Container, Col,  Row} from 'reactstrap';
import produce from 'immer'; //to simplify state changing
import { helperFunctions } from '../Resources/functions'; //functions used in the Component
import GameStatus from './GameStatus';
import GameSizeButton from './GameSizeButton';
import GameCommandButton from './GameCommandButton';
import GameTitle from './GameTitle';
import GameTimeInput from './GameTimeInput';



//Initial values
let gridLayout = [50, 30]; //numRow, numCols
let speed = 1000;

//positions from which the cell looks for neighbors
const neighborsLoc = [
    [0, 1], //north
    [1, 1], //north-east
    [1, 0], //east
    [1, -1], //south-east
    [0, -1], //south
    [-1, -1], //south-west
    [-1, 0], //west
    [-1, 1] //northwest
];


//component starts here  
export const Game = () => {
    //useState Hook variables
    //to create grid, we use useState hook
    const [grid, setGrid] = useState(() => {
        return helperFunctions.clearGridX(gridLayout);
    });
    const [play, setPlay] = useState(false); //to set the play status
    const [autoTime, setAutoTime] = useState(speed); //to set game speed
    const [generation, setGeneration] = useState(0); //to view current generation

    //useRef to store the value of play and using it on autoGame func.
    //Refs values will be accessed and changed frequently.
    const playRef = useRef(play);
    playRef.current = play; 

    //idem for generations
    const genRef = useRef(generation);
    genRef.current = generation;

    //to initialize nextTurn command
    const nextTurn = () => {
        setPlay(true);
        if(play === false){
            playRef.current = true;
            console.log('Game initialized');
            autoGame();
        }
        setPlay(false);
        if(play) playRef.current = false;
    };

    //here are functions realated to game initialization and buttons commands

    const gameStart = () => {  //to start the gme
        setPlay(true);
        if(play === false){
            playRef.current = true;
            autoGame();
        }
    };

    const gameStop = () => {  //to stop the game
        setPlay(false);
        if(play) playRef.current = false;
    };

    const gameReset = () => {  //to reset the game
        setGrid(helperFunctions.clearGridX(gridLayout));
        setPlay(false);
        setGeneration(0);
    };
    const buttonClickedGrid = (rows, cols) => { //to resize the grid
        gridLayout = helperFunctions.gridSize(rows,cols);
        setGrid(helperFunctions.clearGridX(gridLayout));
        setPlay(false);
        setGeneration(0);
    };
    
    const inputChanged = e => {
        speed = helperFunctions.timeSet(e.target.value);
        setAutoTime(e.target.value);
    };

    //useCallback to run autoGame function only once
    const autoGame = useCallback(() => {
        //to ensure that the game stops, if the playRef is false we return the autoGame function
        if(playRef.current === false) {
            return;
        }
        
        setGrid(currentGrid => {  //changes the grid after looking out for neighbors.
            return produce(currentGrid, gridChanged => {
                for (let rowsIteration = 0; rowsIteration < gridLayout[0]; rowsIteration++) {
                    for (let colsIteration = 0; colsIteration < gridLayout[1]; colsIteration++) {
                        let livingNeighbors = helperFunctions.countLiving(currentGrid, rowsIteration, colsIteration, neighborsLoc, gridLayout);                              
                        if (currentGrid[rowsIteration][colsIteration] === 1 && (livingNeighbors < 2 || livingNeighbors > 3)){
                        gridChanged[rowsIteration][colsIteration] = 0;
                        }
                        if (currentGrid[rowsIteration][colsIteration] === 0 && livingNeighbors === 3) {
                        gridChanged[rowsIteration][colsIteration] = 1;
                        }
                    }
                }
            });
        });
        setGeneration(++genRef.current); //increases generation by one per turn
        setTimeout(autoGame, speed);

    },[]) //useCallback closes here, [] to run just once


    //return Statement starts here
    return (
        <Container className='justify-content-center'>
            {/* Title begins here */}
            <Row>
                <GameTitle />
                <GameTimeInput onChangeTime={(e)=> inputChanged(e)} />
            </Row>
            {/* Title ends here */}
            {/* Game status begins here */}
            <Row>
                <GameStatus playStatus={play} generationStatus={generation} autoTimeStatus={autoTime} statusType='turn'/>
            </Row>
            {/* Game status ends here */}
            {/* Control buttons start here */}
            <Row className='mb-4'>
                <GameCommandButton buttonAction={() => gameStart()} textToShow='Iniciar' buttonType='buttons-y' />
                <GameCommandButton buttonAction={() => gameStop()} textToShow='Detener' buttonType='buttons-y' />
                <GameCommandButton buttonAction={() => nextTurn()} textToShow='Siguiente Turno' buttonType='buttons-y' />
                <GameCommandButton buttonAction={() => gameReset()} textToShow='Reiniciar' buttonType='buttons-r' />
            </Row>
            {/* Control buttons end here */}
            {/* Grid begins here */}
            <Row> 
                <Col>        
                <div className='d-flex justify-content-center'>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridLayout[1]}, 20px)`,
                    columnGap: '5px',
                    rowGap: '5px'
                }}>
                    {/* this maps the grid's x and y coordinates */}
                    {grid.map ((rows, xCoord) =>
                        rows.map( (col, yCoord) => 
                        <div className='grid'
                            key={`${xCoord}-${yCoord}`}
                            onClick={()=>{
                                //produce() takes the argument of individual grid, copies it and then mutates it.
                                const newGrid = produce(grid, gridEdited => {
                                    //check if current cell at [xCoord][yCoord] is dead or alive, it toggles the value between them 
                                    gridEdited[xCoord][yCoord] ^= 1;
                                });
                                setGrid(newGrid);
                        }} 
                        style={{ 
                            width:20, 
                            height:20, 
                            border: 'solid 1px #62F6FF',
                            borderRadius: '100%', 
                            backgroundColor: grid[xCoord][yCoord] ? '#62F6FF' : ''}} />
                        ))}
                        </div>
                    </div>
                    </Col>
                </Row>
                {/* Grid Ends here */}
                {/* Grid Size Buttons Start Here */}
                <Col>
                    <Row style={{paddingTop:'35px', paddingBottom:'35px'}}>
                        <GameSizeButton changeGridSize={() => buttonClickedGrid(10,10)} textToShow='10 x 10'/>
                        <GameSizeButton changeGridSize={() => buttonClickedGrid(20,30)} textToShow='20 x 30'/>
                        <GameSizeButton changeGridSize={() => buttonClickedGrid(25,25)} textToShow='25 x 25'/>
                        <GameSizeButton changeGridSize={() => buttonClickedGrid(50,30)} textToShow='50 x 30'/>
                    </Row>
                </Col>
                {/* Grid Size Buttons End Here */}
        </Container>
    )
};



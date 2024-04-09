import React, { useState } from "react";
import { Box, Button, Grid, GridItem, Heading, Circle } from "@chakra-ui/react";

const BOARD_SIZE = 8;

const Index = () => {
  const [board, setBoard] = useState(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null)),
  );
  const [currentPlayer, setCurrentPlayer] = useState("black");

  const placePiece = (row, col) => {
    if (board[row][col]) return; // Cell is already occupied

    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;

    // Flip opponent's pieces
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    directions.forEach(([dx, dy]) => {
      let i = row + dx;
      let j = col + dy;
      const flipped = [];

      while (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE && newBoard[i][j] === getOpponentColor()) {
        flipped.push([i, j]);
        i += dx;
        j += dy;
      }

      if (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE && newBoard[i][j] === currentPlayer) {
        flipped.forEach(([x, y]) => {
          newBoard[x][y] = currentPlayer;
        });
      }
    });

    setBoard(newBoard);
    setCurrentPlayer(getOpponentColor());
  };

  const getOpponentColor = () => (currentPlayer === "black" ? "white" : "black");

  const startNewGame = () => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null)),
    );
    setCurrentPlayer("black");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Othello</Heading>
      <Grid templateColumns={`repeat(${BOARD_SIZE}, 1fr)`} gap={1} mb={4}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GridItem key={`${rowIndex}-${colIndex}`} bg="green.500" h="50px" display="flex" justifyContent="center" alignItems="center" onClick={() => placePiece(rowIndex, colIndex)}>
              {cell && <Circle size="40px" bg={cell} />}
            </GridItem>
          )),
        )}
      </Grid>
      <Button onClick={startNewGame}>Start New Game</Button>
    </Box>
  );
};

export default Index;

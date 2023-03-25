import React from 'react'
import { useGameState } from './GameState'
import { Log } from './Log'
import { Board } from './Board'
import { Row } from './Layout'

function Game() {
  const {
    gameState,
    current,
    xIsNext,
    jumpTo,
    winner,
    handleClick,
  } = useGameState()

  return (
    <Row gap={20}>
      <div>
        {
          winner
            ? `Winner ${winner}`
            : `Next Player ${xIsNext ? 'X': 'O'}`
        }
      </div>
      <Board board={current} onClick={handleClick} />
      <Log history={gameState.history} jumpTo={jumpTo} />
    </Row>
  )
}
export default Game
import React from 'react'

import { Board } from './Board'
import { useGameState } from './GameState'
import { Row } from './Layout'
import { Log } from './Log'

function Game() {
  const { gameState, current, xIsNext, jumpTo, winner, handleClick } = useGameState()

  return (
    <Row gap={20}>
      <div>{winner ? `Winner ${winner}` : `Next Player ${xIsNext ? 'X' : 'O'}`}</div>
      <Board board={current} onClick={handleClick} />
      <Log history={gameState.history} jumpTo={jumpTo} />
    </Row>
  )
}
export default Game

import * as React from 'react'
import { BoardState } from './GameState'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const CustomButton = styled(Button)({

}) as typeof Button

type LogProps = {
  history: BoardState[];
  jumpTo: (step: number) => void;
}

export function Log(props: LogProps) {
  return (
    <ol>
      {props.history.map((_, index) => {
        return (
          <li key={index}>
            <button onClick={() => props.jumpTo(index)}>
              Go to {index === 0 ? 'start' : `move #${index}`}
            </button>
          </li>
        );
      })}
    </ol>
  )
}

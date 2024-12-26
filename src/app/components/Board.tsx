import { useState } from 'react';
import Cell from './Cell';
import '../../assets/styles/Board.css';
import getBestMove from '../utils/algorithm';
import Message from './Message';

interface BoardProps {
  isPlaying: boolean;
  difficulty: number;
  stop: () => void;
}

const initialBoard = [
  [null, null, null, 'F', null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['H', null, 'H', null, 'H', null, 'H', null]
];

function Board ({ isPlaying, difficulty, stop }: BoardProps) {
  const [board, setBoard] = useState<(string | null)[][]>(initialBoard);

  const [activeCell, setActiveCell] = useState<(number | null)[]>([null, null]);
  const [currentMove, setCurrentMove] = useState<number>(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  const checkAvailableCell = (rowIndex: number, columnIndex: number) => {
    return activeCell[0] !== null && activeCell[1] !== null && activeCell[0]-1 === rowIndex && (activeCell[1]-1 === columnIndex || activeCell[1]+1 === columnIndex) && board[rowIndex][columnIndex] === null ? true : false;
  }

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (rowIndex === activeCell[0] && columnIndex === activeCell[1]) {
      setActiveCell([null, null]);
    } else if (board[rowIndex][columnIndex] === 'H') {
      setActiveCell([rowIndex, columnIndex]);
    }

    if (checkAvailableCell(rowIndex, columnIndex)) {
      const newBoard = board.map((row) => row.slice());
      newBoard[rowIndex][columnIndex] = 'H';
      newBoard[activeCell[0] as number][activeCell[1] as number] = null;
      setBoard(newBoard);
      setActiveCell([null, null]);
      setCurrentMove(currentMove+1);
    }
  }

  const restart = () => {
    setBoard(initialBoard);
    setCurrentMove(1);
    setWinner(null);
    setIsMessageVisible(false);
    setActiveCell([null, null]);
  }

  if (currentMove % 2 === 0 && isPlaying && !winner) {
    const foxMove = getBestMove(board, difficulty)?.to;
    if (foxMove) {
      const newBoard = board.map((row) => row.slice().map((cell) => cell === 'F' ? null : cell));
      newBoard[foxMove[0]][foxMove[1]] = 'F';
      setBoard(newBoard);
      setCurrentMove(currentMove+1);
    } else {
      setWinner('H');
      setIsMessageVisible(true);
    }
  }

  if (currentMove % 2 === 1 && isPlaying && !winner && board[board.length-1].indexOf('F') !== -1) {
    setWinner('F');
    setIsMessageVisible(true);
  }

  return (
    <div className='board-block'>
      <div className="board">
        {
          board.map((row, rowIndex) => row.map((state, columnIndex) => <Cell key={`${rowIndex} ${columnIndex}`} onClick={() => winner || handleCellClick(rowIndex, columnIndex)} state={state} order={rowIndex + columnIndex} isAvailable={checkAvailableCell(rowIndex, columnIndex)} />))
        }
      </div>
      <div className="buttons-block">
        <button className="button_restart" onClick={restart}>Restart</button>
        <button className="button_menu" onClick={stop}>Back to menu</button>
      </div>
      {
        isMessageVisible ?
          <Message winner={winner} closeMessage={() => setIsMessageVisible(false)}/>
        :
          null
      }
    </div>
  );
}

export default Board;
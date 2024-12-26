function isValidMove(board: (string | null)[][], toX: number, toY: number) {
  return toX >= 0 && toX < board.length && toY >= 0 && toY < board[0].length && board[toX][toY] === null;
}

function generateMoves(board: (string | null)[][], isFoxTurn: boolean) {
  const moves = [];
  const directions = isFoxTurn ? [[1, -1], [1, 1], [-1, -1], [-1, 1]] : [[-1, -1], [-1, 1]];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if ((isFoxTurn && board[i][j] === 'F') || (!isFoxTurn && board[i][j] === 'H')) {
        for (const [dx, dy] of directions) {
          const x = i + dx;
          const y = j + dy;
          if (isValidMove(board, x, y)) {
            moves.push({ from: [i, j], to: [x, y] });
          }
        }
      }
    }
  }

  return moves;
}

function makeMove(board: (string | null)[][], move: any) {
  const newBoard = board.map(row => row.slice());
  const [fromX, fromY] = move.from;
  const [toX, toY] = move.to;
  newBoard[toX][toY] = newBoard[fromX][fromY];
  newBoard[fromX][fromY] = null;
  return newBoard;
}

function evaluateBoard(board: (string | null)[][]) {
  const foxFreedom = generateMoves(board, true).length;
  const houndsFreedom = generateMoves(board, false).length;
  let foxPosition = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i].indexOf('F') !== -1) {
      foxPosition = Math.ceil(Math.min(board[i].indexOf('F'), board.length - board[i].indexOf('F')) + i/2);
    }
  }
  return foxFreedom - houndsFreedom + foxPosition;
}

function isGameOver(board: (string | null)[][]) {
  for (let i = 0; i < board[board.length - 1].length; i++) {
    if (board[board.length - 1][i] === 'F') return true;
  }

  return generateMoves(board, true).length === 0;
}

function alphaBeta(board: (string | null)[][], depth: number, alpha: number, beta: number, maximizingPlayer: boolean) {
  if (depth === 0 || isGameOver(board)) {
    return { score: evaluateBoard(board) };
  }

  const moves = generateMoves(board, maximizingPlayer);
  let bestMove = null;

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of moves) {
      const newBoard = makeMove(board, move);
      const evaluate = alphaBeta(newBoard, depth - 1, alpha, beta, false).score;
      if (evaluate > maxEval) {
        maxEval = evaluate;
        bestMove = move;
      }
      alpha = Math.max(alpha, evaluate);
      if (beta <= alpha) break;
    }
    return { score: maxEval, move: bestMove };
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      const newBoard = makeMove(board, move);
      const evaluate = alphaBeta(newBoard, depth - 1, alpha, beta, true).score;
      if (evaluate < minEval) {
        minEval = evaluate;
        bestMove = move;
      }
      beta = Math.min(beta, evaluate);
      if (beta <= alpha) break;
    }
    return { score: minEval, move: bestMove };
  }
}

function getBestMove(board: (string | null)[][], difficulty: number) {
  const depth = difficulty * 2;
  return alphaBeta(board, depth, -Infinity, Infinity, true).move;
}

export default getBestMove;
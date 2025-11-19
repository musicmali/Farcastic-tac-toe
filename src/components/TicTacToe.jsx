import { useState, useEffect } from 'react'
import './TicTacToe.css'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [isCPUThinking, setIsCPUThinking] = useState(false)

  // Check for winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  // Check if board is full
  const isBoardFull = (squares) => {
    return squares.every(square => square !== null)
  }

  // Check if a move would result in a win
  const wouldWin = (squares, player, index) => {
    const newSquares = [...squares]
    newSquares[index] = player
    return calculateWinner(newSquares) === player
  }

  // Get available moves
  const getAvailableMoves = (squares) => {
    return squares
      .map((square, index) => square === null ? index : null)
      .filter(index => index !== null)
  }

  // CPU move logic (easy difficulty)
  const getCPUMove = (squares) => {
    const availableMoves = getAvailableMoves(squares)
    
    // 1. Check if CPU can win (always take winning move)
    for (let i = 0; i < availableMoves.length; i++) {
      if (wouldWin(squares, 'O', availableMoves[i])) {
        return availableMoves[i]
      }
    }
    
    // 2. Check if player can win (always block)
    for (let i = 0; i < availableMoves.length; i++) {
      if (wouldWin(squares, 'X', availableMoves[i])) {
        return availableMoves[i]
      }
    }
    
    // 3. Easy difficulty: 25% optimal move, 75% random move
    const useOptimal = Math.random() < 0.25
    
    if (useOptimal) {
      // Use minimax for optimal move
      return getBestMove(squares, true).index
    } else {
      // Make a random move
      const randomIndex = Math.floor(Math.random() * availableMoves.length)
      return availableMoves[randomIndex]
    }
  }

  // Minimax algorithm (used for optimal moves)
  const getBestMove = (squares, isMaximizing) => {
    const winner = calculateWinner(squares)
    
    if (winner === 'O') return { score: 10, index: -1 }
    if (winner === 'X') return { score: -10, index: -1 }
    if (isBoardFull(squares)) return { score: 0, index: -1 }

    const moves = []
    
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        const newSquares = [...squares]
        newSquares[i] = isMaximizing ? 'O' : 'X'
        const result = getBestMove(newSquares, !isMaximizing)
        moves.push({ index: i, score: result.score })
      }
    }

    if (isMaximizing) {
      return moves.reduce((best, move) => 
        move.score > best.score ? move : best
      , { score: -Infinity, index: -1 })
    } else {
      return moves.reduce((best, move) => 
        move.score < best.score ? move : best
      , { score: Infinity, index: -1 })
    }
  }

  // Handle player move
  const handleClick = (index) => {
    if (board[index] || winner || gameOver || isCPUThinking) {
      return
    }

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsXNext(false)

    const newWinner = calculateWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setGameOver(true)
      return
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true)
      return
    }

    // CPU's turn
    setIsCPUThinking(true)
    setTimeout(() => {
      const cpuMoveIndex = getCPUMove(newBoard)
      const cpuBoard = [...newBoard]
      cpuBoard[cpuMoveIndex] = 'O'
      setBoard(cpuBoard)
      setIsXNext(true)
      setIsCPUThinking(false)

      const cpuWinner = calculateWinner(cpuBoard)
      if (cpuWinner) {
        setWinner(cpuWinner)
        setGameOver(true)
      } else if (isBoardFull(cpuBoard)) {
        setGameOver(true)
      }
    }, 500)
  }

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setGameOver(false)
    setIsCPUThinking(false)
  }

  // Get status message
  const getStatusMessage = () => {
    if (isCPUThinking) {
      return "CPU is thinking..."
    }
    if (winner) {
      return winner === 'X' ? '🎉 You Win!' : '😔 CPU Wins!'
    }
    if (gameOver) {
      return "It's a Draw!"
    }
    return isXNext ? "Your Turn (X)" : "CPU's Turn (O)"
  }

  // Render square
  const renderSquare = (index) => {
    return (
      <button
        className={`square ${board[index] ? `square-${board[index].toLowerCase()}` : ''}`}
        onClick={() => handleClick(index)}
        disabled={!!board[index] || winner || gameOver || isCPUThinking}
      >
        {board[index]}
      </button>
    )
  }

  return (
    <div className="tic-tac-toe">
      <h1 className="title">Tic-Tac-Toe</h1>
      <p className="subtitle">Play against the CPU (Easy Difficulty)</p>
      
      <div className="status">
        {getStatusMessage()}
      </div>

      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  )
}

export default TicTacToe


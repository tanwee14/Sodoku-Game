import React, { useState } from "react"
import "./App.css" // Assuming your CSS file is named App.css

const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

const App = () => {
  const [board, setBoard] = useState(initialPuzzle)
  const [selectedCell, setSelectedCell] = useState(null)

  const isInitialCell = (row, col) => initialPuzzle[row][col] !== 0

  const handleCellClick = (row, col) => {
    if (!isInitialCell(row, col)) {
      setSelectedCell([row, col])
    }
  }

  const handleNumberInput = (num) => {
    if (selectedCell) {
      const [row, col] = selectedCell
      const updatedBoard = board.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? num : c))
      )
      setBoard(updatedBoard)
    }
  }

  const handleClear = () => {
    if (selectedCell) {
      const [row, col] = selectedCell
      const updatedBoard = board.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? 0 : c))
      )
      setBoard(updatedBoard)
    }
  }

  const handleNewGame = () => {
    setBoard(initialPuzzle)
    setSelectedCell(null)
  }

  return (
    <div className="sudoku-container">
      <div className="sudoku-card">
        <div className="sudoku-header">
          <h1 className="sudoku-title">Sudoku Master</h1>
          <div className="sudoku-stats">
            <span className="sudoku-badge">Mistakes: 0</span>
          </div>
        </div>

        <div className="sudoku-content">
          {/* Game Board */}
          <div className="sudoku-board">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isInitial = initialPuzzle[rowIndex][colIndex] !== 0
                const isSelected =
                  selectedCell &&
                  selectedCell[0] === rowIndex &&
                  selectedCell[1] === colIndex
                let cellClass = "sudoku-cell"
                if (isInitial) cellClass += " sudoku-cell-initial"
                if (isSelected) cellClass += " sudoku-cell-selected"
                if (colIndex % 3 === 2 && colIndex !== 8) cellClass += " sudoku-cell-border-right"
                if (rowIndex % 3 === 2 && rowIndex !== 8) cellClass += " sudoku-cell-border-bottom"

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={cellClass}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    disabled={isInitial}
                  >
                    {cell !== 0 ? cell : ""}
                  </button>
                )
              })
            )}
          </div>

          {/* Number Pad */}
          <div className="sudoku-numpad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button key={num} className="sudoku-numpad-button" onClick={() => handleNumberInput(num)}>
                {num}
              </button>
            ))}
            <button className="sudoku-numpad-button sudoku-clear-button" onClick={handleClear}>
              Clear
            </button>
          </div>

          {/* Action Buttons */}
          <div className="sudoku-actions">
            <button className="sudoku-action-button">
              <svg className="sudoku-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Hint
            </button>
            <button className="sudoku-action-button" onClick={handleNewGame}>
              <svg className="sudoku-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              New Game
            </button>
          </div>

          {/* Instructions */}
          <div className="sudoku-instructions">
            <p>Click on an empty cell and use the number pad to fill it.</p>
            <p>Each row, column, and 3×3 box must contain digits 1-9.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

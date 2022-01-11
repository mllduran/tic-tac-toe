import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      undoHistory: [],
      xIsNext: true
    };
  }

  handleTurnClick(i) {
    const squares = this.state.history[0].slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X':'O';

    this.setState({
      history: [squares, ...this.state.history],
      xIsNext: !this.state.xIsNext
    });
  }

  handleRestartClick() {
    this.setState({
      history: [Array(9).fill(null)],
      undoHistory: [],
      xIsNext: true
    });
  }

  handleUndoClick() {
    if (this.state.history.length <= 1) {
      return;
    }

    const undoMove = this.state.history.slice(1);

    this.setState({
      history: [...undoMove],
      undoHistory: [this.state.history[0], ...this.state.undoHistory],
      xIsNext: !this.state.xIsNext
    })
  }

  handleRedoClick() {
    if (this.state.undoHistory.length <= 0) {
      return;
    }

    const undoHistory = [...this.state.undoHistory];

    this.setState({
      history: [undoHistory[0], ...this.state.history],
      undoHistory: [...this.state.undoHistory.splice(1)],
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const winner = calculateWinner(this.state.history[0]);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board key="board" makeTurn={(i) => this.handleTurnClick(i)} history={this.state.history} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button onClick={() => this.handleRestartClick()}>Restart</button>
          <button onClick={() => this.handleUndoClick()}>Undo</button>
          <button onClick={() => this.handleRedoClick()}>Redo</button>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X':'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  handleRestartClick() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true
    })
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  renderBoard() {
    const board = [];
    let squares = [];
    for (let i = 0; i < 9; i++) {
      squares.push(this.renderSquare(i));
      if ((i + 1) % 3 === 0) {
        board.push(<div className="board-row"> {squares} </div>);
        squares = [];
      }
    }
    return board;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <button onClick={() => this.handleRestartClick()}>Restart</button>
        <div className="status">{status}</div>
        {this.renderBoard()}
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

export default Board;
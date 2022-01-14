import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.history[i]}
      onClick={() => this.props.makeTurn(i)}
    />;
  }

  renderBoard() {
    const row = this.props.row;
    const column = this.props.column;

    const board = [];
    let squares = [];

    for (let i = 0; i < (row*column); i++) {
      squares.push(this.renderSquare(i));
      if ((i + 1) % row === 0) {
        board.push(<div key={i} className="board-row"> {squares} </div>);
        squares = [];
      }
    }

    return board;
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
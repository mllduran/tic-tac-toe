import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.history[0][i]}
      onClick={() => this.props.makeTurn(i)}
    />;
  }

  renderBoard() {
    const board = [];
    let squares = [];

    for (let i = 0; i < 9; i++) {
      squares.push(this.renderSquare(i));
      if ((i + 1) % 3 === 0) {
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
import React, { createFactory } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function Square(props) {
  return (
    <button onClick={() => props.onClick()} className="square">
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      next: true
    };
  }
  handleClick(i) {
    const r = this.state.squares.slice();
    let winner = calculateWinner(this.state.squares);
    if (r[i] === null && winner == null) {
      r[i] = this.state.next ? "x" : "o";
      this.setState({ squares: r, next: !this.state.next });
    }
  }
  renderSquare(i) {
    return (
      <Square
        onClick={() => this.handleClick(i)}
        value={this.state.squares[i]}
      />
    );
  }
  render() {
    let winner = calculateWinner(this.state.squares);
    let status;
    if (winner == null) {
      status = "Next player: " + (this.state.next ? "x" : "o");
    } else {
      status = "Winner: " + winner;
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  let winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  for (let i = 0; i < winLines.length; i++) {
    let [a, b, c] = winLines[i];
    if (
      squares[a] != null &&
      squares[a] == squares[b] &&
      squares[a] == squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

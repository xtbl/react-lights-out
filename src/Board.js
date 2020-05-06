import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {board: this.createBoard()};
    // this.setState({board: this.createBoard()});
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    const newBoard = [...Array(this.props.nrows)].map((row) => {
      return [...Array(this.props.ncols)].map((cell) => {
        const getRandomLitState = (Math.floor(Math.random() * 2));
        return !!getRandomLitState;
        // return <Cell isLit={true}/}
      });
    });
    console.log(newBoard);
    return newBoard;
    // return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    //flipcells around
    function flipCellsAround(y, x) {
      const north = {x: x - 1, y: y};
      const south = {x: x + 1, y: y};
      const east = {x: x, y: y - 1};
      const west = {x: x, y: y + 1};

      flipCell(north.y, north.x);
      flipCell(south.y, south.x);
      flipCell(east.y, east.x);
      flipCell(west.y, west.x);
    }

    flipCell(y, x);
    flipCellsAround(y, x);


    // win when every cell is turned off
    // TODO: determine is the game has been won
    const isOff = (cell) => cell === false;
    const hasWon = board[x].every(isOff) && board[y].every(isOff);
    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else
    // make table board


    const graphicBoard = this.state.board.map((row, rowIndex) => {
      const mappedRow = row.map((cell, cellIndex) => {
        const cellKey = `${rowIndex}-${cellIndex}`;
        return <Cell key={cellKey} isLit={cell} flipCellsAroundMe={this.flipCellsAround.bind(this, cellKey)}/>;
      });

      return <tr>{mappedRow}</tr>;
    });

    let gameDisplay;

    if(this.state.hasWon) {
      gameDisplay = <h1>You win!</h1>
    } else {
      gameDisplay = <table className="Board">
        <tbody>
        {graphicBoard}
        </tbody>
      </table>
    }

    return (
      <div>
        {gameDisplay}
      </div>
    )
  }
}


export default Board;

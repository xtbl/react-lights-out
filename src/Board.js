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
    this.createBoard();
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

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    // get number of trs, put a row list on each one
      // get each row from board
      // get all items from that row
      // put tr tags around that cell list
    const board = this.createBoard();
    const makeFirstRow = <tr> {board[0].map((cell) => <Cell isLit={cell}/>)}</tr>;
    const makeSecondRow = <tr> {board[1].map((cell) => <Cell isLit={cell}/>)}</tr>;

    const builtBoard = board.map((row, rowIndex) => {
      const mappedRow = row.map((cell, cellIndex) => {
        const cellKey = `${rowIndex}-${cellIndex}`;
        return <Cell key={cellKey} isLit={cell}/>;
      });

      return <tr>{mappedRow}</tr>;
    });

    // TODO
    return (
      <table className="Board">
        <tbody>
        {builtBoard}
        </tbody>
      </table>
    )
  }
}


export default Board;

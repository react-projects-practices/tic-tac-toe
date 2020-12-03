import React from 'react';
import './Board.css';

class Board extends React.Component {
    render() {
        const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const highlighted = this.props.highlighted;
        return (
            <div>
                {
                    board.map((row, i) => (
                        <div className="board-row" key={i}>
                            {
                                row.map((col, j) => (
                                    <Square 
                                        key={j}
                                        value={this.props.squares[col]} 
                                        isHighligthed={highlighted.includes(col)}
                                        onClick={() => this.props.onClick(col)}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}

function Square(props) {
    return (
        <button className={`square ${props.isHighligthed ? "highlighted" : ""}`} onClick={ props.onClick }>
            {props.value}
        </button>
    );
}

export default Board;
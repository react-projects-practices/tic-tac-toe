import React from 'react';
import Board from '../board/Board';
import './Game.css';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                playedSquare: 0
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const result = this.calculateWinner(squares);
        if(result || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                playedSquare: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
                return { winner: squares[a], label: 'Winner: ' + squares[a], squares: lines[i]};
        }
    
        if(squares.indexOf(null) === -1)
            return { winner: null, label: 'Draw', squares: []};
    
        return null;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const result = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const playedRow = Math.floor(history[move].playedSquare / 3) + 1;
            const playedCol = Math.floor(history[move].playedSquare % 3) + 1;
            const active = move === this.state.stepNumber;
            const desc = move ? 
                'Go to move #' + move  + ' : (' + playedRow + ', ' + playedCol + ')'
                : 'Go to game start';
            return (
                <li key={move} >
                    <button className={` ${active ? "active" : ""}`} onClick={() => this.jumpTo(move)}> 
                        {desc} 
                    </button>
                </li>
            );
        })

        let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        let highlighted = [];
        if(result) {
            status = result.label;
            highlighted = result.squares;
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        highlighted={highlighted}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
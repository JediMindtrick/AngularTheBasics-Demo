angular.module('GameMechanic', [])
.service('mechanics', [function () {

    var gameTemplate = {
        isActive: true,
        players: {
            player1: 'Unknown',
            player2: 'Unknown'
        },
        board: [
            ['?', '?', '?'],
            ['?', '?', '?'],
            ['?', '?', '?']
        ],
        currentPlayer: 'Unknown',
        whoami: 'Unknown'
    };

    var _endTurn = function(game){
    
        if (game.whoami === game.players.player1) {

            game.currentPlayer = game.players.player2;
            game.whoami = game.players.player2;

        } else {

            game.currentPlayer = game.players.player1;
            game.whoami = game.players.player1;
        }

        var winnerIs = _score(game.board);
        if (winnerIs !== '?') {
            alert('Game Won By: ' + winnerIs);
        }

        return game;
    };

    var rowWonBy = function (board) {
        var wonBy = '?';
        _.each(board, function (row) {

            var won = row[0] === '?' ?
                false :
                _.all(row, function (cell) {
                    return cell === row[0];
                });

            if (won) {
                wonBy = row[0];
            }
        });
        return wonBy;
    };

    var _score = function (board) {
        var wonBy = rowWonBy(board); //check horizontals first

        if (wonBy === '?') { //check verticals
            wonBy = rowWonBy([
                [board[0][0], board[1][0], board[2][0]],
                [board[0][1], board[1][1], board[2][1]],
                [board[0][2], board[1][2], board[2][2]]
            ]);
        }

        if (wonBy === '?') { //check diagonals
            wonBy = rowWonBy([
                [board[0][0], board[1][1], board[2][2]],
                [board[0][2], board[1][1], board[2][0]]
            ]);
        }

        return wonBy;
    };

    var _getSigil = function (game) {
        return game.whoami === game.players.player1 ? 'X' : 'O';
    };

    var _myTurn = function (game) {
        return game.whoami === game.currentPlayer;
    };

    return {
        getNewGame: function (playa) {
            var toReturn = JSON.parse(JSON.stringify(gameTemplate));

            toReturn.players.player1 = playa;
            toReturn.whoami = playa;
            toReturn.currentPlayer = playa;

            return toReturn;
        },
        score: _score,
        getSigil: _getSigil,
        endTurn: _endTurn,
        myTurn: _myTurn
    };
}])

;
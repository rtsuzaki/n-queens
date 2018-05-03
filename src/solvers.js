/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = undefined;
  
  var board = new Board({n: n});
  
  for ( var i = 0; i < n; i++ ) {
    for ( var j = 0; j < n; j++ ) {
      board.togglePiece(i, j);
      if ( board.hasAnyRooksConflicts() ) {
        board.togglePiece(i, j);
      }
    }
  }
  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solvedBoards = [];

  for ( var r = 0; r < n; r++ ) {
    for ( var c = 0; c < n; c++ ) {

      var board = new Board({n: n});
      board.togglePiece(r, c);
      console.log(r, c);
      for ( var i = 0; i < n; i++ ) {
        for ( var j = 0; j < n; j++ ) {
          if ( board.get(i)[j] === 0 ) {
            board.togglePiece(i, j);
          }
          if ( board.hasAnyRooksConflicts() ) {
            board.togglePiece(i, j);
          }
        }
      }  

      var numPieces = _.reduce(board.rows(), function(memo, row) {
        return memo + _.reduce(row, function(memo, col) {
          return memo + col;
        }, 0);
      }, 0);

      if ( numPieces === n ) {
        var strBoard = JSON.stringify( board.rows() );
        if ( !_.contains(solvedBoards, strBoard) ) {
          solvedBoards.push(strBoard);
          solutionCount++;
        }
      }
      
    }
  }

  console.log(solvedBoards);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

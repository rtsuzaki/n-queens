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
  var board = new Board({n: n});
  
  // /* this works, but kills the browser quite quickly */
  // var rockPaperScissors = function ( collection, roundsOfPlay ) {
  //   roundsOfPlay = roundsOfPlay || 3;
  //   let permutations = [];
  
  //   let recurse = function( roundsOfPlay, sequence ) {
  //     if ( roundsOfPlay === 0 ) {
  //       permutations.push( sequence );
  //       return;
  //     } else {
  //       for ( var i = 0; i < collection.length; i++ ) {
  //         recurse( roundsOfPlay - 1, sequence.concat( [ collection[i] ] ) );
  //       }
  //     }
  //   }
  //   recurse( roundsOfPlay, [] );
  //   return permutations;
  // }
  
  // var row = rockPaperScissors( [ 0, 1], n );
  // var rows = rockPaperScissors( row, n );

  // solutionCount = rows.reduce( function(memo, b) {
  //   var board = new Board(b);
  //   if ( !board.hasAnyRooksConflicts() ) {
  //     if ( board.tally() === n ) {
  //       return memo + 1;      
  //     }
  //   }
  //   return memo;
  // }, 0);

  var evaluate = function( row ) {
    if ( row === n ) {
      solution = solutionCount++;
      return;
    }

    for ( var col = 0; col < n; col++ ) {
      board.togglePiece( row, col );
      if ( !board.hasAnyRooksConflicts() ) {
        evaluate( row + 1);
      }
      board.togglePiece( row, col );
    }
  };
  evaluate(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var board = new Board({n: n});
  var solution = board.rows();

  var evaluate = function( row ) {
    if ( row === n ) {
      solution = _.map(board.rows(), function(row) {
        return row.slice();
      });
      return;
    }

    for ( var col = 0; col < n; col++ ) {
      board.togglePiece( row, col );
      if ( !board.hasAnyQueensConflicts() ) {
        evaluate( row + 1);
      }
      board.togglePiece( row, col );
    }
  };
  evaluate(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n: n});
  var solution = board.rows();

  var evaluate = function( row ) {
    if ( row === n ) {
      solution = solutionCount++;
      return;
    }

    for ( var col = 0; col < n; col++ ) {
      board.togglePiece( row, col );
      if ( !board.hasAnyQueensConflicts() ) {
        evaluate( row + 1);
      }
      board.togglePiece( row, col );
    }
  };
  evaluate(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

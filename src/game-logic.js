(function attachSnakeLogic(global) {
  var DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  function createPosition(x, y) {
    return { x: x, y: y };
  }

  function samePosition(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function isOppositeDirection(current, next) {
    var currentVector = DIRECTIONS[current];
    var nextVector = DIRECTIONS[next];

    return (
      currentVector.x + nextVector.x === 0 &&
      currentVector.y + nextVector.y === 0
    );
  }

  function listOpenCells(gridSize, snake) {
    var cells = [];
    var x;
    var y;

    for (y = 0; y < gridSize; y += 1) {
      for (x = 0; x < gridSize; x += 1) {
        var cell = createPosition(x, y);
        var occupied = snake.some(function (segment) {
          return samePosition(segment, cell);
        });

        if (!occupied) {
          cells.push(cell);
        }
      }
    }

    return cells;
  }

  function pickFoodPosition(gridSize, snake, randomIndex) {
    var openCells = listOpenCells(gridSize, snake);

    if (openCells.length === 0) {
      return null;
    }

    var index = randomIndex(openCells.length);
    return openCells[index];
  }

  function defaultRandomIndex(length) {
    return Math.floor(Math.random() * length);
  }

  function createInitialState(options) {
    var gridSize = options.gridSize || 16;
    var center = Math.floor(gridSize / 2);
    var snake = [
      createPosition(center, center),
      createPosition(center - 1, center),
      createPosition(center - 2, center)
    ];
    var food = pickFoodPosition(
      gridSize,
      snake,
      options.randomIndex || defaultRandomIndex
    );

    return {
      gridSize: gridSize,
      snake: snake,
      direction: "right",
      nextDirection: "right",
      food: food,
      score: 0,
      isGameOver: false,
      hasWon: false
    };
  }

  function setDirection(state, direction) {
    if (!DIRECTIONS[direction]) {
      return state;
    }

    if (isOppositeDirection(state.direction, direction) && state.snake.length > 1) {
      return state;
    }

    return Object.assign({}, state, {
      nextDirection: direction
    });
  }

  function stepGame(state, options) {
    if (state.isGameOver || state.hasWon) {
      return state;
    }

    var randomIndex = (options && options.randomIndex) || defaultRandomIndex;
    var direction = state.nextDirection;
    var vector = DIRECTIONS[direction];
    var nextHead = createPosition(
      state.snake[0].x + vector.x,
      state.snake[0].y + vector.y
    );
    var hitWall =
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.x >= state.gridSize ||
      nextHead.y >= state.gridSize;

    if (hitWall) {
      return Object.assign({}, state, {
        direction: direction,
        isGameOver: true
      });
    }

    var willEat = state.food && samePosition(nextHead, state.food);
    var nextSnake = [nextHead].concat(state.snake);

    if (!willEat) {
      nextSnake.pop();
    }

    var hitsSelf = nextSnake.slice(1).some(function (segment) {
      return samePosition(segment, nextHead);
    });

    if (hitsSelf) {
      return Object.assign({}, state, {
        direction: direction,
        isGameOver: true
      });
    }

    var nextFood = state.food;
    var score = state.score;
    var hasWon = false;

    if (willEat) {
      score += 1;
      nextFood = pickFoodPosition(state.gridSize, nextSnake, randomIndex);
      hasWon = nextFood === null;
    }

    return {
      gridSize: state.gridSize,
      snake: nextSnake,
      direction: direction,
      nextDirection: direction,
      food: nextFood,
      score: score,
      isGameOver: false,
      hasWon: hasWon
    };
  }

  global.SnakeGameLogic = {
    DIRECTIONS: DIRECTIONS,
    createInitialState: createInitialState,
    listOpenCells: listOpenCells,
    pickFoodPosition: pickFoodPosition,
    setDirection: setDirection,
    samePosition: samePosition,
    stepGame: stepGame
  };
})(window);

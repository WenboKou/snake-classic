(function runTests() {
  var logic = window.SnakeGameLogic;
  var results = document.getElementById("results");
  var tests = [];

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  function addTest(name, fn) {
    tests.push({ name: name, fn: fn });
  }

  function renderResult(name, passed, error) {
    var line = document.createElement("p");
    line.textContent = passed ? "PASS: " + name : "FAIL: " + name + " - " + error.message;
    line.className = passed ? "value" : "label";
    results.appendChild(line);
  }

  addTest("movement advances the head in the current direction", function () {
    var state = logic.createInitialState({ gridSize: 8 });
    var next = logic.stepGame(state, { randomIndex: function () { return 0; } });

    assert(next.snake[0].x === state.snake[0].x + 1, "head should move right");
    assert(next.snake[0].y === state.snake[0].y, "row should stay the same");
    assert(next.snake.length === state.snake.length, "snake should keep its length");
  });

  addTest("eating food grows the snake and increments score", function () {
    var state = {
      gridSize: 8,
      snake: [{ x: 3, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 }],
      direction: "right",
      nextDirection: "right",
      food: { x: 4, y: 3 },
      score: 0,
      isGameOver: false,
      hasWon: false
    };
    var next = logic.stepGame(state, { randomIndex: function () { return 0; } });

    assert(next.score === 1, "score should increase");
    assert(next.snake.length === 4, "snake should grow by one");
    assert(!(next.food.x === 4 && next.food.y === 3), "food should respawn elsewhere");
  });

  addTest("wall collision ends the game", function () {
    var state = {
      gridSize: 4,
      snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],
      direction: "right",
      nextDirection: "right",
      food: { x: 0, y: 0 },
      score: 0,
      isGameOver: false,
      hasWon: false
    };
    var next = logic.stepGame(state);

    assert(next.isGameOver === true, "state should be game over");
  });

  addTest("self collision ends the game", function () {
    var state = {
      gridSize: 6,
      snake: [
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 1, y: 3 },
        { x: 1, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ],
      direction: "up",
      nextDirection: "left",
      food: { x: 5, y: 5 },
      score: 0,
      isGameOver: false,
      hasWon: false
    };
    var next = logic.stepGame(state);

    assert(next.isGameOver === true, "state should be game over after moving into itself");
  });

  addTest("food placement avoids occupied cells", function () {
    var snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ];
    var food = logic.pickFoodPosition(2, snake, function () {
      return 0;
    });

    assert(food.x === 1 && food.y === 1, "only open cell should be selected");
  });

  tests.forEach(function (test) {
    try {
      test.fn();
      renderResult(test.name, true);
    } catch (error) {
      renderResult(test.name, false, error);
    }
  });
})();

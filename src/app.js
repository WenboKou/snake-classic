(function bootstrapSnakeApp() {
  var logic = window.SnakeGameLogic;
  var TICK_MS = 150;
  var board = document.getElementById("board");
  var scoreElement = document.getElementById("score");
  var statusElement = document.getElementById("status");
  var startButton = document.getElementById("start-button");
  var pauseButton = document.getElementById("pause-button");
  var restartButton = document.getElementById("restart-button");
  var controlButtons = document.querySelectorAll("[data-direction]");
  var intervalId = null;
  var isRunning = false;
  var state = logic.createInitialState({ gridSize: 16 });

  function cellClassName(x, y) {
    var position = { x: x, y: y };
    var isHead = logic.samePosition(state.snake[0], position);
    var isSnake = state.snake.some(function (segment) {
      return logic.samePosition(segment, position);
    });
    var isFood = state.food && logic.samePosition(state.food, position);
    var classes = ["cell"];

    if (isSnake) {
      classes.push("snake");
    }

    if (isHead) {
      classes.push("head");
    }

    if (isFood) {
      classes.push("food");
    }

    return classes.join(" ");
  }

  function renderBoard() {
    var fragments = [];
    var x;
    var y;

    for (y = 0; y < state.gridSize; y += 1) {
      for (x = 0; x < state.gridSize; x += 1) {
        fragments.push('<div class="' + cellClassName(x, y) + '" aria-hidden="true"></div>');
      }
    }

    board.innerHTML = fragments.join("");
  }

  function renderStatus() {
    scoreElement.textContent = String(state.score);

    if (state.hasWon) {
      statusElement.textContent = "You win";
      return;
    }

    if (state.isGameOver) {
      statusElement.textContent = "Game over";
      return;
    }

    statusElement.textContent = isRunning ? "Playing" : "Paused";
  }

  function render() {
    renderBoard();
    renderStatus();
  }

  function stopLoop() {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }

    isRunning = false;
    renderStatus();
  }

  function tick() {
    state = logic.stepGame(state);
    render();

    if (state.isGameOver || state.hasWon) {
      stopLoop();
    }
  }

  function startLoop() {
    if (isRunning || state.isGameOver || state.hasWon) {
      return;
    }

    intervalId = window.setInterval(tick, TICK_MS);
    isRunning = true;
    renderStatus();
  }

  function togglePause() {
    if (isRunning) {
      stopLoop();
      return;
    }

    startLoop();
  }

  function restartGame() {
    stopLoop();
    state = logic.createInitialState({ gridSize: 16 });
    render();
  }

  function handleDirection(direction) {
    state = logic.setDirection(state, direction);

    if (!isRunning && !state.isGameOver && !state.hasWon) {
      startLoop();
    }
  }

  function onKeyDown(event) {
    var keyMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      W: "up",
      a: "left",
      A: "left",
      s: "down",
      S: "down",
      d: "right",
      D: "right"
    };
    var nextDirection = keyMap[event.key];

    if (!nextDirection) {
      return;
    }

    event.preventDefault();
    handleDirection(nextDirection);
  }

  startButton.addEventListener("click", startLoop);
  pauseButton.addEventListener("click", togglePause);
  restartButton.addEventListener("click", restartGame);
  document.addEventListener("keydown", onKeyDown);

  controlButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      handleDirection(button.getAttribute("data-direction"));
    });
  });

  render();
})();

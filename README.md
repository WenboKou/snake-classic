# Classic Snake

A small dependency-free Snake game built with plain HTML, CSS, and JavaScript.

## Run

Open `index.html` in a browser.

If your browser blocks local script loading from `file://`, serve the folder with any static file server and open `index.html`.

## Deploy

This project is ready for static hosting. The fastest path is GitHub Pages.

See `DEPLOY.md` for step-by-step deployment instructions.

## Files

- `index.html` - game shell and controls
- `404.html` - fallback redirect page for static hosting
- `styles.css` - minimal styling
- `favicon.svg` - browser tab icon
- `src/game-logic.js` - deterministic game rules
- `src/app.js` - rendering and input handling
- `tests.html` / `tests.js` - browser smoke tests for core logic

## Manual Verification

- Start the game and confirm arrow keys plus `WASD` change direction.
- Confirm the snake grows and score increases after eating food.
- Confirm hitting a wall or the snake body ends the game.
- Confirm `Pause` stops movement and `Restart` resets score and state.
- On a narrow/mobile viewport, confirm the on-screen controls work.

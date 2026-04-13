# Deploy Classic Snake

This project is a static site. You do not need a backend, database, or build step.

## Recommended: GitHub Pages

1. Create a new GitHub repository, for example `snake-classic`.
2. Upload everything inside this folder to the repository root.
3. In GitHub, open `Settings -> Pages`.
4. Under `Build and deployment`, choose:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` (or `master`)
   - `Folder`: `/ (root)`
5. Save.
6. Wait for the deployment to finish. GitHub will give you a public URL like:
   - `https://your-name.github.io/snake-classic/`

## Alternative: Netlify

1. Create a new site in Netlify.
2. Drag this folder into Netlify deploy, or connect a GitHub repository.
3. If asked for settings:
   - Build command: leave empty
   - Publish directory: leave empty or set to `.`
4. Deploy and share the generated URL.

## Files included for hosting

- `index.html`: public homepage
- `404.html`: redirects unknown paths back to the game
- `.nojekyll`: prevents GitHub Pages from applying Jekyll processing
- `favicon.svg`: browser tab icon

## Pre-publish checklist

- Open `index.html` locally and confirm the game starts.
- Confirm keyboard and touch controls both work.
- Confirm score, game-over, pause, and restart work.
- Confirm `favicon.svg` loads in the browser tab.

## Share the game

Once deployed, anyone can open the public URL on desktop or mobile and play directly in the browser.

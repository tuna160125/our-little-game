# Our Day Together

Anas and Sama spend a day together in a side-view pixel-art story. Play as Sama through 15 scenes with Egyptian Arabic dialogue, 12 choice prompts, and 34 responses. The game saves checkpoints and audio preferences in the current browser.

## Play locally

Run this from the project directory with Node.js 18 or newer. The game and its unit tests have no package dependencies.

```sh
node serve.mjs
```

Open http://127.0.0.1:4173/. Use touch or a mouse. On a keyboard, Enter or Space advances dialogue, 1–3 select an available choice, and Escape opens settings.

## Static deployment

```sh
node build.mjs
```

Upload the contents of `dist/` to the desired static hosting directory. All imports and styles use relative paths so the game can live at the domain root or under a repository subdirectory. The build includes no runtime server, database, login, or external API.

For GitHub Pages, put the contents of `dist/` at the root of your chosen publishing branch. On GitHub, open the repository's **Settings → Pages**, choose **Deploy from a branch**, select that branch and **/(root)**, and save. You can also publish directly from the root of the source branch because the source files run as-is. Standard GitHub Pages sites are public. [GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Files

```text
index.html              Canvas and game interface
style.css               Desktop, portrait and landscape layouts
assets/
  characters.js         Editable sprite, necklace and flower artwork
  manifest.md           Art and audio inventory
src/
  art.js                Layered pixel environments
  audio.js              Original Web Audio themes and effects
  director.js           Character actions, camera and scene transitions
  main.js               Dialogue, choices, game input and menus
  save.js               Versioned checkpoints and memories
  story.js              Canonical scene and branch dialogue
tests/
  game.test.js          Story, animation, transition and save assertions
  browser-smoke.mjs     Optional Playwright walkthrough
serve.mjs               Local static server
build.mjs               Static export
```

## Verification

Run `node --test tests/game.test.js`. The optional browser walkthrough requires Playwright available to Node. Run `node tests/browser-smoke.mjs`. Set `DAY_EDGE` to use an installed Chromium-based browser or leave it unset to use Playwright's Chromium. Set `DAY_SHOTS` to an existing directory to capture screenshots.

The character sprites follow the brief's written physical descriptions. Facial likeness is unverified because no character photos were supplied. Sama's chain and bare-branched Poison Tree pendant use the supplied necklace photo as a reference. The original photo stays outside the game package.

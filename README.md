# "Blockchain" Puzzle

## To get started

```sh
npm i
# or yarn
npm start
# or yarn start
```

`http://localhost:9100/` will open automatically on the blockchain app, live-reloading as you develop.

`yarn test` & `yarn test:watch` to run the unit tests on the terminal.

## Task

Implement `blockClicked` to remove (or hide) all blocks of the same colour that are connected to the target element (block chain), then allow the blocks above the removed to "fall down" (similar to Tetris but you should click a block to have connected blocks removed, and the price of bitcoin).

E.g.,

Given:

![Initial state](https://trottski.s3.amazonaws.com/snaps/initial.jpg)

After clicking one of the bottom right blue boxes it should then look
like this:

![state 2](https://trottski.s3.amazonaws.com/snaps/stage2.jpg)

## Notes

Please do not publicly fork this repository, if you submit via github (prefered) please downlaod the zip and init your own repo, this is so that other people can't copy your work.
Feel free to overwrite this section of the readme with anything you think we should know about your solution.

Good luck!

## Added

I have added a game over screen and a move counter in addition to the base specifications. You will find a `this.gameOver` value initialized to false in the constructor and `this.moveCounter` value set to 0. After each move `this.moveCounter` is incremented and the function `checkEmptyBoard` is run to check if `this.gameOver` should be set to true.

if `this.gameOver` is set to true the class `render` function shows a screen informing the user of the amount of moves they took and a button that lets them restart the game.

export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export class BlockGrid {
  constructor() {
    this.moveCounter = 0;
    this.gameOver = false;
    this.grid = [];
    this.createGrid();
    return this;
  }

  /**
   * Creates game grid and assigns it to this.grid.
   */
  createGrid() {
    const newGrid = [];
    for (let x = 0; x < MAX_X; x++) {
      let col = [];
      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }
      newGrid.push(col);
    }
    this.grid = newGrid;
  }

  /**
   * Clears the game's root DOM element's innerHTML.
   * @param {DOMelement} el the games root DOM element
   */
  clearBoard(el) {
    el.innerHTML = '';
  }

  render(el = document.querySelector('#gridEl')) {
    this.clearBoard(el);
    if (this.gameOver) {
      this.endGameRender(el);
    } else {
      for (let x = 0; x < MAX_X; x++) {
        let id = 'col_' + x;
        let colEl = document.createElement('div');
        colEl.className = 'col';
        colEl.id = id;
        el.appendChild(colEl);

        for (let y = MAX_Y - 1; y >= 0; y--) {
          let block = this.grid[x][y],
            id = `block_${x}x${y}`,
            blockEl = document.createElement('div');

          blockEl.id = id;
          blockEl.className = 'block';
          blockEl.style.background = block ? block.colour : 'grey';
          if (block) {
            blockEl.addEventListener('click', evt =>
              this.blockClicked(evt, block));
          }
          colEl.appendChild(blockEl);
        }
      }
    }
    return this;
  }

  /**
   * Actions to be performed on block click: add 1 to move counter, recursively check connected blocks, check if game is over, drop not empty blocks in this.grid, and run the render function.
   * @param {event} evt click event details.
   * @param {block} block object that was clicked on.
   */
  blockClicked(evt, block) {
    this.moveCounter++;
    this.findConnectedBlocks(block, block.colour);
    this.checkEmptyBoard();
    this.dropEmptyBlocks();
    this.render();
  }

  /**
   * Given a block it recursively calls itself on the blocks valid neighbors to see if they match the color. If they match it sets the grid value to null.
   * @param {BlockObj} block is an object with: x,y,colour value.
   * @param {string} targetColour is a string of the colour we are looking for.
   */
  findConnectedBlocks(block, targetColour) {
    if (block && block.colour === targetColour) {
      const { x, y } = block;
      this.grid[x][y] = null;

      // check up block
      if (y + 1 < this.grid[x].length) {
        this.findConnectedBlocks(this.grid[x][y + 1], targetColour);
      }
      // check right block
      if (x + 1 < this.grid.length) {
        this.findConnectedBlocks(this.grid[x + 1][y], targetColour);
      }
      // check down block
      if (y - 1 >= 0) {
        this.findConnectedBlocks(this.grid[x][y - 1], targetColour);
      }
      // check left block
      if (x - 1 >= 0) {
        this.findConnectedBlocks(this.grid[x - 1][y], targetColour);
      }
    }
  }

  /**
   * Drop reassign block values and lift null values to top of column.
   */
  dropEmptyBlocks() {
    for (let x = 0; x < this.grid.length; x++) {
      const newColumn = [];
      let nullCounter = 0; // amount of empty spaces to add at the end.
      // loop through rows
      for (let y = 0; y < this.grid[x].length; y++) {
        const currentBlock = this.grid[x][y];
        // if not null need to reassign block values
        if (currentBlock !== null) {
          currentBlock.x = x;
          currentBlock.y = newColumn.length;
          newColumn.push(currentBlock);
        } else {
          nullCounter++;
        }
      }
      // lets add thoose empty spaces here
      for (let yFill = 1; yFill <= nullCounter; yFill++) {
        newColumn.push(null);
      }

      this.grid[x] = newColumn;
    }
  }

  /**
   * Loop through all elements and see if any are not null.
   * Set this.gameOver = true if all are null.
   */
  checkEmptyBoard() {
    let foundNotNull = false;
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        const currentBlock = this.grid[x][y];
        if (currentBlock !== null) {
          foundNotNull = true;
        }
      }
    }
    if (!foundNotNull) {
      this.gameOver = true;
    }
  }

  /**
   * Renders of game details.
   * @param {DOM element} el board element where to render game over details
   */
  endGameRender(el) {
    let gameOverDiv = document.createElement('div');
    gameOverDiv.className = 'game-over';

    let title = document.createElement('h1');
    title.innerHTML = 'Game Complete';
    gameOverDiv.appendChild(title);

    let moveCount = document.createElement('div');
    moveCount.className = 'final-move-count';
    moveCount.innerHTML = `Finished in ${this.moveCounter} moves.`;
    gameOverDiv.appendChild(moveCount);

    let startOverButton = document.createElement('button');
    startOverButton.className = 'start-over-button';
    startOverButton.innerHTML = 'Play Again';
    startOverButton.addEventListener('click', evt => this.restartGame());
    gameOverDiv.appendChild(startOverButton);

    el.appendChild(gameOverDiv);
  }

  /**
   * Restarts all game settings and re-renders
   */
  restartGame() {
    this.moveCounter = 0;
    this.gameOver = false;
    this.createGrid();
    this.render();
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());

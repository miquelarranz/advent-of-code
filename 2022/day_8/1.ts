const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");

  const lines = text.split("\n");
  const forest = [];

  for (const line of lines) {
    forest.push([...line].map((tree) => parseInt(tree)));
  }

  return forest;
};

const isVisible = (forest: number[][], posX: number, posY: number) => {
  if (
    posX === 0 ||
    posY === 0 ||
    posX === forest.length - 1 ||
    posX === forest[posY].length - 1
  ) {
    return true;
  }

  const tree = forest[posY][posX];
  let isRightVisible = true;
  let isTopVisible = true;
  let isLeftVisible = true;
  let isBottomVisible = true;

  for (let i = posY + 1; i < forest[posX].length; ++i) {
    if (forest[i][posX] >= tree) {
      isBottomVisible = false;
      break;
    }
  }

  if (isBottomVisible) {
    return true;
  }

  for (let j = posY - 1; j >= 0; --j) {
    if (forest[j][posX] >= tree) {
      isTopVisible = false;
      break;
    }
  }

  if (isTopVisible) {
    return true;
  }

  for (let k = posX + 1; k < forest.length; ++k) {
    if (forest[posY][k] >= tree) {
      isRightVisible = false;
      break;
    }
  }

  if (isRightVisible) {
    return true;
  }

  for (let l = posX - 1; l >= 0; --l) {
    if (forest[posY][l] >= tree) {
      isLeftVisible = false;
      break;
    }
  }

  if (isLeftVisible) {
    return true;
  }

  return false;
};

const run = async () => {
  const forest = await readInput();

  const total = forest.reduce((total, row, posY) => {
    return (
      total +
      row.reduce((total, _, posX) => {
        return isVisible(forest, posX, posY) ? total + 1 : total;
      }, 0)
    );
  }, 0);

  console.log("Result", total);
};

run();

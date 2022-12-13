const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");

  const lines = text.split("\n");
  const forest = [];

  for (const line of lines) {
    forest.push([...line].map((tree) => parseInt(tree)));
  }

  return forest;
};

const calculateScenicScore = (
  forest: number[][],
  posX: number,
  posY: number
) => {
  const tree = forest[posY][posX];
  let topScore = 0;
  let rightScore = 0;
  let leftScore = 0;
  let bottomScore = 0;

  for (let i = posY + 1; i < forest[posX].length; ++i) {
    if (forest[i][posX] <= tree) {
      ++bottomScore;
    }

    if (forest[i][posX] >= tree) {
      break;
    }
  }

  for (let j = posY - 1; j >= 0; --j) {
    if (forest[j][posX] <= tree) {
      ++topScore;
    }

    if (forest[j][posX] >= tree) {
      break;
    }
  }

  for (let k = posX + 1; k < forest.length; ++k) {
    if (forest[posY][k] <= tree) {
      ++rightScore;
    }

    if (forest[posY][k] >= tree) {
      break;
    }
  }

  for (let l = posX - 1; l >= 0; --l) {
    if (forest[posY][l] <= tree) {
      ++leftScore;
    }

    if (forest[posY][l] >= tree) {
      break;
    }
  }

  return rightScore * topScore * leftScore * bottomScore;
};

const run = async () => {
  const forest = await readInput();
  let maxScore = 0;

  forest.forEach((row, posY) => {
    row.forEach((_, posX) => {
      const score = calculateScenicScore(forest, posX, posY);

      if (score > maxScore) {
        maxScore = score;
      }
    });
  });

  console.log("Result", maxScore);
};

run();

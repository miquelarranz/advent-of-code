type Move = {
  quantity: number;
  from: string;
  to: string;
};

type Stacks = Record<string, string[]>;

const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");
  const lines = text.split("\n");
  const moves: Move[] = [];
  const stacks: Stacks = {};

  for (const line of lines) {
    if (line.includes("move")) {
      const parsedMove = line.split(" ");
      moves.push({
        quantity: parseInt(parsedMove[1]),
        from: parsedMove[3],
        to: parsedMove[5],
      });
    } else if (line.includes("1")) {
      continue;
    } else {
      const boxes = line.match(/[A-Z]|    ?/g);

      boxes?.forEach((box, index) => {
        if (box.trim() !== "") {
          if (!stacks[index + 1]) {
            stacks[index + 1] = [box];
          } else {
            stacks[index + 1].push(box);
          }
        }
      });
    }
  }

  return { stacks, moves };
};

const moveEverything = (stacks: Stacks, moves: Move[]) => {
  const updatedStacks: Stacks = { ...stacks };
  moves.forEach((move) => {
    const { to, from, quantity } = move;

    const elementsToMove = updatedStacks[from].slice(0, quantity);

    updatedStacks[from] = updatedStacks[from].slice(quantity);
    updatedStacks[to] = elementsToMove.concat(updatedStacks[to]);
  });

  return updatedStacks;
};

const run = async () => {
  const { stacks, moves } = await readInput();

  const updatedStacks = moveEverything(stacks, moves);

  const result = Object.keys(updatedStacks).reduce((result, key) => {
    return (result += updatedStacks[key].shift());
  }, "");

  console.log("Result", result);
};

run();

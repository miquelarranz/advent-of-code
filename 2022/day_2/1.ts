// If I win -> 6
// If draw -> 3
// If lost -> 0
// Rock A X-> 1
// Paper B Y -> 2
// Scissor C Z -> 3

const yourScores: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const youWinOpponent: Record<string, string> = {
  X: "C",
  Y: "A",
  Z: "B",
};

const isDraw: Record<string, string> = {
  X: "A",
  Y: "B",
  Z: "C",
};

const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");

  return text.split("\n");
};

const calculateRoundScore = (opponentChoice: string, yourChoice: string) => {
  let roundScore = 0;

  if (isDraw[yourChoice] === opponentChoice) {
    roundScore += 3;
  } else if (youWinOpponent[yourChoice] === opponentChoice) {
    roundScore += 6;
  }

  return roundScore + yourScores[yourChoice];
};

const run = async () => {
  const lines = await readInput();
  let totalScore = 0;

  for (const line of lines) {
    const [opponentChoice, yourChoice] = line.split(" ");

    const roundScore = calculateRoundScore(opponentChoice, yourChoice);

    totalScore += roundScore;
  }

  console.log("Result", totalScore);
};

run();

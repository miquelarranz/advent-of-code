// If I win -> 6
// If draw -> 3
// If lost -> 0
// Rock A X-> 1
// Paper B Y -> 2
// Scissor C Z -> 3

const resultScore: Record<string, number> = {
  X: 0,
  Y: 3,
  Z: 6,
};

const yourScores: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const youLoseOpponent: Record<string, string> = {
  A: "Z",
  B: "X",
  C: "Y",
};

const youWinOpponent: Record<string, string> = {
  A: "Y",
  B: "Z",
  C: "X",
};

const isDraw: Record<string, string> = {
  A: "X",
  B: "Y",
  C: "Z",
};

const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");

  return text.split("\n");
};

const calculateRoundScore = (opponentChoice: string, result: string) => {
  let playScore = 0;

  if (result === "Y") {
    playScore += yourScores[isDraw[opponentChoice]];
  } else if (result === "Z") {
    playScore += yourScores[youWinOpponent[opponentChoice]];
  } else {
    playScore += yourScores[youLoseOpponent[opponentChoice]];
  }

  return resultScore[result] + playScore;
};

const run = async () => {
  const lines = await readInput();
  let totalScore = 0;

  for (const line of lines) {
    const [opponentChoice, result] = line.split(" ");

    const roundScore = calculateRoundScore(opponentChoice, result);

    totalScore += roundScore;
  }

  console.log("Result", totalScore);
};

run();

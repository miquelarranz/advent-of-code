const readInput = async () => {
  return await Deno.readTextFile("./input.txt");
};

const allDifferent = (sequence: string) => {
  return new Set(sequence).size == sequence.length;
};

const findMarker = (text: string) => {
  let currentSequence = "";
  let marker = 0;
  const MAX_SEQUENCE = 14;

  for (const char of text) {
    currentSequence =
      (currentSequence.length < MAX_SEQUENCE
        ? currentSequence
        : currentSequence.slice(1, MAX_SEQUENCE)) + char;

    if (
      currentSequence.length === MAX_SEQUENCE &&
      allDifferent(currentSequence)
    ) {
      marker = text.indexOf(currentSequence) + MAX_SEQUENCE;
      break;
    }
  }

  return marker;
};

const run = async () => {
  const text = await readInput();

  const result = findMarker(text);

  console.log("Result", result);
};

run();

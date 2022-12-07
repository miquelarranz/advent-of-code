const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");

  return text.split("\n");
};

const findSharedItem = (
  firstCompartment: string,
  secondCompartment: string,
  thirdRucksack: string
) => {
  for (const item of firstCompartment) {
    if (secondCompartment.includes(item) && thirdRucksack.includes(item)) {
      return item;
    }
  }
};

const calculatePriority = (item: string) => {
  const firstUppercase = "A".charCodeAt(0);
  const firstLowercase = "a".charCodeAt(0);
  const itemCode = item.charCodeAt(0);
  let priority = 0;

  if (itemCode >= firstLowercase) {
    // if lowecase
    priority = itemCode - firstLowercase + 1;
  } else {
    // if uppercase
    priority = itemCode - firstUppercase + 27;
  }

  return priority;
};

const run = async () => {
  const lines = await readInput();
  let totalPriority = 0;

  for (let i = 0; i < lines.length; i += 3) {
    const firstRucksack = lines[i];
    const secondRucksack = lines[i + 1];
    const thirdRucksack = lines[i + 2];

    const item: string | undefined = findSharedItem(
      firstRucksack,
      secondRucksack,
      thirdRucksack
    );

    totalPriority += (item && calculatePriority(item)) || 0;
  }

  console.log("Result", totalPriority);
};

run();

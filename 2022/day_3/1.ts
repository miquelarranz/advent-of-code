const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");

  return text.split("\n");
};

const findSharedItem = (
  firstCompartment: string,
  secondCompartment: string
) => {
  for (const item of firstCompartment) {
    if (secondCompartment.includes(item)) {
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

  for (const line of lines) {
    const firstCompartment = line.slice(0, line.length / 2);
    const secondCompartment = line.slice(line.length / 2);

    const item: string | undefined = findSharedItem(
      firstCompartment,
      secondCompartment
    );

    totalPriority += (item && calculatePriority(item)) || 0;
  }

  console.log("Result", totalPriority);
};

run();

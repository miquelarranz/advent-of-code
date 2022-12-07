const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");

  return text.split("\n");
};

const compareSections = (
  firstSectionA: number,
  lastSectionA: number,
  firstSectionB: number,
  lastSectionB: number
) => {
  return (
    (firstSectionA >= firstSectionB && lastSectionA <= lastSectionB) ||
    (firstSectionB >= firstSectionA && lastSectionB <= lastSectionA)
  );
};

const generateSections = (assignment: string) => {
  const [firstSection, lastSection] = assignment.split("-");

  return [parseInt(firstSection), parseInt(lastSection)];
};

const isOverlapingAssignments = (assignmentA: string, assignmentB: string) => {
  const [firstSectionA, lastSectionA] = generateSections(assignmentA);
  const [firstSectionB, lastSectionB] = generateSections(assignmentB);

  return compareSections(
    firstSectionA,
    lastSectionA,
    firstSectionB,
    lastSectionB
  );
};

const run = async () => {
  const lines = await readInput();
  let total = 0;

  for (const line of lines) {
    const [assignmentA, assignmentB] = line.split(",");

    const isOverlaping = isOverlapingAssignments(assignmentA, assignmentB);

    if (isOverlaping) {
      ++total;
    }
  }

  console.log("Result", total);
};

run();

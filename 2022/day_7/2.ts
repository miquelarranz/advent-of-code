const readInput = async () => {
  const text = await Deno.readTextFile("./input.txt");

  return text.split("\n");
};

const isCD = (command: string) => {
  return command.includes("$ cd");
};

const isFile = (command: string) => {
  return command.match(/\d/g);
};

type Directory = {
  subdirectories: Directories;
  files: number;
  parent?: Directory;
};

type Directories = Record<string, Directory>;

// a
//  1
//  2
//  b
//   2

const run = async () => {
  const lines = await readInput();
  const rootDirectory: Directory = {
    subdirectories: {},
    files: 0,
  };
  let currentDirectory = rootDirectory;

  for (const command of lines) {
    if (isCD(command)) {
      const [, , directoryName] = command.split(" ");

      const isParentCD = directoryName === "..";
      const isRootCD = directoryName === "/";

      if (isRootCD) {
        continue;
      }

      if (!currentDirectory.subdirectories[directoryName] && !isParentCD) {
        currentDirectory.subdirectories[directoryName] = {
          files: 0,
          subdirectories: {},
          parent: currentDirectory,
        };
      }

      if (isParentCD) {
        currentDirectory = currentDirectory.parent || currentDirectory;
      } else {
        currentDirectory = currentDirectory.subdirectories[directoryName];
      }
    } else if (isFile(command)) {
      const [size] = command.split(" ");

      currentDirectory.files += parseInt(size);
    }
  }

  const sumFilesFromSubdirectories = (directory: Directory) => {
    const { subdirectories, files } = directory;

    let totalFiles = files;
    let childSizes: number[] = [];

    for (const subdirectory of Object.values(subdirectories)) {
      const nestedSizes = sumFilesFromSubdirectories(subdirectory);

      totalFiles += nestedSizes[0];
      childSizes = childSizes.concat(nestedSizes);
    }

    return [totalFiles, ...childSizes];
  };

  const sizes = sumFilesFromSubdirectories(rootDirectory);

  const unusedSpace = 70000000 - sizes[0];
  const minimumSpaceNeeded = 30000000 - unusedSpace;

  const result = sizes.reduce((acc, size) => {
    if (size - minimumSpaceNeeded < acc && size >= minimumSpaceNeeded) {
      acc = size - minimumSpaceNeeded;
    }

    return acc;
  }, minimumSpaceNeeded);

  console.log("Result", minimumSpaceNeeded + result);
};

run();

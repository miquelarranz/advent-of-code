const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");
let maximum = 0;
let sum = 0;

for (const line of lines) {
  if (line === "") {
    if (sum > maximum) {
      maximum = sum;
    }
    sum = 0;
  } else {
    sum += parseInt(line);
  }
}

console.log("Result", maximum);

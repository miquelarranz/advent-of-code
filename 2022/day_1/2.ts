const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");

const top = [];
let sum = 0;

for (const line of lines) {
  if (line === "") {
    const insertAt = top.findIndex((topElement) => topElement < sum);
    if (insertAt != -1) {
      top.splice(insertAt, 0, sum);
    } else if (top.length < 3) {
      top.push(sum);
    }

    sum = 0;
  } else {
    sum += parseInt(line);
  }
}

console.log("Result", top[2] + top[1] + top[0]);

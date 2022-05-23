const PATH = require("path");
const FS = require("fs");
const { stdin, stdout } = require("process");

const FILE = FS.createWriteStream(PATH.join(__dirname, "text.txt"), "utf-8");

stdout.write("Hello! Please, write something\n");
stdin.on("data", (chunk) => {
  if (chunk.toString().trim() === "exit") {
    stdout.write("Goodbye, have a good day");
    process.exit();
  } else {
    FILE.write(chunk);
  }
});

process.on("SIGINT", () => {
  console.log("Goodbye, have a good day");
  process.exit();
});

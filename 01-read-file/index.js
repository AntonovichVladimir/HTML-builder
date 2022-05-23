const PATH = require("path");
const FS = require("fs");

const STREAM = FS.createReadStream(PATH.join(__dirname, "text.txt"), "utf-8");
let data = "";
STREAM.on("data", (chunk) => (data += chunk));
STREAM.on("end", () => console.log("End", data));
STREAM.on("error", (error) => console.log("error", error.message));

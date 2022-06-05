const fs = require("fs");
const path = require("path");

const bundleStream = fs.createWriteStream(
  path.join(__dirname, "project-dist", "bundle.css")
);

fs.readdir(path.join(__dirname, "styles"), (error, data) => {
  if (error) console.log(error);
  for (let i = 0; i < data.length; i++) {
    let extension = path.extname(data[i]).split(".").pop();
    if (extension === "css") {
      let stylesStream = fs.createReadStream(
        path.join(__dirname, "styles", data[i]),
        "utf-8"
      );
      stylesStream.on("data", (chunk) => {
        bundleStream.write(chunk);
      });
    }
  }
});
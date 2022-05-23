const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (error, files) => {
    if (error) console.log(error);
    else {
      console.log(
        "bundle.css file successfully created\nStyles successfully added to the bundle.css file"
      );
      let read = [];
      let bundleStream = fs.createWriteStream(
        path.join(__dirname, "project-dist", "bundle.css"),
        "utf-8"
      );

      files.forEach((file) => {
        if (
          path.extname(path.join(__dirname, "styles", file.name)) === ".css"
        ) {
          read.push(
            new Promise((resolve, reject) => {
              const stylesStream = fs.createReadStream(
                path.join(__dirname, "styles", file.name),
                "utf8"
              );

              stylesStream.on("data", (chunk) => {
                bundleStream.write(chunk);
              });

              stylesStream.on("end", () => resolve());
              stylesStream.on("error", (e) => reject(e));
            })
          );
        }
      });

      read.reduce((previous, current) => previous.then(() => current));
    }
  }
);

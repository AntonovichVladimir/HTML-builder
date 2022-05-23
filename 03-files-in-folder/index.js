const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (error, files) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Current directory files:");
      files.forEach((file) => {
        if (file.isFile()) {
          fs.stat(
            path.join(__dirname, "secret-folder", file.name),
            (error, stats) => {
              if (error) {
                console.log(error);
              } else {
                console.log(
                  `file name - ${
                    file.name.split(".")[0]
                  } -> file extension - ${path
                    .extname(path.join(__dirname, "secret-folder", file.name))
                    .slice(1)} -> file size - ${stats.size}b`
                );
              }
            }
          );
        }
      });
    }
  }
);

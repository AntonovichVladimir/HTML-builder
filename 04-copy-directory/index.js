const path = require("path");
const fs = require("fs");

fs.promises
  .mkdir(path.join(__dirname, "files-copy"), { recursive: true })
  .then(() => {
    console.log("Directory created successfully");
  })
  .catch(() => {
    console.log("failed to create directory");
  });

fs.readdir(
  path.join(__dirname, "files-copy"),
  { withFileTypes: true },
  (error, files) => {
    if (error) console.log(error);
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          fs.unlink(path.join(__dirname, "files-copy", file.name), (error) => {
            if (error) {
              console.log(error);
            }
          });
        }
      });
    }
  }
);

fs.readdir(
  path.join(__dirname, "files"),
  { withFileTypes: true },
  (error, files) => {
    if (error) {
      console.log(error);
    } else {
      files.forEach((file) => {
        if (file.isFile()) {
          fs.promises.copyFile(
            path.join(__dirname, "files", file.name),
            path.join(__dirname, "files-copy", file.name)
          );
        }
      });
    }
  }
);

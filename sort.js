const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "Music");

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory");
  }

  files.forEach(file => {
    const letter = file.charAt(0).toUpperCase();
    if (!fs.existsSync(`SortedMusic`)) {
      fs.mkdirSync(`SortedMusic`);
    }

    if (!fs.existsSync(`SortedMusic/${letter}`)) {
      fs.mkdirSync(`SortedMusic/${letter}`);
    }

    if (!fs.existsSync(`SortedMusic/${letter}/${file}`)) {
      fs.linkSync(`Music/${file}`, `SortedMusic/${letter}/${file}`, err => {
        if (err) {
          console.error(err.message);
          return;
        }
      });
      fs.unlinkSync(`Music/${file}`);
      return;
    } else {
      fs.unlinkSync(`SortedMusic/${letter}/${file}`);
      fs.linkSync(`Music/${file}`, `SortedMusic/${letter}/${file}`, err => {
        if (err) {
          console.error(err.message);
          return;
        }
      });
      fs.unlinkSync(`Music/${file}`);
    }
    fs.rmdir("Music", err => {
      if (err) {
        console.error(err.message);
      }
      console.log('Folder "Music" deleted succesfully!');
    });
  });
});

import fs from "fs";

export default {
  read
};

// Read a fake file built with ../__helpers__/fixture.js
function read(file, { encoding, onLoad, onError }) {
  fs.readFile(file.path, { encoding }, (err, result) => {
    if (err) {
      onError(err);
    } else {
      onLoad({ target: { result } });
    }
  });
}

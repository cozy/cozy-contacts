import fs from "fs";

// Read a fake file built with ../__helpers__/fixture.js
export default function readFile(file, { encoding, onLoad, onError }) {
  fs.readFile(file.path, { encoding }, (err, result) => {
    if (err) {
      onError(err);
    } else {
      onLoad({ target: { result } });
    }
  });
}

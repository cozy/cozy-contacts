// On the browser side, code relies on the HTML5 File & FileReader API.
// In tests, since run in a Node.js environment, `./__mocks__/reader.js` is used instead.

export default {
  read
};

function read(file, { encoding, onLoad, onError }) {
  const reader = new FileReader();
  reader.addEventListener("load", onLoad);
  reader.addEventListener("error", onError);
  reader.readAsText(file, encoding);
}

const path = require("path");
const buildPlugin = require("./src/index.build");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "mylib.js",
    libraryTarget: "umd"
  },
  plugins: [buildPlugin]
};

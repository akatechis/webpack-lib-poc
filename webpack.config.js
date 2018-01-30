const path = require("path");
const buildPlugin = require("./buildplugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "/dist"),
    filename: "mylib.js",
    libraryTarget: "umd",
  },
  plugins: [buildPlugin]
};

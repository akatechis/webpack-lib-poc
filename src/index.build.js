const fs = require("fs");
const { EOL } = require("os");
const path = require("path");

let modules = 0;
const buffer = [
  "// auto-generated file", "",
];

const emitModule = file => {
  const moduleName = file.replace(".js", "");
  modules += 1;
  buffer.push(`exports.${moduleName} = require("./snippets/${moduleName}");`);
};

const files = fs.readdirSync(__dirname + "/snippets");

files
.filter(fname => fname !== "index.js" && !fname.startsWith("."))
.forEach(f => {
  const stats = fs.statSync(path.join(__dirname, "snippets", f));
  if (stats.isFile()) {
    emitModule(f);
  }
});

fs.writeFileSync(path.join(__dirname, "index.js"), buffer.join(EOL)+EOL);

console.info(`Built 'src/index.js' with ${modules} modules`);

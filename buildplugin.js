const fs = require("fs");
const { EOL } = require("os");
const path = require("path");

function build() {

  console.info("Build script starting");

  let modules = 0;
  const buffer = [
    "// auto-generated file", "",
  ];

  const emitModule = file => {
    const moduleName = file.replace(".js", "");
    modules += 1;
    buffer.push(`exports.${moduleName} = require("./snippets/${moduleName}");`);
  };

  const files = fs.readdirSync(__dirname + "/src/snippets");

  files
  .filter(fname => fname !== "index.js" && !fname.startsWith("."))
  .forEach(f => {
    const stats = fs.statSync(path.join(__dirname, "src/snippets", f));
    if (stats.isFile()) {
      emitModule(f);
    }
  });

  fs.writeFileSync(path.join(__dirname, "src/index.js"), buffer.join(EOL)+EOL);

  console.info(`Build script done. 'src/index.js' emitted with ${modules} modules`);
}

module.exports = function () {
  this.plugin("watch-run", function () {
    build();
  })
};

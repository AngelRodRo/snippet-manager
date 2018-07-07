const path = require("path");
const chalk = require("chalk");

const exec = function (cmd) {
    return require("child_process")
        .execSync(cmd)
        .toString()
        .trim();
};

module.exports = function () {
    const cachePath = path.resolve(__dirname, "../node_modules/.cache");
    console.log(chalk.red("Cleaning webpack cache..."));
    exec(`rm -rf ${cachePath}/babel-loader`);
    exec(`rm -rf ${cachePath}/eslint-loader`);
    console.log(chalk.green("Cleaned!"));
};

/**
 * Invokes the transpiler on a single file
 */

const shell = require("shelljs");
const files = require("./files");

const versionOfOs = {
  linux: "pyxyc-linux.byte",
  darwin: "pyxyc-darwin.byte",
};

let _compiler = "";

let _version = "";

const setup = ({ os, version }) => {
  _compiler = versionOfOs[os];
  _version = version;
};

const supportedOs = (os) => {
  return os in versionOfOs;
};

/**
 * Transpiles a file in the inDir directory in a given path, and with a given output directory
 */
const transpile = (inDir, outDir, path) => {
  /** Task 2a: transpiling a single file
   * Assuming that our tool's main entry point exists in /__dirname (and that is where relative paths start from), we need to call the correct compiler for the OS.
   * The format of calling hte compiler looks like this:
   * pyxyc [file path] [directory containing input] [directory for output]
   */
  if (shell.exec(/* what goes here? */).code !== 0) {
    shell.echo(`Error in compiling ${path}`);
    shell.exit(1);
  }
};

const addDirectory = (outDir, path) => {
  if (shell.exec(`mkdir -p ${outDir}${path}`).code !== 0) {
    shell.echo(`Error in creating directory ${path}`);
    shell.exit(1);
  }
};

module.exports = { transpile, addDirectory, setup, supportedOs };

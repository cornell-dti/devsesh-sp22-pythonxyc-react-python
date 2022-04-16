#! /usr/bin/env node

/**
 * This file will call an instance of 'chokidar'
 * to watch an input directory for changes
 *
 */

const fs = require("fs");
const compiler = require("./compiler");
const files = require("./files");

compiler.setup({
  os: process.platform,
  version: "0.1",
});

const optionalSlash = (dir) => {
  return dir.substring(dir.length - 1, dir.length) !== "/" ? "/" : "";
};

const withoutSlash = (dir) => {
  if (dir.substring(dir.length - 1, dir.length) === "/") {
    return dir.substring(0, dir.length - 1);
  } else {
    return dir;
  }
};

/** Recursively reads a directory and calls callbacks on files and directories */
const traverseAllFiles = (dir, cbFile, cbDir, root) => {
  fs.readdir(dir, (err, files) => {
    files.forEach((path) => {
      const fullPath = `${dir}/${path}`;
      const pathInDir = fullPath.replace(root, "");

      /** Task 2b: we want to recursively act on files and directoriers.
       * How does one recursively act on the file tree?
       * leaf: Call cbFile if the pathInDir (path in directory) is a file with pathInDir as the param. Ensure that the file is a .pyx file.
       * non-leaf: If the pathinDir is itself a path, call cbFile with pathInDir as the param and then make a recursive call.
       */

      if (fs.statSync(`${dir}/${path}`).isDirectory()) {
      } else {
      }
    });
  });
};

const main = async () => {
  try {
    let rawConfig = fs.readFileSync("react-python-config.json");
    let configData = JSON.parse(rawConfig);

    // should be read from json
    if (!files.directoryExists(`${configData.inDir}`)) {
      throw new Error("invalid input dir, run react-python-setup again");
    }
    if (!files.directoryExists(`${configData.inDir}`)) {
      throw new Error("invalid output dir, run react-python-setup again");
    }

    const inDir = withoutSlash(configData.inDir);
    const outDir = withoutSlash(configData.outDir);
    const inDirSlash = configData.inDir + optionalSlash(configData.inDir);
    const outDirSlash = configData.outDir + optionalSlash(configData.outDir);
    const root = `${inDir}/`;

    console.log(`input directory: ${inDir}`);
    console.log(`output directory: ${outDir}`);

    if (inDir === outDir) {
      // avoid cycles
      throw new Error("Input and output directories are the same");
    }

    await files.clean(outDirSlash);

    if (compiler.supportedOs(process.platform)) {
      /** Task 2c: make the call to traverseAllFiles
       * pass in the necessary arguments
       * for cbFile, pass in a function that simply transpiles a given file
       * for cbDir, pass in a function that lets the compiler add a directory to the output directory (allowing us to output files to an inner directory)
       */
      traverseAllFiles(
        // hm...,
        // what goes here,
        // what about here,
        root
      );
    } else {
      throw new Error("Unsupported OS: " + process.platform);
    }
  } catch (err) {
    console.log(err);
  }
};

main();

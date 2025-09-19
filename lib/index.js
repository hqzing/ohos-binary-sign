const { execFile, execFileSync } = require("child_process");
const { getBinarySignToolPath } = require("../utils/utils.js");

const toolPath = getBinarySignToolPath();

function execFilePromise(file, args) {
  return new Promise((resolve, reject) => {
    execFile(file, args, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

function makeSignCmdArgs(options){
  availableOptions = [
    "keyAlias",
    "keyPwd",
    "appCertFile",
    "profileFile",
    "profileSigned",
    "signAlg",
    "keystoreFile",
    "keystorePwd",
    "inFile",
    "outFile",
    "moduleFile",
    "selfSign",
  ];

  const args = ["sign"];
  for (const key of Object.keys(options)) {
    if (availableOptions.includes(key)) {
      args.push(`-${key}`);
      args.push(options[key]);
    }
  }

  return args;
}

function sign(options, callback) {
  const args = makeSignCmdArgs(options);
  if (typeof callback === "function") {
    return execFile(toolPath, args, callback);
  } else {
    return execFilePromise(toolPath, args);
  }
}

function signSync(options) {
  const args = makeSignCmdArgs(options);
  return execFileSync(toolPath, args, {encoding: "utf8"});
}

function makeDisplaySignCmdArgs(options){
  availableOptions = [
    "inFile"
  ];

  const args = ["display-sign"];
  for (const key of Object.keys(options)) {
    if (availableOptions.includes(key)) {
      args.push(`-${key}`);
      args.push(options[key]);
    }
  }

  return args;
}

function displaySign(options, callback) {
  const args = makeDisplaySignCmdArgs(options);
  if (typeof callback === "function") {
    return execFile(toolPath, args, callback);
  } else {
    return execFilePromise(toolPath, args);
  }
}

function displaySignSync(options) {
  const args = makeDisplaySignCmdArgs(options);
  return execFileSync(toolPath, args, {encoding: "utf8"});
}

function selfSign(filePath, callback) {
  const options = {
    selfSign: "1",
    inFile: filePath,
    outFile: filePath,
  };
  return sign(options, callback);
}

function selfSignSync(filePath) {
  const options = {
    selfSign: "1",
    inFile: filePath,
    outFile: filePath,
  };
  return signSync(options);
}

module.exports = {
  sign,
  signSync,
  displaySign,
  displaySignSync,
  selfSign,
  selfSignSync
};

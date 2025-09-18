const { execFile } = require("child_process");
const { getBinarySignToolPath } = require("../utils/utils.js");

const toolPath = getBinarySignToolPath();

function sign(options, callback) {
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
  for (const key in options) {
    if (options.hasOwnProperty(key) && availableOptions.includes(key)) {
      args.push(`-${key}`);
      args.push(options[key]);
    }
  }
  return execFile(toolPath, args, callback);
}

function displaySign(filePath, callback) {
  const args = ["display-sign", "-inFile", filePath];
  return execFile(toolPath, args, callback);
}

function selfSign(filePath, callback) {
  const options = {
    selfSign: "1",
    inFile: filePath,
    outFile: filePath,
  };
  return sign(options, callback);
}

module.exports = {
  sign,
  displaySign,
  selfSign,
};


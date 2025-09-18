const process = require("process");
const path = require("path");
const fs = require("fs");

function getBinarySignToolPath() {
  const toolPath = path.resolve(__dirname, `../platform/${process.platform}-${process.arch}/binary-sign-tool`);

  if (!fs.existsSync(toolPath)) {
    throw new Error(`This package does not support this platform: ${platform}. It only supports linux-x64 and openharmony-arm64.`);
  }

  return toolPath;
}

module.exports = {
  getBinarySignToolPath,
};


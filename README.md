
# ohos-binary-sign

The npm wrapper of the OpenHarmony [binary-sign-tool](https://gitcode.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/binary-sign-tool.md).

## Getting Started

You can use this tool through the command line
```sh
npm install -g ohos-binary-sign
ohos-binary-sign sign -selfSign 1 -inFile ./my-binary-file -outFile ./my-binary-file
```

or via the JavaScript API
```js
const { sign } = require("ohos-binary-sign")

const options = {
  selfSign: "1",
  inFile: "./my-binary-file",
  outFile: "./my-binary-file"
}

sign(options, (error, stdout, stderr) => {
  if (error) {
    console.error(`The subprocess crashed, error message: ${error.message}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
})
```

## More information
- Source code repository of OpenHarmony binary-sign-tool: [link](https://gitcode.com/openharmony/developtools_hapsigner)
- Document of OpenHarmony binary-sign-tool: [link](https://gitcode.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/binary-sign-tool.md)

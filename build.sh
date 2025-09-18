#!/bin/sh
set -e

if [ "$(node -p process.platform)" != "linux" ]; then
    echo "Error: This script must be run on Linux."
    exit 1
fi

query_component() {
  component=$1
  curl 'https://ci.openharmony.cn/api/daily_build/build/list/component' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json' \
    --data-raw '{"projectName":"openharmony","branch":"master","pageNum":1,"pageSize":10,"deviceLevel":"","component":"'${component}'","type":1,"startTime":"2025080100000000","endTime":"20990101235959","sortType":"","sortField":"","hardwareBoard":"","buildStatus":"success","buildFailReason":"","withDomain":1}'
}

sdk_linux_download_url=$(query_component "ohos-sdk-public" | jq -r ".data.list.dataList[0].obsPath")
curl $sdk_linux_download_url -o ohos-sdk-public.tar.gz

sdk_ohos_download_url=$(query_component "ohos-sdk-public_ohos" | jq -r ".data.list.dataList[0].obsPath")
curl $sdk_ohos_download_url -o ohos-sdk-public_ohos.tar.gz

mkdir ./ohos-sdk
tar -zxf ohos-sdk-public.tar.gz -C ./ohos-sdk
tar -zxf ohos-sdk-public_ohos.tar.gz -C ./ohos-sdk

cd ./ohos-sdk/linux/
unzip -q toolchains-*.zip
cd ../../

cd ./ohos-sdk/ohos/
unzip -q toolchains-*.zip
cd ../../

mkdir -p ./platform/linux-x64 ./platform/openharmony-arm64
cp ./ohos-sdk/linux/toolchains/lib/binary-sign-tool ./platform/linux-x64/binary-sign-tool
cp ./ohos-sdk/ohos/toolchains/lib/binary-sign-tool ./platform/openharmony-arm64/binary-sign-tool

rm -rf ./ohos-sdk *.tar.gz

# This tool will run on OpenHarmony, so it also needs to be signed.
./platform/linux-x64/binary-sign-tool sign \
    -selfSign 1 \
    -inFile ./platform/openharmony-arm64/binary-sign-tool \
    -outFile ./platform/openharmony-arm64/binary-sign-tool

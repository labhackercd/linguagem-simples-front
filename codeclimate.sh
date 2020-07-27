#!/bin/bash

#sudo bash install.sh

echo "[INFO]Instalando before script codeclimate"

yarn global add nyc
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
chmod +x ./cc-test-reporter
./cc-test-reporter before-build

echo "[INFO]Instalação before script codeclimate realizada"
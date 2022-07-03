#!/bin/bash
node bin/upload-pay-s3.mjs -s dev
#node bin/upload-client-app-s3.mjs -s dev
cdk --app "node bin/MenuStack-cdk.mjs -s dev" deploy
#node bin/upload-client-APP_VERSION-s3.mjs -s dev
#node bin/clean-client-s3.mjs -s dev

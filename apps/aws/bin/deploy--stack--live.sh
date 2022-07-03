#!/bin/bash
node bin/upload-pay-s3.mjs -s live
#node bin/upload-client-app-s3.mjs -s live
cdk --app "node bin/MenuStack-cdk.mjs -s live" deploy
#node bin/upload-client-APP_VERSION-s3.mjs -s live
#node bin/clean-client-s3.mjs -s live

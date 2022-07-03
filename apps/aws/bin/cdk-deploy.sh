#!/bin/sh
AWS_DIR="$(cd $(dirname $(pwd)) && pwd)"
pushd $AWS_DIR
cdk --app "node bin/MenuStack-cdk.mjs $@" deploy
popd

ne# @menus/aws

## 4.4.2

### Patch Changes

- fix: hoisting issue: use target: es2019

## 4.4.1

### Patch Changes

- Use Distribution & S3Origin

      https://aws-cdk.com/deploying-a-static-website-using-s3-and-cloudfront/

## 4.4.0

### Minor Changes

- \_Ctx interfaces

## 4.3.15

### Patch Changes

- - LIVE_NEW_RELIC_APP_NAME,LIVE_NEW_RELIC_LICENSE_KEY,DEV_NEW_RELIC_APP_NAME,DEV_NEW_RELIC_LICENSE_KEY

## 4.3.14

### Patch Changes

- - new-relic

## 4.3.13

### Patch Changes

- - get

## 4.3.12

### Patch Changes

- fix: menusappbuilder_Instance\$\_b: instantiation

## 4.3.11

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 4.3.10

### Patch Changes

- upload-client=>{upload-client-assets-s3, + upload-client-APP_VERSION-s3}
- deploy--stack: delay uploading APP_VERSION to end of deployment

## 4.3.9

### Patch Changes

- pay.menu.com: + /.well-known/apple-developer-merchantid-domain-association

## 4.3.8

### Patch Changes

- fix: pay.menu.com,dev.pay.menu.com: upload: /index.html

## 4.3.7

### Patch Changes

- fix: pay_apigateway_b: local_az_certificate

## 4.3.6

### Patch Changes

- fix: pay_distribution_b,pay_apigateway_b: use aws_certificate_b

## 4.3.5

### Patch Changes

- fix: pay_distribution: certificate

## 4.3.4

### Patch Changes

- pay.menu.com: index.html instead of pay.html

## 4.3.3

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 4.3.2

### Patch Changes

- body**POST**ApiOwner-a-pi: increased POST body to 8MB,+ body**POST**qt-image-act-upload,+ body**POST**
  api-b-cfu_mi-aspx

      	    https://trello.com/c/LesdG1vr/2168-image-uploading-in-s3-temporary-use-rule-on-firewall

## 4.3.1

### Patch Changes

- fix: api_apigateway: + binaryMediaTypes: multipart/form-data

## 4.3.0

### Minor Changes

- build-app: build-app.js->build-app.mjs,fix-app-symlinks.js->fix-app-symlinks.sh

## 4.2.4

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change \$serviceType: .restaurant-info: flash of
  inconsistent ETA issue

## 4.2.3

### Patch Changes

- update dependencies

## 4.2.2

### Patch Changes

- fix: images_assets_bucket_b: api_user: add managed policy

## 4.2.1

### Patch Changes

- live.images.menu.com instead of images.menu.com

## 4.2.0

### Minor Changes

- feat: + images_apigateway_b,images_distribution_b

## 4.1.0

### Minor Changes

- feat: api_s3_policy_b: s3:\* permissions

## 4.0.0

### Major Changes

- BREAKING CHANGE: restaurant.menu.com->images.menu.com,dev.restaurant.menu.com->dev.images.menu.com

## 3.2.0

### Minor Changes

- feat: api_gateway_b: throttlingBurstLimit: 500,RateLimitedApiKey throttle burstLimit: 20

## 3.1.0

### Minor Changes

- 8884433c3: feat: api_ec2_security_group_b

### Patch Changes

- fix: api_apigateway_b: NetworkTargetGroup is listening to port 443 (https) on the EC2 instance
- fix: api_apigateway_b: api_proxy_integration & api_apigateway_b {proxy} configuration

## 3.0.0

### Major Changes

- BREAKING CHANGE: stack_vpc_b instead of vpc_b

### Minor Changes

- feat: api_vpc_b,transit_gateway_b
- feat: MenuConstruct: + api_apigateway_b

## 2.6.0

### Minor Changes

- feat: + api_s3_policy_b,api_user_b

## 2.5.0

### Minor Changes

- feat: images_assets_bucket_b

## 2.4.0

### Minor Changes

- feat: npm run make_executable

## 2.3.0

### Minor Changes

- feat: deployment: + upload-client-s3.js,clean-client-s3.js

## 2.2.1

### Patch Changes

- fix: CfnOutput: api-fqdn,web-fqdn: unique output name
- api_proxy_integration: + method.request.path.proxy
- fix: api_host: dev environment: dev.api.menu.com
- fix: deploy--stack--dev.sh,deploy--stack--live.sh: syntax error

## 2.2.0

### Minor Changes

- feat: apigateway for api

## 2.1.0

### Minor Changes

- feat: deploy--stack--dev.sh,deploy--stack--live.sh: -t flag to set step

## 2.0.0

### Major Changes

- Deployment process: serve assets directly from lambda while S3 assets are being uploaded to avoid caching 404 response

      	    https://trello.com/c/1nT0LEcV/1964-deployment-process-serve-assets-directly-from-lambda-while-s3-assets-are-being-uploaded-to-avoid-caching-404-response

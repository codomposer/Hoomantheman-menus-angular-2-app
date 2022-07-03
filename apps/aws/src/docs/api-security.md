# AWS WAF (api-{stage}-security) stack

> AWS WAF is a web application firewall that enables customers to quickly create custom, application-specific rules
> that block common attack patterns that can affect application availability, compromise security, or consume excessive resources. AWS WAF can be completely administered via APIs that make security automation easy, enabling rapid rule propagation and fast incident response.

See https://aws.amazon.com/solutions/implementations/aws-waf-security-automations/ for a full description of the WAF
service.

## Stack Configuration

https://aws.amazon.com/solutions/implementations/aws-waf-security-automations/

Select the correct Availability Zone is selected (us-west-2)

### Changes from Default Template

Activate AWS Managed Rules Protection: true

Activate HTTP Flood Protection: yes - Amazon Athena log parser

Activate Scanner & Probe Protection: yes - Amazon Athena log parser

Endpoint Type: ALB

Application Access Log Bucket Name: {stage}.api.menu.com-security

## Other Resources

[awslabs/aws-waf-security-automations github](https://github.com/awslabs/aws-waf-security-automations)

## WAF Logs

* Open the Console
* AWS WAF
* Web ACLs
* {stage}-api-security

### api-{stage}-security Dashboard

https://console.aws.amazon.com/wafv2/homev2/web-acl/dev-api-security/f5d10045-17d7-4325-8d17-71b4f0b21316/overview?region=us-west-2

### api-{stage}-security Configuration

* Navigate to VPC > NAT Gateways > menu-{stage}-stack: Copy Elastic IP Address
* Navigate to WAF & Shield > IP sets: Select Region: us-west-2
* Select "Allow whitelist for IPV4 addresses"
* Add IP Address
* Paste IP Address from VPC > NAT Gateways > menu-{stage}-stack: Copy Elastic IP Address

WIP: CDK work: see stack_vpc_b.ts

### Rules

https://docs.aws.amazon.com/cli/latest/reference/wafv2/index.html

https://docs.aws.amazon.com/cli/latest/reference/wafv2/update-web-acl.html

Set the `--rules` json with the complete list of rules for the WAF.

The current `rules` array can be found in [dev-api-security.json](../waf/dev-api-security.json). This file should be
updated whenever a rulechange occurs. 

import aws_sdk from 'aws-sdk'
const { S3 } = aws_sdk
import type { ips_json_result_T } from './get_cloudflare_ip_list';
import { get_update_ipv6 } from './get_update_ipv6';
const s3 = new S3();
/**
 * Update S3 policies
 */
export async function update_s3_policies_policies(ip_addresses: ips_json_result_T) {
  console.info('Checking policies of S3');
  const S3_CLOUDFLARE_SID = process.env.S3_CLOUDFLARE_SID;
  if (!S3_CLOUDFLARE_SID) {
    console.info("Not configured 'S3_CLOUDFLARE_SID' variable, so will not check S3");
    return;
  }
  const S3_BUCKET_IDS_LIST = process.env.S3_BUCKET_IDS_LIST;
  if (!S3_BUCKET_IDS_LIST) {
    throw "Missing S3 basic configuration 'S3_BUCKET_IDS_LIST' or 'S3_BUCKET_ID'.";
  }
  const ipv4 = ip_addresses.ipv4_cidrs;
  const ipv6 = ip_addresses.ipv6_cidrs;
  const cloudflare_ips =
    get_update_ipv6()
      ? [...ipv4, ...ipv6]
      : ipv4;
  const sid = process.env.S3_CLOUDFLARE_SID;
  let s3_policytup = await Promise.all(S3_BUCKET_IDS_LIST.split(',').map(
    s3_id => get_aws_s3_bucket_policy(s3_id)
  ));
  if (!s3_policytup?.length) {
    s3_policytup = [await get_aws_s3_bucket_policy(process.env.S3_BUCKET_ID)];
  }
  for (const s3tup of s3_policytup) {
    const s3_id = s3tup.id;
    console.info(`Checking Policy of S3 Bucket '${s3_id}'`);
    const policy = JSON.parse(s3tup[s3_id]);
    if (!('Statement' in policy)) {
      throw `Problem reading policy of S3 Bucket '${s3_id}'`;
    }
    let updated = false;
    for (const statement of policy.Statement) {
      if (!('Sid' in statement)) {
        throw `Problem reading Sid inside Statement of S3 Bucket '${s3_id}'`;
      }
      if (
        statement.Sid !== sid
        || !('Condition' in statement)
        || !('IpAddress' in statement.Condition)
        || !('aws:SourceIp' in statement.Condition.IpAddress)
      ) {
        continue;
      }
      statement.Condition.IpAddress['aws:SourceIp'] = cloudflare_ips;
      updated = true;
    }
    if (updated) {
      console.info(`Going to update policy ${s3_id}`);
      s3.putBucketPolicy({
        Bucket: s3_id,
        Policy: JSON.stringify(policy)
      });
    }
  }
}
/**
 * Return the Policy of an S3
 */
export async function get_aws_s3_bucket_policy(s3_id: string) {
  const result = await s3.getBucketPolicy({
    Bucket: s3_id
  }).promise();
  if (!('Policy' in result)) {
    throw `Failed to retrieve Policy from S3 ${s3_id}`;
  }
  const policy = result.Policy;
  return { id: s3_id, s3_id: policy };
}

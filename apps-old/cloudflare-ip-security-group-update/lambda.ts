import { get_cloudflare_ip_list } from './get_cloudflare_ip_list.js'
import { update_security_group_policies } from './update_security_group_policies.js'
import { update_s3_policies_policies } from './update_s3_policies_policies.js'
export async function handler() {
  const ip_addresses = await get_cloudflare_ip_list()
  await update_security_group_policies(ip_addresses)
  await update_s3_policies_policies(ip_addresses)
}

export async function get_cloudflare_ip_list() {
  const ips_response = await fetch('https://api.cloudflare.com/client/v4/ips')
  const ips_json = await ips_response.json() as ips_json_T
  const { result } = ips_json
  if (!result) {
    console.error(JSON.stringify(ips_json, null, 2))
    throw 'Cloudflare response error'
  }
  return result
}
export interface ips_json_T {
  result:ips_json_result_T,
}
export interface ips_json_result_T {
  ipv4_cidrs:string[]
  ipv6_cidrs:string[]
  etag:string
  success:boolean
  errors:string[]
  messages:string[]
}

export function get_update_ipv6() {
  return !!parseInt(process.env.UPDATE_IPV6 || '1');
}

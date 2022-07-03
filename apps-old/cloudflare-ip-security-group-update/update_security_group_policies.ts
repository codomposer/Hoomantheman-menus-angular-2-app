import EC2, { IpPermission, SecurityGroup } from 'aws-sdk/clients/ec2';
import type { ips_json_result_T } from './get_cloudflare_ip_list';
import { get_update_ipv6 } from './get_update_ipv6';
const ec2 = new EC2();
export async function update_security_group_policies(ip_addresses: ips_json_result_T) {
  console.info('Checking policies of Security Groups');
  const security_group_id_list = process.env.SECURITY_GROUP_IDS_LIST;
  if (!security_group_id_list) {
    console.error('Missing environment variables SECURITY_GROUP_IDS_LIST and SECURITY_GROUP_ID. Will not update security groups.');
    return;
  }
  const security_groups = await Promise.all(
    security_group_id_list.split(',').map(group_id =>
      get_aws_security_group(group_id)
    ));
  const PORTS_LIST = process.env.PORTS_LIST || '80,443';
  const ports = PORTS_LIST.split(',').map(port_str => parseInt(port_str));
  if (!ports.every(port => typeof port === 'number') || !security_groups) {
    throw 'At least one TCP port and one security group ID are required.';
  }
  for (const security_group of security_groups) {
    const current_rules = security_group.IpPermissions;
    // add new addresses
    for (const ipv4_cidr of ip_addresses.ipv4_cidrs) {
      for (const port of ports) {
        if (await check_ipv4_rule_exists(current_rules, ipv4_cidr, port)) {
          await add_rule(security_group, ipv4_cidr, port);
        }
      }
    }
    // remove old addresses
    for (const port of ports) {
      for (const rule of current_rules) {
        // is it necessary/correct to check both From and To?
        if (rule.IpProtocol === 'tcp' && rule.FromPort === port && rule.ToPort === port) {
          for (const ip_range of rule.IpRanges) {
            if (!~ip_addresses.ipv4_cidrs.indexOf(ip_range.CidrIp)) {
              await delete_rule(security_group, ip_range.CidrIp, port);
            }
          }
        }
      }
    }
    if (get_update_ipv6()) {
      for (const ipv6_cidr of ip_addresses.ipv6_cidrs) {
        for (const port of ports) {
          if (!check_ipv6_rule_exists(current_rules, ipv6_cidr, port)) {
            await add_rule(security_group, ipv6_cidr, port);
          }
        }
      }
      for (const port of ports) {
        for (const rule of current_rules) {
          if (rule.IpProtocol === 'tcp' && rule.FromPort === port && rule.ToPort === port) {
            for (const ip_range of rule.Ipv6Ranges) {
              if (!~ip_addresses.ipv6_cidrs.indexOf(ip_range.CidrIpv6)) {
                await delete_rule(security_group, ip_range.CidrIpv6, port)
              }
            }
          }
        }
      }
    } else {
      console.info('Not updating IPv6 ranges in security groups.')
    }
  }
}
async function get_aws_security_group(group_id) {
  const describeSecurityGroups_response = await ec2.describeSecurityGroups().promise();
  return describeSecurityGroups_response.SecurityGroups.find(security_group =>
    security_group.GroupId === group_id
  );
}
async function check_ipv4_rule_exists(rules: IpPermission[], address: string, port: number) {
  for (const rule of rules) {
    for (const ip_range of rule.IpRanges) {
      if (ip_range.CidrIp === address && rule.FromPort === port) {
        return true;
      }
    }
  }
  return false;
}
/**
 * Add the IP address/port to the security group
 */
async function add_rule(group: SecurityGroup, address: string, port: number) {
  await ec2.authorizeSecurityGroupIngress({
    IpProtocol: 'tcp',
    CidrIp: address,
    FromPort: port,
    ToPort: port,
    GroupName: group.GroupName,
  }).promise();
  console.info(`Added ${address} : ${port} to ${group.GroupId} (${group.GroupName}) `);
}
/**
 * Remove the IP address/port from the security group
 */
async function delete_rule(group: SecurityGroup, address: string, port: number) {
  await ec2.revokeSecurityGroupIngress({
    IpProtocol: 'tcp',
    CidrIp: address,
    FromPort: port,
    ToPort: port,
    GroupName: group.GroupName,
  });
  console.info(`Removed ${address} : ${port} from ${group.GroupId} (${group.GroupName})`);
}
/**
 * Check if the rule currently exists
 */
function check_ipv6_rule_exists(rules: IpPermission[], address: string, port: number) {
  for (const rule of rules) {
    for (const ip_range of rule.Ipv6Ranges) {
      if (ip_range.CidrIpv6 === address && rule.FromPort === port) {
        return true;
      }
    }
  }
  return false;
}

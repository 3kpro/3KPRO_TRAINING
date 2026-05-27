# Virtual Networking

Azure Virtual Network (VNet) is the fundamental building block for your private network in Azure.

## Key Features

- **Subnets:** VNets can be segmented into subnets to organize resources and control traffic flow.
- **Network Security Groups (NSGs):** Act as virtual firewalls to filter inbound and outbound traffic to network interfaces and subnets.
- **VNet Peering:** Connects two VNets seamlessly so they appear as a single network.

## Example Architecture
You might have a `Frontend-Subnet` for web servers (accessible from the internet) and a `Backend-Subnet` for databases (only accessible from the `Frontend-Subnet`).

# Master Class: Virtual Networking

The Virtual Network (VNet) is the backbone of your Azure infrastructure. To master networking, you must understand **IP Subnetting**, **Network Security Groups (NSGs)**, and **Peering**.

## 1. VNet Architecture Breakdown

A VNet is a private address space (e.g., `10.0.0.0/16`). You carve this space into **Subnets**.

### Common Subnet Patterns
- **GatewaySubnet:** Reserved for VPN/ExpressRoute gateways.
- **AzureFirewallSubnet:** Reserved for Azure Firewall.
- **AppSubnets:** Where your actual VMs and App Services live.

---

## 2. Security: Network Security Groups (NSGs)

An NSG is a distributed stateful firewall. You apply rules to either a **Network Interface (NIC)** or a **Subnet**.

### Master Rule: The Priority System
Rules are processed in order from **100 to 65000**. Once a match is found, processing stops.

| Priority | Name | Port | Action |
| :--- | :--- | :--- | :--- |
| **100** | AllowSSH | 22 | Allow |
| **200** | AllowHTTP | 80 | Allow |
| **65000** | DenyAll | Any | Deny |

### Application Security Groups (ASGs)
Don't use IP addresses in NSG rules. Use ASGs to group VMs by function (e.g., "WebServers", "DBServers") and write rules like `Allow WebServers to DBServers on Port 1433`.

---

## 3. Connectivity: Peering and Hub-and-Spoke

How do you connect two VNets?
1. **VNet Peering:** Low-latency, high-bandwidth connection. Traffic stays on the Microsoft backbone.
2. **Hub-and-Spoke:** The "Enterprise Standard".
    - **Hub:** Contains shared resources (Firewall, VPN Gateway, Domain Controllers).
    - **Spokes:** Individual application VNets that peer to the Hub.

---

## 4. Name Resolution: Azure DNS

- **Public DNS:** Resolving `3kpro.com` to an Azure IP.
- **Private DNS:** Resolving `db01.internal` within your VNet. You don't need to manage a DNS server; Azure handles it automatically.

---

## 5. Master Commands (Azure CLI)

```bash
# Create a VNet
az network vnet create -g 3kpro-rg -n main-vnet --address-prefix 10.0.0.0/16

# Create a Subnet
az network vnet subnet create -g 3kpro-rg --vnet-name main-vnet -n web-subnet --address-prefix 10.0.1.0/24

# Check NSG effective rules
az network nic show-effective-nsg -g 3kpro-rg -n my-vm-nic
```

---

## 6. Summary Checklist
- [ ] Are you using a Firewall or NVA to inspect outbound traffic?
- [ ] Is your `GatewaySubnet` at least a `/27` or `/26`?
- [ ] Have you disabled "Public IPs" for your backend servers?

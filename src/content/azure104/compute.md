# Master Class: Compute Resources

Azure Compute is where your code executes. To master compute, you must understand the **Scaling Models**, **Availability Options**, and the **Shared Responsibility Matrix**.

## 1. The Compute Continuum

| Model | Type | Management | Use Case |
| :--- | :--- | :--- | :--- |
| **VMs** | IaaS | High | Legacy apps, custom OS needs. |
| **App Service**| PaaS | Low | Web apps, APIs. |
| **Functions** | FaaS | Minimal | Event-driven code (Serverless). |
| **AKS** | Container | Medium | Microservices at scale. |

---

## 2. Virtual Machines: Availability and SLA

A single VM has a 99.9% SLA (with Premium SSD). To get higher availability, you need:

1. **Availability Sets:** Protects against hardware failure in a single Data Center (FD/UD).
2. **Availability Zones:** Protects against entire Data Center failure (separate buildings).
3. **Scale Sets:** Automatically adds/removes VMs based on CPU usage.

---

## 3. App Service Master Class

App Services run inside an **App Service Plan (ASP)**.
- Think of the ASP as the "Server Hardware" and the App Service as the "Website".
- You can run 10 websites on 1 ASP to save money.

### Deployment Slots
A master feature of App Service.
- Create a `staging` slot.
- Deploy and test your code there.
- **Swap** it with `production`. This results in **Zero-Downtime** deployments.

---

## 4. Azure Kubernetes Service (AKS)

AKS manages the Control Plane for you for free. You only pay for the Worker Nodes.

### Key Features
- **Auto-scaler:** Adds nodes when the cluster is full.
- **Azure AD Integration:** Use Entra ID to control who can access the cluster.
- **Azure Disk/File Integration:** Mount storage to Pods with one line of YAML.

---

## 5. Master Commands: VM Management

```bash
# List all VMs in a table format
az vm list -d -o table

# Resize a VM (requires restart)
az vm resize -g 3kpro-rg -n web-vm --size Standard_D4s_v3

# Get the Public IP of a VM
az vm list-ip-addresses -g 3kpro-rg -n web-vm
```

---

## 6. Summary Checklist
- [ ] Are you using Reserved Instances to save up to 70% on VM costs?
- [ ] Have you enabled "Auto-shutdown" for development VMs?
- [ ] Are you monitoring "CPU Credits" for B-series (Burstable) VMs?

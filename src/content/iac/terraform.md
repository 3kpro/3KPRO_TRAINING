# Master Class: Terraform Basics & State Management

Terraform is the industry standard for cloud-agnostic IaC. To master Terraform, you must understand **HCL (HashiCorp Configuration Language)** and the **State Locking** mechanism.

## 1. HCL Structure Breakdown

A typical Terraform file consists of **Blocks**.

```hcl
# 1. Provider Block: Defines the API connection
provider "azurerm" {
  features {}
}

# 2. Resource Block: Defines WHAT to build
resource "azurerm_resource_group" "main" {
  name     = "3kpro-rg" # Argument
  location = "West US"
}

# 3. Variable Block: Input for customization
variable "vm_size" {
  default = "Standard_B2s"
}
```

### Visual Breakdown of Resource syntax
`resource "TYPE" "LOCAL_NAME" { ... }`
- **TYPE:** Maps to the API (e.g., `azurerm_virtual_network`).
- **LOCAL_NAME:** How you reference this object *inside* your code (e.g., `main`).

---

## 2. The Terraform State (`.tfstate`)

The state file is a JSON map of your configuration to the real-world resources.

### Why is State needed?
1. **Mapping:** Cloud providers often return random IDs (e.g., `vm-12345`). Terraform needs to know that `azurerm_linux_virtual_machine.web` = `vm-12345`.
2. **Performance:** Querying the Cloud API for 1,000 resources is slow. Reading a local state file is fast.
3. **Dependency Tracking:** It knows what to delete and in what order.

### Warning: Secrets in State
Terraform state is stored in plain text. If you define a DB password in your code, it WILL be in the `.tfstate` file. **Never commit `.tfstate` to Git.**

---

## 3. Remote State and Locking (Team Work)

In a professional environment, you use **Remote Backends** (Azure Blob, AWS S3).

- **Locking:** When you run `terraform apply`, Terraform "locks" the state. This prevents two developers from trying to update the same infrastructure at once, which would corrupt the state.

---

## 4. Terraform Workflow Master Breakdown

1. **`terraform init`**: Downloads providers and sets up the backend.
2. **`terraform validate`**: Checks for syntax and logic errors.
3. **`terraform plan`**: Shows exactly what will be Created (+), Updated (~), or Destroyed (-).
4. **`terraform apply`**: Executes the changes.
5. **`terraform output`**: Extracts data (like an IP address) for use in scripts.

---

## 5. Master Tip: Use Modules
Don't write 5,000 lines in one file. Use **Modules** to create reusable blueprints.

```hcl
module "network" {
  source = "./modules/network"
  vnet_cidr = "10.0.0.0/16"
}
```

## 6. Checklist
- [ ] Are you using a Remote Backend with State Locking?
- [ ] Is your `.gitignore` blocking `.terraform/` and `*.tfstate`?
- [ ] Are you using `terraform fmt` to keep your code clean?

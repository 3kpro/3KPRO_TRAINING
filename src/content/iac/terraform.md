# Terraform Basics & State Management

Terraform is an infrastructure as code tool that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share.

## The Terraform Workflow
1. **Write:** Define infrastructure in `.tf` files.
2. **Plan:** Review the changes Terraform will make (`terraform plan`).
3. **Apply:** Provision the infrastructure (`terraform apply`).

## State Management
Terraform must store state about your managed infrastructure and configuration. This state is used by Terraform to map real world resources to your configuration.

- **Local State:** Stored locally in a `terraform.tfstate` file.
- **Remote State:** Stored in a remote backend (like AWS S3 or Azure Blob Storage) for team collaboration and locking.

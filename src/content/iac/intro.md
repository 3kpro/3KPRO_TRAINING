# Declarative vs. Imperative IaC

Infrastructure as Code (IaC) is the process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

## Imperative Approach
You specify **how** you want the infrastructure to be created. You list the exact steps the system needs to take.
*Example: Bash or PowerShell scripts.*

## Declarative Approach
You specify **what** the final state of the infrastructure should be, and the tool figures out how to achieve that state.
*Example: Terraform, Azure Bicep, AWS CloudFormation.*

Declarative is generally preferred for its idempotency and easier state management.

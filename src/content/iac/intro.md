# Master Class: Declarative vs. Imperative IaC

To truly master Infrastructure as Code, you must move beyond "running scripts" and understand the **State-Driven Philosophy**.

## 1. The Core Conflict: Scripting vs. Management

### Imperative (The "How")
- **Definition:** You write a list of steps to achieve a result.
- **Analogy:** A recipe. "Step 1: Buy eggs. Step 2: Crack eggs. Step 3: Fry eggs."
- **Example:** Azure CLI or PowerShell scripts.
- **Risk:** If Step 1 fails, Step 2 might still run. If you run the script twice, you get two sets of infrastructure (Not Idempotent).

### Declarative (The "What")
- **Definition:** You define the final desired state. The tool figures out how to get there.
- **Analogy:** A thermostat. "I want it to be 72 degrees." (The heater or AC turns on/off automatically to maintain it).
- **Example:** Terraform, Azure Bicep.
- **Benefit:** Running it 100 times results in the same infrastructure (Idempotent).

---

## 2. Infrastructure Lifecycle Breakdown

Mastering IaC requires understanding the 4 stages of a resource:

1. **Definition:** Code is written in HCL (Terraform) or Bicep.
2. **Plan (Dry Run):** The tool compares the Code to the Real World (or State File).
3. **Execution (Apply):** The tool makes the API calls to the Cloud Provider.
4. **Destruction:** The tool removes the resources and cleans up dependencies.

---

## 3. The Power of Idempotency: Visual Breakdown

| Action | Imperative Script | Declarative Tool |
| :--- | :--- | :--- |
| **Run 1** | Creates VM-01 | Creates VM-01 |
| **Run 2** | Creates VM-02 (Error/Duplicate) | Does nothing (State matches) |
| **Change Name** | Fails or manual rename | Replaces or Renames VM-01 |

---

## 4. Advanced Concepts

### Drift Detection
When someone manually changes a resource in the Azure Portal (The "click-ops" sin), the declarative tool detects the "drift" between the State and the Real World and offers to fix it during the next `plan`.

### Resource Dependency Graph
Declarative tools build a **Directed Acyclic Graph (DAG)**.
- If a VM needs a Subnet, and the Subnet needs a VNet.
- The tool knows to build VNet -> Subnet -> VM.
- In imperative scripts, you have to handle this order manually.

---

## 5. Master Challenge
1. Why is a State File dangerous to lose?
2. What happens if you try to manage a resource manually AND with IaC?

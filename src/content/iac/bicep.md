# Master Class: Azure Bicep Fundamentals

Azure Bicep is the evolution of ARM Templates. It's a Domain Specific Language (DSL) specifically designed for Azure. To master Bicep, you must understand **Symbolic References**, **Type Safety**, and the **Build Process**.

## 1. Bicep vs. ARM JSON

| Feature | ARM JSON | Azure Bicep |
| :--- | :--- | :--- |
| **Syntax** | Verbose, many quotes | Clean, readable, Python-like |
| **Dependencies** | Manual `dependsOn` | Automatic via symbolic links |
| **Type Safety** | Low | High (IntelliSense) |
| **Modules** | Complex | Extremely simple |

---

## 2. Anatomy of a Bicep Resource

```bicep
// 1. Parameter Block (Inputs)
param appName string = '3kpro-app'

// 2. Resource Block (The 'What')
resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: '${appName}store' // String interpolation
  location: resourceGroup().location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}

// 3. Output Block (Exports)
output storageId string = storage.id
```

### Visual Breakdown: Symbolic References
In the example above, `storage` is the **Symbolic Name**.
If you create a VM that needs this storage, you just type `storage.id`. Bicep automatically detects that the VM depends on the Storage Account and will build them in the correct order. No manual `dependsOn` needed!

---

## 3. Advanced: Modules and Scope

Mastering Bicep means leveraging **Modules** for standardization.

```bicep
module myVnet './networking.bicep' = {
  name: 'vnetDeploy'
  params: {
    addressSpace: '10.0.0.0/16'
  }
}
```

### Deployment Scopes
Bicep can deploy to different levels:
- **Resource Group (Default):** Create VMs, DBs.
- **Subscription:** Create Resource Groups, RBAC roles.
- **Management Group:** Apply policies.
- **Tenant:** Create AD groups.

---

## 4. The Bicep Lifecycle

1. **Write:** Author `.bicep` files.
2. **Build:** Bicep is "transpiled" into ARM JSON (`az bicep build`).
3. **Deploy:** Use Azure CLI or PowerShell (`az deployment group create`).
4. **What-If:** A visual dry-run command that shows what will change (`--confirm-with-what-if`).

---

## 5. Master Tip: Use the Visualizer
If you use VS Code, use the **Bicep Visualizer** to see a live architectural diagram of your code as you write it.

---

## 6. Summary Checklist
- [ ] Are you using `param` for everything that changes between environments?
- [ ] Are you using `existing` keyword to reference resources built outside your code?
- [ ] Have you mastered the `what-if` command to prevent deployment errors?

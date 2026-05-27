# Azure Bicep Fundamentals

Bicep is a domain-specific language (DSL) that uses declarative syntax to deploy Azure resources. It provides concise syntax, reliable type safety, and support for code reuse.

## Why Bicep?
- Cleaner syntax compared to ARM JSON templates.
- First-class integration with Azure.
- Built-in type safety and IntelliSense.

## Example Bicep File

```bicep
param location string = resourceGroup().location

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'mystorageaccount123'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}
```

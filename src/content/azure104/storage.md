# Master Class: Storage Accounts

Azure Storage is a massively scalable, durable, and available cloud storage solution. To master storage, you must understand **Redundancy Levels**, **Access Tiers**, and **Security Protocols**.

## 1. Redundancy: Protecting Your Data

Azure always stores multiple copies of your data.

| Level | Name | Copies | Protection Against |
| :--- | :--- | :--- | :--- |
| **LRS** | Local Redundancy | 3 | Disk/Rack failure in 1 DC. |
| **ZRS** | Zone Redundancy | 3 | Entire Data Center failure. |
| **GRS** | Geo Redundancy | 6 | Region-wide disaster. |

---

## 2. Access Tiers Master Class

Optimize costs by placing data in the correct tier based on how often it's used.

- **Hot:** High cost to store, low cost to access. (Current data).
- **Cool:** Lower cost to store, higher cost to access. (Backups/Archived logs).
- **Archive:** Lowest cost to store, extremely high cost to access (and takes hours to retrieve).

### Lifecycle Management
A master move is to automate this.
- **Rule:** If a file hasn't been touched in 30 days, move to Cool.
- **Rule:** If it hasn't been touched in 180 days, move to Archive.

---

## 3. Security: SAS vs. Access Keys

Never share your **Access Keys**. They provide full administrative control.

### Shared Access Signatures (SAS)
A SAS is a URL that grants limited access to a specific resource for a limited time.
- **Example:** Grant "Read Only" access to `image.png` for exactly 2 hours.

### Encryption
- **At Rest:** Automatically encrypted by Azure.
- **In Transit:** Enforced via the "Secure transfer required" setting.

---

## 4. Storage Services Breakdown

1. **Blobs:** For unstructured data (Images, VHDs).
2. **Files:** SMB/NFS shares (Mountable drives for VMs).
3. **Queues:** Messaging between apps.
4. **Tables:** NoSQL key-value store.

---

## 5. Master Commands: Storage CLI

```bash
# Create a storage account
az storage account create -n 3kprostore -g 3kpro-rg --sku Standard_LRS

# List the access keys
az storage account keys list -n 3kprostore -g 3kpro-rg

# Upload a file to a blob container
az storage blob upload --account-name 3kprostore -c mycontainer -f backup.tar.gz -n backup.tar.gz
```

---

## 6. Summary Checklist
- [ ] Have you disabled "Public Access" on your Storage Account?
- [ ] Are you using ZRS for critical production data?
- [ ] Have you enabled "Soft Delete" to protect against accidental deletion?

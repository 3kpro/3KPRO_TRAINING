# Master Class: Managing Azure Identities (Entra ID)

Identity is the "New Perimeter". In the cloud, IP addresses and firewalls are secondary; Identity is the primary gatekeeper. To master Entra ID, you must understand **Authentication vs. Authorization**, **Service Principals**, and **Conditional Access**.

## 1. Authentication (AuthN) vs. Authorization (AuthZ)

- **Authentication:** Proving you are who you say you are (Username/Password, MFA, Biometrics).
- **Authorization:** Determining what you are allowed to do (RBAC, Scopes).

---

## 2. RBAC Master Class: Scope and Inheritance

Azure RBAC uses a hierarchy. Permissions flow from the top down.

1. **Management Group:** (Global Policies)
2. **Subscription:** (Billing and high-level access)
3. **Resource Group:** (The logical container for your app)
4. **Resource:** (The individual VM, DB, or Storage Account)

**Master Principle: The Principle of Least Privilege (PoLP)**
Never give "Owner" at the Subscription level if someone only needs "Contributor" on one Resource Group.

| Role | Description |
| :--- | :--- |
| **Owner** | Full access, including the ability to grant access to others. |
| **Contributor** | Can create and manage resources, but cannot grant access to others. |
| **Reader** | Can view resources, but cannot make changes. |

---

## 3. Identities: Users, Groups, and Service Principals

- **Users:** Actual people.
- **Groups:** Managing groups is more efficient than managing users. Assign RBAC to the Group, then add/remove users from that group.
- **Service Principals:** Identities for *applications*. If your GitHub Actions needs to deploy to Azure, it uses a Service Principal, not a user account.
- **Managed Identities:** The ultimate security master move. The identity is "attached" to an Azure resource (like a VM). The VM can then talk to a Database without ever needing a password stored in the code.

---

## 4. Conditional Access: Visual Logic

Conditional Access is an "If-Then" statement for security.

`IF [User] [Location] [Device] [App] THEN [Grant/Block/Require MFA]`

- **Example:** IF User is in "HR Group" AND Location is "Outside Office" THEN "Require MFA".
- **Example:** IF Device is "Not Compliant" THEN "Block Access".

---

## 5. Summary Checklist
- [ ] Are you using MFA for every single user?
- [ ] Have you audited your "Guest Users" recently?
- [ ] Are you using Privileged Identity Management (PIM) for "Just-In-Time" access?

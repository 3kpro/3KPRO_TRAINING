# Master Class: Writing Reusable Scripts

A script is more than a list of commands; it is a **program**. To master scripting, you must understand **Exit Codes**, **Parameter Validation**, and **Scoping**.

## 1. The Anatomy of a Master Script

### Bash (The Shebang and Strict Mode)
```bash
#!/bin/bash
set -euo pipefail
# -e: Exit immediately if a command fails
# -u: Exit if an unset variable is used
# -o pipefail: Pipeline fails if ANY command in it fails
```

### PowerShell (The CmdletBinding)
```powershell
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$Path
)
```

---

## 2. Parameter Validation Breakdown

Don't let your script crash because of bad input. Validate early.

**Bash:**
```bash
if [[ ! -d "$1" ]]; then
  echo "Error: $1 is not a directory."
  exit 1
fi
```

**PowerShell:**
```powershell
param(
    [ValidateSet("Dev", "Prod")]
    [string]$Environment
)
```

---

## 3. Exit Codes: Communicating with the OS

Scripts should return a status code to tell the caller if they succeeded.
- `0`: Success.
- `1-255`: Failure (Specific codes for specific errors).

**Visual Breakdown of `&&` and `||` logic:**
- `command1 && command2`: Run command2 ONLY if command1 returns `0`.
- `command1 || command2`: Run command2 ONLY if command1 returns non-zero.

---

## 4. Master Level: Logging and Verbosity

A master script is silent by default but verbose when asked.

```powershell
if ($PSBoundParameters.ContainsKey('Verbose')) {
    Write-Verbose "Starting backup of $Path..."
}
```

---

## 5. Security: Handling Credentials

**NEVER** hardcode passwords in a script.

1. **Environment Variables:** `export DB_PASS=...`
2. **Secrets Managers:** Use CLI tools for Azure Key Vault or AWS Secrets Manager.
3. **PowerShell SecretManagement:** `Get-Secret -Name "MyPass"`

---

## 6. Summary Checklist
- [ ] Are your variables descriptive (avoid `$a`, `$b`)?
- [ ] Is there a `--help` or `Get-Help` description?
- [ ] Does the script clean up temporary files in an `EXIT` trap or `finally` block?

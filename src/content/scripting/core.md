# Master Class: Core PowerShell & Bash Commands

To master cross-platform administration, you must understand the fundamental difference: **Bash is Text-Based**, while **PowerShell is Object-Based**.

## 1. The Core Philosophy

### Bash (Text Stream)
Everything in Bash is a string. If you want to find the size of a file, you run a command, get the text output, and use tools like `grep`, `awk`, or `sed` to "cut" the text until you find the number.

### PowerShell (Object Stream)
Everything in PowerShell is a .NET Object. If you run a command to get a file, you get an object with properties like `.Name`, `.Length`, and `.LastWriteTime`. You don't "cut" text; you just ask for the property.

---

## 2. Command Visual Breakdown: Directory Listing

| Bash | PowerShell | Description |
| :--- | :--- | :--- |
| `ls -la` | `Get-ChildItem` | Lists all files with details. |
| `cd ..` | `Set-Location ..` | Move up one directory. |
| `mkdir data` | `New-Item -Type Dir data` | Create a directory. |
| `touch file.txt`| `New-Item file.txt` | Create an empty file. |

### Advanced: `ls` vs `Get-ChildItem`
- **Bash:** `ls` output is just text formatted by your terminal.
- **PowerShell:** `ls` is actually an *alias* for `Get-ChildItem`. The output looks like text, but it's a collection of `System.IO.FileInfo` objects.

---

## 3. Help Systems: The Master's Secret

A master never memorizes every flag; they master the help system.

**Bash:**
```bash
man ls     # Open the manual page
ls --help  # Quick help
```

**PowerShell:**
```powershell
Get-Help Get-Service -Full    # Detailed help with examples
Get-Command *service*         # Find all commands related to 'service'
Get-Service | Get-Member      # List all PROPERTIES and METHODS of the object
```

---

## 4. Environment Variables

Environment variables store configuration for your session and applications.

| Task | Bash | PowerShell |
| :--- | :--- | :--- |
| **Set** | `export KEY=VAL` | `$env:KEY = "VAL"` |
| **Read** | `echo $KEY` | `$env:KEY` |
| **Persistent**| Add to `~/.bashrc` | Add to `$PROFILE` |

---

## 5. Master Challenge
1. In Bash, how do you find only the 5th line of a text file? (`sed -n '5p' file.txt`)
2. In PowerShell, how do you find only the 'Name' of all running services? (`Get-Service | Select-Object Name`)

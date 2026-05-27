# Master Class: Pipeline Manipulation

The Pipeline `|` is the most powerful character in the shell. It allows you to build complex logic by stringing together simple commands.

## 1. Bash: The Art of Text Processing

In Bash, the pipeline passes **Standard Output (stdout)** as **Standard Input (stdin)** to the next command.

### Visual Breakdown: The Log Scraper
Scenario: Find the top 3 IP addresses that caused 404 errors in an Nginx log.

```bash
cat access.log | grep "404" | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 3
```

1. **`cat`**: Reads the file.
2. **`grep`**: Filters for lines containing "404".
3. **`awk`**: Extracts the first column (The IP).
4. **`sort`**: Groups identical IPs together.
5. **`uniq -c`**: Counts the occurrences of each IP.
6. **`sort -nr`**: Sorts by the count (numerically, reverse).
7. **`head -n 3`**: Takes only the top 3.

---

## 2. PowerShell: The Art of Object Filtering

In PowerShell, the pipeline passes **full objects**.

### Visual Breakdown: The Service Monitor
Scenario: Find all services that are "Running", but are NOT set to "Automatic" start, and stop them.

```powershell
Get-Service | Where-Object { $_.Status -eq 'Running' -and $_.StartType -ne 'Automatic' } | Stop-Service -WhatIf
```

1. **`Get-Service`**: Produces a collection of `ServiceController` objects.
2. **`Where-Object`**: Filters the objects based on their internal properties.
3. **`Stop-Service`**: Receives the filtered objects and executes the stop command.
4. **`-WhatIf`**: A master's safety net—shows what *would* happen without doing it.

---

## 3. Redirection Master Class

Pipelines are for commands; Redirection is for files.

| Symbol | Description |
| :--- | :--- |
| `>` | Overwrite file with output. |
| `>>` | Append output to the end of a file. |
| `2>` | Redirect ONLY errors (stderr). |
| `&>` | Redirect both stdout and stderr (Bash). |
| `*>` | Redirect all streams (PowerShell). |

---

## 4. Advanced: Xargs and Parallel

Sometimes a command doesn't accept "Input" but requires "Arguments".

**Bash:**
```bash
find . -name "*.tmp" | xargs rm
```
*`xargs` takes the list of filenames from the pipeline and appends them as arguments to `rm`.*

---

## 5. Summary Checklist
- [ ] Are you using `grep -i` for case-insensitive searching?
- [ ] In PowerShell, are you using `Select-Object` to limit your data early in the pipeline?
- [ ] Do you know how to use `tee` to see output AND save it to a file at the same time?

# Pipeline Manipulation

Pipelines allow you to take the output of one command and use it as the input for another.

## Bash Pipeline Example

Find all `.txt` files and count the total number of lines:
```bash
find . -name "*.txt" | xargs cat | wc -l
```

## PowerShell Pipeline Example

PowerShell passes objects, not just text, through the pipeline.
Find all running processes using more than 100MB of memory and sort them:

```powershell
Get-Process | Where-Object { $_.WorkingSet -gt 100MB } | Sort-Object WorkingSet -Descending
```

# Writing Reusable Scripts

Writing scripts allows you to save complex sequences of commands for later use.

## Bash Script Example (`backup.sh`)

```bash
#!/bin/bash
# A simple backup script

SOURCE_DIR="/var/www/html"
BACKUP_DIR="/backup"
DATE=$(date +%Y-%m-%d)

tar -czf "$BACKUP_DIR/backup-$DATE.tar.gz" "$SOURCE_DIR"
echo "Backup completed successfully."
```

## PowerShell Script Example (`Backup.ps1`)

```powershell
param(
    [string]$SourceDir = "C:\inetpub\wwwroot",
    [string]$BackupDir = "C:\backup"
)

$Date = Get-Date -Format "yyyy-MM-dd"
$Destination = Join-Path $BackupDir "backup-$Date.zip"

Compress-Archive -Path $SourceDir -DestinationPath $Destination
Write-Output "Backup completed successfully."
```

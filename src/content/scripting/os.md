# OS Management

System administrators frequently use scripts to manage OS settings, users, and services.

## Service Management

**Bash (Systemd):**
```bash
systemctl status nginx
systemctl restart nginx
systemctl enable nginx
```

**PowerShell:**
```powershell
Get-Service -Name w3svc
Restart-Service -Name w3svc
Set-Service -Name w3svc -StartupType Automatic
```

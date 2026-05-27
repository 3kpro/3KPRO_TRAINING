# Master Class: OS Management

System administration at scale requires mastering **Services**, **Package Managers**, and **Remote Execution**.

## 1. Service Management (Systemd vs. SCM)

Services are background processes. Managing them correctly is critical for application uptime.

| Action | Bash (systemctl) | PowerShell |
| :--- | :--- | :--- |
| **Start** | `systemctl start nginx` | `Start-Service nginx` |
| **Status** | `systemctl status nginx` | `Get-Service nginx` |
| **Enable** | `systemctl enable nginx` | `Set-Service nginx -StartupType Auto` |

### Visual Breakdown: What "Enable" Actually Does
- **Bash:** It creates a symbolic link from `/lib/systemd/system/` to `/etc/systemd/system/multi-user.target.wants/`. This tells the OS to start the service during the boot process.
- **PowerShell:** It modifies the Windows Registry key for that service.

---

## 2. Package Management Master Class

A master admin uses the CLI to manage software, never a GUI.

**Linux (apt/yum/apk):**
```bash
apt update && apt upgrade -y # Update local cache and upgrade all software
apt install docker-ce       # Install specific software
```

**Windows (Winget/Chocolatey):**
```powershell
winget install "VS Code"
choco install git -y
```

---

## 3. Remote Execution (SSH vs. WinRM)

Managing one server is easy; managing 1,000 requires remote execution.

### Bash: SSH and SCP
- **SSH:** Secure Shell for remote command execution.
- **SCP:** Secure Copy for moving files.
- **Master Tip:** Use `ssh-keygen` and `ssh-copy-id` for passwordless, secure access.

### PowerShell: PSRemoting (Enter-PSSession)
PowerShell uses WinRM (Windows Remote Management).
```powershell
Invoke-Command -ComputerName "Server01" -ScriptBlock { Get-Process }
```
*This runs the script on the remote server and returns the RESULTS to your machine.*

---

## 4. Automation: The Cron and Task Scheduler

| Feature | Cron (Linux) | Task Scheduler (Windows) |
| :--- | :--- | :--- |
| **Trigger** | Time-based (Minute, Hour, etc.) | Time, Event, Login, or Boot. |
| **Definition** | `crontab -e` | `New-ScheduledTask` |

---

## 5. Summary Checklist
- [ ] Do you know how to check if a port is open? (`netstat` or `Get-NetTCPConnection`)
- [ ] Can you find which process is using the most CPU? (`top` or `Get-Process | Sort CPU`)
- [ ] Are you rotating your logs to prevent the disk from filling up?

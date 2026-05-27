# Master Class: Automation & Scripting with Python

Automation is where Python shines for DevOps and System Administrators. To master Python automation, you must understand **OS interaction**, **Subprocess management**, and **Error Handling**.

## 1. Operating System Interaction (`os` and `pathlib`)

Mastering file paths is the foundation of automation.

### The Modern Way: `pathlib`
Avoid string concatenation for paths. Use `pathlib` for cross-platform compatibility.

```python
from pathlib import Path

# Create a path object
log_dir = Path.home() / "logs" / "3kpro"

# Check if it exists, if not, create it
if not log_dir.exists():
    log_dir.mkdir(parents=True)

# Iterate through files
for file in log_dir.glob("*.log"):
    print(file.name)
```

---

## 2. Managing External Commands (`subprocess`)

A master automation script often needs to run CLI tools like `git`, `docker`, or `kubectl`.

```python
import subprocess

def run_command(cmd_list):
    try:
        # run() is the modern, recommended way
        result = subprocess.run(
            cmd_list, 
            capture_output=True, 
            text=True, 
            check=True # Automatically raises an error if the command fails
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {e.stderr}")
        return None

# Usage
output = run_command(["docker", "ps"])
```

### Visual Breakdown of `subprocess.run`
- `capture_output=True`: Captures both `stdout` and `stderr`.
- `text=True`: Returns strings instead of raw bytes.
- `check=True`: Stops execution if the shell command exits with a non-zero code.

---

## 3. Robust Error Handling

Never assume your script will succeed. Use `try-except-finally`.

```python
try:
    with open("config.json", "r") as f:
        config = f.read()
except FileNotFoundError:
    print("Critical Error: config.json missing.")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    print("Execution attempt complete.")
```

---

## 4. Automation Pattern: The Watcher
Python can monitor directories for changes and trigger actions.

```python
# Pseudo-code for a watcher
import time
from pathlib import Path

WATCH_DIR = Path("./incoming")

while True:
    for file in WATCH_DIR.glob("*.csv"):
        # 1. Process file
        # 2. Move to processed/
        # 3. Log results
    time.sleep(10) # Wait 10 seconds before next scan
```

---

## 5. Master Tip: Use Logging, not Print
For production automation, use the `logging` module. It allows you to set levels (DEBUG, INFO, ERROR) and save to a file automatically.

---

## 6. Summary Checklist
- [ ] Is your script idempotent? (Can it run twice safely?)
- [ ] Are you handling environment variables via `os.getenv()`?
- [ ] Have you included a `requirements.txt` for your dependencies?

# Automation & Scripting with Python

Python is excellent for automating repetitive tasks.

## File Operations

```python
# Writing to a file
with open('log.txt', 'w') as file:
    file.write('Execution started.')

# Reading from a file
with open('log.txt', 'r') as file:
    content = file.read()
    print(content)
```

## Running System Commands

You can use the `subprocess` module to run shell commands from Python.

```python
import subprocess

result = subprocess.run(['ls', '-l'], capture_output=True, text=True)
print(result.stdout)
```

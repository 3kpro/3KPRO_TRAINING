# Master Class: API Interactions with Requests

In the modern DevOps world, everything has an API. Python is the best tool for interacting with them. To master API interactions, you must understand **HTTP Methods**, **JSON parsing**, and **Authentication Patterns**.

## 1. The HTTP Lifecycle

When you make a request, a specific handshake occurs:

| Component | Description |
| :--- | :--- |
| **URL** | The endpoint (e.g., `https://api.github.com/user`). |
| **Method** | The action (GET, POST, PUT, DELETE). |
| **Headers** | Metadata (e.g., `Content-Type`, `Authorization`). |
| **Payload** | Data being sent (for POST/PUT). |
| **Response** | Status code and returned data. |

---

## 2. Professional Request Handling

A master developer always checks status codes and uses timeouts.

```python
import requests

def get_system_status():
    url = "https://api.3kpro.training/v1/status"
    headers = {"Authorization": "Bearer YOUR_TOKEN"}
    
    try:
        response = requests.get(url, headers=headers, timeout=5)
        
        # raise_for_status() throws an error for 4xx or 5xx codes
        response.raise_for_status()
        
        return response.json()
    except requests.exceptions.HTTPError as err:
        print(f"HTTP Error: {err}")
    except requests.exceptions.Timeout:
        print("Error: Request timed out.")
    return None
```

---

## 3. Handling JSON Data Breakdown

APIs return JSON, which Python maps perfectly to **Dictionaries** and **Lists**.

```python
data = {
    "users": [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"}
    ]
}

# Accessing Bob's name
bob_name = data["users"][1]["name"]
```

---

## 4. Advanced: Session Objects

If you are making multiple requests to the same server (e.g., calling an API in a loop), use a `requests.Session`.

- **Benefit:** It reuses the underlying TCP connection (Keep-Alive), which is significantly faster.
- **Benefit:** It automatically persists cookies and headers across requests.

```python
with requests.Session() as session:
    session.headers.update({"X-API-Key": "SECURE_KEY"})
    
    # These both use the same session and headers
    r1 = session.get("https://api.com/users")
    r2 = session.get("https://api.com/billing")
```

---

## 5. Authentication Master Class

- **Basic Auth:** Username and Password.
- **API Key:** Sent in headers or query params.
- **OAuth2 (Bearer Token):** The standard for modern cloud APIs (Azure/AWS).

---

## 6. Summary Checklist
- [ ] Are you using `timeout` on every request?
- [ ] Are you handling paginated responses? (APIs often return only 100 results at a time).
- [ ] Are you masking your tokens using environment variables?

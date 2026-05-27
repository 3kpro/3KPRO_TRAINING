# API Interactions with Requests

The `requests` library is the de facto standard for making HTTP requests in Python.

## Making a GET Request

```python
import requests

response = requests.get('https://api.github.com/events')
if response.status_code == 200:
    data = response.json()
    print(data[0]['type'])
```

## Making a POST Request

```python
import requests

payload = {'key1': 'value1', 'key2': 'value2'}
response = requests.post('https://httpbin.org/post', data=payload)
print(response.json())
```

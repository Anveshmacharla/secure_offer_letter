import requests

url = "http://127.0.0.1:5000/auth/register"
data = {
    "email": "anveshmacharla@gmail.com",
    "password": "Anvesh123",
    "name": "Anvesh Macharla",
    "role": "student"
}

response = requests.post(url, json=data)

print("Status Code:", response.status_code)
try:
    print("Response JSON:", response.json())
except Exception:
    print("Response Text:", response.text)
import requests

# URL of your Flask backend
url = "http://localhost:5000/ask"

# Replace this with any business question you'd like to test
payload = {
    "question": "What is the total revenue generated from all campaigns?"
}

response = requests.post(url, json=payload)

if response.status_code == 200:
    print("✅ Chatbot Response:")
    print(response.json()["answer"])
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)

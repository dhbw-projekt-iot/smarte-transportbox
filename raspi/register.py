import requests
import os

# host = "localhost:4004"
host = os.environ.get("host")

def register():
    r = requests.get("http://{host}/internal/register".format(host = host))

    if r.status_code != 201:
        print("Registration failed...")
        return

    response = r.json()
    deviceID = response["_id"]

    return deviceID
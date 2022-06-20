import requests
import os

# host = "localhost:4004"
host = os.environ.get("host")

def currentJob(deviceID):
    r = requests.get("http://{host}/internal/currentJob".format(host = host), {"deviceID": deviceID})

    if r.status_code != 200:
        print("No current job available...")
        return

    response = r.json()

    return response
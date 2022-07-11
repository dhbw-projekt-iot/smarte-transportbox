import requests
import os

# host = "localhost:4004"
host = os.environ.get("host")

def currentJob(deviceID):
    print(deviceID)
    r = requests.get("http://{host}/internal/currentJob/{id}".format(host = host, id = deviceID))

    if r.status_code != 200:
        print(str(r.text))
        print(str(r.status_code) + " No current job available...")
        return

    response = r.json()

    return response
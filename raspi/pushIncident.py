import requests
import os

# host = "localhost:4004"
host = os.environ.get("host")

def pushIncident(deviceID, incident):
    r = requests.get("http://{host}/internal/pushIncident".format(host = host), {"incident": incident, "id": deviceID})

    if r.status_code == 400:
        print("No current task for the given device id")
        return

    response = r.text()

    return response
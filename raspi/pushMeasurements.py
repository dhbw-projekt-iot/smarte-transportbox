import requests
import os

# host = "localhost:4004"
host = os.environ.get("host")

def pushMeasurements(deviceID, measurements):
    r = requests.get("http://{host}/internal/pushMeasurements".format(host = host), {"measurements": measurements, "id": deviceID})

    if r.status_code == 400:
        print("No current task for the given device id")
        return

    response = r

    return response
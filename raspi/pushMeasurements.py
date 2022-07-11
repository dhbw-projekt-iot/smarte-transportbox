import requests
import os
from pprint import pprint

# host = "localhost:4004"
host = os.environ.get("host")

def pushMeasurements(deviceID, measurements):
    r = requests.post("https://{host}/internal/pushMeasurements".format(host = host), json={"measurements": measurements, "id": deviceID})

    print(r.text)

    if r.status_code != 200:
        print(r.text)
        print("Pushing measurements failed...")
        return

    response = r

    return response
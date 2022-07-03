import requests
import os

# host = "localhost:4004"
host = os.environ.get("host")

def pushIncident(deviceID, incident):
    print("[!]\tPushing incident…")
    
    r = requests.post("https://{host}/internal/pushIncident".format(host = host), json={"incident": incident, "id": deviceID})
    
    print(deviceID)
    
    if r.status_code != 200:
        print(r.text)
        print("Pushing incident failed")
        return

    response = r

    return response
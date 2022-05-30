#!/usr/bin/python
from gps import *
import time

gpsd = gps(mode=WATCH_ENABLE|WATCH_NEWSTYLE)
print('latitude\tlongitude\ttime')

try:
    while True:
        report = gpsd.next()
        if report["class"] == "TPV":
            print(getattr(report,"lat",0.0), "\t", getattr(report,"lon",0.0), "\t", getattr(report,"time",0.0)),

        time.sleep(1)
except KeyboardInterrupt:
    print("Fucked up")

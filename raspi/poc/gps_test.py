# #!/usr/bin/python3
# from gps import *
# import time

# gpsd = gps(mode=WATCH_ENABLE|WATCH_NEWSTYLE)
# print('latitude\tlongitude\ttime')

# try:
#     while True:
#         report = gpsd.next()
        
#         if report["class"] == "TPV":
#             print(getattr(report,"lat",0.0), "\t", getattr(report,"lon",0.0), "\t", getattr(report,"time",0.0)),

#         time.sleep(1)
# except KeyboardInterrupt:
#     print("Fucked up")


import time
import serial

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)  # Open Serial port

def readString():
    while 1:
        while ser.read().decode("utf-8") != '$':  # Wait for the begging of the string
            pass  # Do nothing
        line = ser.readline().decode("utf-8")  # Read the entire string
        return line

def transformCoordinates(coord):
    return str(float(coord)/100.0)

def getCoordinates():
    while True:
        line = readString()
        if line.startswith("GPRMC"):
            gprmc = line.split(",")[3:7]
            latitude =  "+" + transformCoordinates(gprmc[0]) if gprmc[1] == "N" else "-" + transformCoordinates(gprmc[0])
            longitude = "+" + transformCoordinates(gprmc[2]) if gprmc[3] == "E" else "-" + transformCoordinates(gprmc[2])
            fullCoordinates = latitude + "," + longitude
            return fullCoordinates

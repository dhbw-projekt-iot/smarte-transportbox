from sqlite3 import Timestamp
from numpy import var
from register import register
from currentJob import currentJob as fetchCurrentJob
from pushIncident import pushIncident
from datetime import datetime as DateTime
from os.path import exists
from pushMeasurements import pushMeasurements
from pushIncident import pushIncident

import glob
import json
import time
import pytz
import json_lines
import Adafruit_DHT
from time import sleep
from tokenize import Double
import RPi.GPIO as GPIO
import sys
import serial

print("Started Monitoring Service…\n")

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN, pull_up_down = GPIO.PUD_UP)

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)  # Open Serial port

#sleep for x seconds
readSensorDataIntervall = 5

############################################################
############################################################
############################## Get temp
base_dir = "/sys/bus/w1/devices/"
while True:
    try:
        device_folder = glob.glob(base_dir + "28*")[0]
        break
    except:
        sleep(0.5)
        continue

device_file = device_folder + "/w1_slave"

def getTemperature():
    f = open(device_file, "r")
    lines = f.readlines()[1][29:-1]
    temperature = int(lines)/1000
    f.close()

    return temperature

############################################################
############################################################
############################## Get humidity
sleeptime = 1
DHTSensor = Adafruit_DHT.DHT11

def getHumidity(DHTSensor, GPIO_Pin):

    try:
        humidity, temperature = Adafruit_DHT.read_retry(DHTSensor, GPIO_Pin)
    except KeyboardInterrupt:
        sys.exit(0)

    return humidity

############################################################
############################################################
############################## Device ID

def getDeviceID():

    if exists("config.txt"):
        with open("config.txt", "r") as configFile:
            deviceID = configFile.readline()
    else:
        with open("config.txt", "w") as configFile:
            deviceID = register()
            configFile.write(deviceID)

    return deviceID

############################################################
############################################################
############################## Check task

def getCurrentJob(deviceID):
    return fetchCurrentJob(deviceID) 

############################################################
############################## GPS
def readString():
    while True:
        while ser.read().decode("utf-8") != '$':  # Wait for the begging of the string
            pass  # Do nothing
        line = ser.readline().decode("utf-8")  # Read the entire string
        return line

def transformCoordinates(coord):
    return str(float(coord)/100.0)
    
def getCoordinates():
    count = 0
    while True:
        try: 
            line = readString()
            if line.startswith("GPRMC"):
                gprmc = line.split(",")[3:7]
                latitude =  "+" + transformCoordinates(gprmc[0]) if gprmc[1] == "N" else "-" + transformCoordinates(gprmc[0])
                longitude = "+" + transformCoordinates(gprmc[2]) if gprmc[3] == "E" else "-" + transformCoordinates(gprmc[2])
                fullCoordinates = latitude + "," + longitude
                return fullCoordinates
        except:
            print("GPS could not be measured. Trying it again!")
            count = count + 1
            if count == 5:
                return ","
            sleep(5)

############################################################
############################## execution

print("Fetching deviceID and current task")
deviceID = getDeviceID()
currentJob = getCurrentJob(deviceID)
print("…suceeded\n")

def readSensorData():
    temperature = getTemperature()
    humidity = getHumidity(DHTSensor, GPIO_Pin=23)

    return temperature, humidity

def measurementDic():
    timestamp = DateTime.isoformat(DateTime.now(pytz.timezone('Europe/Berlin')))

    temperature, humidity = readSensorData()
    location = getCoordinates()

    measurement = {
        "timestamp": timestamp,
        "temperature": temperature,
        "humidity": humidity,
        "location": location
    }

    print("\n", measurement, "\n")

    checkConstraints(measurement)

    return measurement

def createJSONFile(jsonData):
    oldContent = json.loads("[]")

    if exists("measurement.json"):
        with open("measurement.json", "r") as jsonFile:
            oldContent = json.load(jsonFile)

    with open("measurement.json", "w") as jsonFile:
        oldContent.append(jsonData)
        json.dump(oldContent, jsonFile)

def sendMeasurements():
    with open("measurement.json", "r") as file:
        measurementsString = file.read().replace("\n", "")
        measurementsJSON = json.loads(measurementsString)
        pushMeasurements(deviceID, measurementsJSON)

    with open("measurement.json", "w") as measurementFile:
        measurementFile.write("[]")
    
def checkConstraints(measurements):
    currentTask = currentJob

    if measurements["temperature"] > currentTask["constraints"]["temperature"]["criticalMaximum"]:
        incident = {
            "sensor": "Temperature",
            "value": measurements["temperature"],
            "timestamp": measurements["timestamp"]
        }
        pushIncident(deviceID, incident)
    elif measurements["temperature"] < currentTask["constraints"]["temperature"]["criticalMinimum"]:
        incident = {
                "sensor": "Temperature",
                "value": measurements["temperature"],
                "timestamp": measurements["timestamp"]
            }
        pushIncident(deviceID, incident)
    elif measurements["humidity"] > currentTask["constraints"]["humidity"]["criticalMaximum"]:
        incident = {
                    "sensor": "Humidity",
                    "value": measurements["humidity"],
                    "timestamp": measurements["timestamp"]
                }
        pushIncident(deviceID, incident)
    elif measurements["humidity"] < currentTask["constraints"]["humidity"]["criticalMinimum"]:
        incident = {
                    "sensor": "Humidity",
                    "value": measurements["humidity"],
                    "timestamp": measurements["timestamp"]
                }
        pushIncident(deviceID, incident)

counter = 0

print("Starting monitoring…")

while True:
    
    # 2h
    if counter % 120 == 0:
        print("Updating current task")
        currentJob = getCurrentJob(deviceID)
    # 30sec.
    print("Reading sensor data…")
    createJSONFile(measurementDic())
    
    # 15min.
    if counter % 15 == 0:
        print("Send cached measurements")
        sendMeasurements()
    

    counter = counter + 1
    sleep(readSensorDataIntervall)
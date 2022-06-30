from ast import If
from sqlite3 import Timestamp
from numpy import var
from register import register
from currentJob import currentJob
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

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN, pull_up_down = GPIO.PUD_UP)

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

    with open("config.txt", "w") as configFile:
        configFile.write(register())

    with open("config.txt", "r") as configFile:
        deviceID = configFile.readline()[2:-2]

    return deviceID


############################################################
############################################################
############################## Check task

def getCurrentJob(deviceID):
    job = {
        "deviceID": "abc", 
        "measurements": [], 
        "incidents": [], 
        "constraints": {
            "temperature": {
		        "criticalMaximum": 10,
                "criticalMinimum": 1,
                "warningThresholdHigh": 2,
                "warningThresholdLow": 1,
                "exceedCountUntilIncident": 5,
                "exceedMinutesUntilIncident": 7    
	        },
	        "humidity": {
		        "criticalMaximum": 10,
                "criticalMinimum": 1,
                "warningThresholdHigh": 2,
                "warningThresholdLow": 1,
                "exceedCountUntilIncident": 5,
                "exceedMinutesUntilIncident": 7 
	        },
	        "tilt": {
		        "criticalMaximum": 10,
                "criticalMinimum": 1,
                "warningThresholdHigh": 2,
                "warningThresholdLow": 1,
                "exceedCountUntilIncident": 5,
                "exceedMinutesUntilIncident": 7 
	        },
	        "vibration": {
		        "criticalMaximum": 10,
                "criticalMinimum": 1,
                "warningThresholdHigh": 2,
                "warningThresholdLow": 1,
                "exceedCountUntilIncident": 5,
                "exceedMinutesUntilIncident": 7 
	        },
        },
        "productDescription": "",
        "productType": "",
        "shippingID": "",
        "fromLocation": "",
        "toLocation": "",
        "ownerMail": "",
        "createdAt": "",
        "status": ""
    }

    with open("currentJob.json", "w") as JobFile:
        json.dump(job, JobFile, indent=4)

    with open("currentJob.json", "r") as readJobFile:
        job=readJobFile.read()

    currentJobJSON = json.loads(job)

    if len(currentJobJSON) > 1:
        return currentJobJSON
    else:
        job = currentJob(deviceID)
        with open("currentJob.json", "w", encoding="utf-8") as JobFile:
            json.dump(job, JobFile, indent=4)
        return job   

############################################################
############################## do it!  

deviceID = getDeviceID()
currentJob = getCurrentJob(deviceID)

def readSensorData():
    temperature = getTemperature()
    humidity = getHumidity(DHTSensor, GPIO_Pin=23)

    print("Temperature: ",temperature)
    print("Humidity: ",humidity)

    return temperature, humidity

def measurementDic():
    timestamp = DateTime.isoformat(DateTime.now(pytz.timezone('Europe/Berlin')))

    temperature, humidity = readSensorData()

    measurement = {
        "timestamp": timestamp,
        "temperature": temperature,
        "humidity": humidity
    }

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
    measurements = open("measurement.json", "r").readlines()

    pushMeasurements(deviceID, measurements)
    
    with open("measurement.json", "w") as measurementFile:
        measurementFile.write("[]")


def updateCurrentTask():
    with open("currentJob.json", "w") as file:
        file.write("abc")
    getCurrentJob(deviceID)
    
def checkConstraints(measurements):
    currentTask = currentJob

    if measurements["temperature"] > currentTask["constraints"]["temperature"]["criticalMaximum"]:
        incident = {
            "sensor": "Temperature",
            "value": measurements["temperature"],
            "timestamp": measurements["timestamp"]
        }
        pushIncident(deviceID, incident)
    elif measurements["humidity"] < currentTask["constraints"]["temperature"]["criticalMinimum"]:
        incident = {
                "sensor": "Temperature",
                "value": measurements["temperature"],
                "timestamp": measurements["timestamp"]
            }
    elif measurements["humidity"] > currentTask["constraints"]["humidity"]["criticalMaximum"]:
        incident = {
                    "sensor": "Humidity",
                    "value": measurements["humidity"],
                    "timestamp": measurements["timestamp"]
                }
    elif measurements["humidity"] < currentTask["constraints"]["humidity"]["criticalMinimum"]:
        incident = {
                    "sensor": "Humidity",
                    "value": measurements["humidity"],
                    "timestamp": measurements["timestamp"]
                }

counter = 0

while True:
    createJSONFile(measurementDic())

    if counter % 2 == 0:
        print("15")
        sendMeasurements()
    if counter % 120 == 0:
        print("120")
        updateCurrentTask()

    counter = counter + 1
    sleep(readSensorDataIntervall)
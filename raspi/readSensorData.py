from sqlite3 import Timestamp
from numpy import var
from register import register
from currentJob import currentJob
from datetime import datetime as DateTime

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
############################################################
############################################################
############################## Device ID

def getDeviceID():
    # remove after testing
    deviceID = {"a"}

    file = open("config.txt", "w")

    str = repr(deviceID)
    file.write(str)

    file.close()
    ######

    configFile = open("config.txt", "r")

    deviceIdFromConfig = configFile.readline()[2:-2]
    configFile.close()

    if len(deviceIdFromConfig) >= 1:
        deviceID = deviceIdFromConfig
        return deviceID
    else:
        deviceID = register()
        return deviceID
    

############################################################
############################################################
############################################################
############################################################
############################## Check task


def getCurrentJob(deviceID):
    job = {"a":54, "b":87}
    
    with open("currentJob.json", "w", encoding="utf-8") as JobFile:
        json.dump(job, JobFile, ensure_ascii=False, indent=4)

    with open("currentJob.json", "r") as readJobFile:
        job=readJobFile.read()

    currentJobJSON = json.loads(job)

    if len(currentJobJSON) > 1:
        return currentJobJSON
    else:
        job = currentJob(deviceID)
        with open("currentJob.json", "w", encoding="utf-8") as JobFile:
            json.dump(job, JobFile, ensure_ascii=False, indent=4)
        return job
      

############################################################
############################################################
############################################################
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
    return measurement

def createJSONData(measurement):
    jsonData = []
    jsonData.append(measurement)
    return jsonData

def createJSONFile(jsonData):
    with open("measurement.json", "a") as jsonFile:
        for data in jsonData:
            json.dump(data, jsonFile)
            jsonFile.write("\n")
            jsonData = []
    with open("measurement.json", "rb") as jsonFile:
        for line in json_lines.reader(jsonFile):
            jsonData.append(line)

def writeMeasurementsIntoFile():
    print("Test") 

while True:
    createJSONFile(createJSONData(measurementDic()))
    sleep(readSensorDataIntervall)

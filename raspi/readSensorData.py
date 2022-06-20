import glob

from numpy import var

from register import register
from currentJob import currentJob

import json
import time
import Adafruit_DHT
from time import sleep
from tokenize import Double
import RPi.GPIO as GPIO
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN, pull_up_down = GPIO.PUD_UP)

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
    temp = int(lines)/1000
    f.close()

    print("Temp", temp)
    return temp

############################################################
############################################################
############################################################
############################################################
############################## Get humidity
sleeptime = 1
DHTSensor = Adafruit_DHT.DHT11

def getHumidity(DHTSensor, GPIO_Pin):

    try:
        Humidity, Temperature = Adafruit_DHT.read_retry(DHTSensor, GPIO_Pin)
    except KeyboardInterrupt:
        sys.exit(0)

    print("Humidity", Humidity)
    return Humidity

############################################################
############################################################
############################################################
############################################################
############################## Device ID

def getDeviceId():
    deviceId = {"cdf"}

    file = open("config.txt.gitignore", "w")

    str = repr(deviceId)
    file.write("device_id = " + str + "\n")

    file.close()

    configFile = open("config.txt.gitignore", "r")

    deviceIdFromConfig = configFile.readline()[14:-3]
    configFile.close()

    print(len(deviceIdFromConfig))
    if len(deviceIdFromConfig) > 1:
        deviceId = deviceIdFromConfig
        return True
    else:
        deviceId = register()
        return False
    

############################################################
############################################################
############################################################
############################################################
############################## Check task


def getCurrentJob():
    currentJob = {"a":54, "b":87}
    
    with open("currentTask.json.gitignore", "w", encoding="utf-8") as jobFile:
        json.dump(currentJob, jobFile, ensure_ascii=False, indent=4)

    with open("currentTask.json.gitignore", "r") as jobFile:
        currentJob=jobFile.read()

    currentJobJSON = json.loads(currentJob)

    print(len(currentJobJSON))
    if len(currentJobJSON) > 1:
        print("Task vorhanden")
    else:
        currentJob = currentJob()
        print("Hier")
        with open("currentTask.json.gitignore", "w", encoding="utf-8") as jobFile:
            json.dump(currentJob, jobFile, ensure_ascii=False, indent=4)
        

getCurrentJob()
getDeviceId()

#while True:
    #getTemperature()
    #getHumidity(DHTSensor, GPIO_Pin=23)
import glob

from register import register

import time
import Adafruit_DHT
from time import sleep
from tokenize import Double
import RPi.GPIO as GPIO
import sys

deviceId = ""

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN, pull_up_down = GPIO.PUD_UP)

# temperature sensor
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

# humidity sensor
sleeptime = 1
DHTSensor = Adafruit_DHT.DHT11

def getHumidity(DHTSensor, GPIO_Pin):

    try:
        Humidity, Temperature = Adafruit_DHT.read_retry(DHTSensor, GPIO_Pin)
    except KeyboardInterrupt:
        sys.exit(0)

    print("Humidity", Humidity)
    return Humidity

#check Device ID

#input deviceId
device_id = {"cdf"}

#open file
file = open("config.txt.gitignore", "w")

#variable to string
str = repr(device_id)
file.write("device_id = " + str + "\n")

#close file
file.close()

def checkDeviceId():
    f = open("config.txt.gitignore", "r")

    deviceIdFromConfig = f.readline()[14:-3]
    f.close()

    if len(deviceIdFromConfig) > 1:
        deviceId = deviceIdFromConfig
        return True
    else:
        return False

if checkDeviceId() != True:
    deviceId = register()

while True:
    getTemperature()
    getHumidity(DHTSensor, GPIO_Pin=23)
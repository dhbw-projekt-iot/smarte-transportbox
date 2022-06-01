import glob
import time
from time import sleep
from tokenize import Double
import RPi.GPIO as GPIO

sleeptime = 1

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN, pull_up_down = GPIO.PUD_UP)

print("Initializing...")

base_dir = "/sys/bus/w1/devices/"
while True:
    print("Retrying")
    try:
        device_folder = glob.glob(base_dir + "28*")[0]
        break
    except:
        sleep(0.5)
        continue

device_file = device_folder + "/w1_slave"

def measurement():
    f = open(device_file, "r")
    print("Opened file")
    lines = f.readlines()[1][29:-1]
    temp = int(lines)
    print(temp/1000)
    f.close()
    return temp

while True:
    measurement()

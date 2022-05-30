import glob
import time
from time import sleep
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
    lines = f.readlines()
    print(lines)
    f.close()
    return lines

measurement()

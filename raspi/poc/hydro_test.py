import RPi.GPIO as GPIO
import Adafruit_DHT
import time
import sys

sleeptime = 1

DHTSensor = Adafruit_DHT.DHT11

GPIO_Pin = 23

print("Test hallo")

try: 
    while(1):
        Luftfeuchte, Temperatur = Adafruit_DHT.read_retry(DHTSensor, GPIO_Pin)

        print("-----------------------")
        if Luftfeuchte is not None:
            print(Luftfeuchte)
        else:
            print("Fehler beim Auslesen!!!!")
        print("-----------------------")
        print("")
        time.sleep(sleeptime)

except KeyboardInterrupt:
    sys.exit(0)
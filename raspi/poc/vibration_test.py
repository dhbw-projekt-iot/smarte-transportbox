import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO_PIN = 24
GPIO.setup(GPIO_PIN, GPIO.IN, pull_up_down = GPIO.PUD_UP)

print("Sensor-Test [Drücken Sie STRG+C, um den Test zu beenden]")

def ausgabeFunktion(null):
    print("Signal erkannt")

# GPIO.add_event_detect(GPIO_PIN, GPIO.FALLING, callback=ausgabeFunktion, bouncetime=100)  

try:
    while True:
        if not GPIO.input(GPIO_PIN):
            print("Signal erkannt")
        else:
            print("Kein Signal erkannt")

        time.sleep(0.1)

except KeyboardInterrupt:
    GPIO.cleanup()
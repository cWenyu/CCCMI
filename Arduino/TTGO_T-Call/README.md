# **Aquality2.0 Water Monitoring Hardware**

The hardware part of our team project is to design a water monitoring device that can be used by citizens scientists to evaluate the water quality of rivers through sensors that can measure pH and temperature value.

**Components** **📷**：

| **Microcontroller**           | **Product Link**                                             | **Schematic**                                                |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| SIM800L IP5306 20190610       | [Product link](https://www.aliexpress.com/item/33045221960.html) | [Schematic](https://github.com/Xinyuan-LilyGO/LilyGo-T-Call-SIM800/blob/master/schematic/LilyGo-SIM800L-IP5306-20190610.pdf) |
|                               |                                                              |                                                              |
| **GPS  Module**               | **Product Link**                                             | **Schematic**                                                |
| U-BLOX NEO-6M                 | [Product link](https://www.aliexpress.com/item/4001162953629.html?src=google&albch=shopping&acnt=708-803-3821&isdl=y&slnk=&plac=&mtctp=&albbt=Google_7_shopping&aff_platform=google&aff_short_key=UneMJZVf&&albagn=888888&isSmbAutoCall=false&needSmbHouyi=false&albcp=9441019410&albag=95283287465&trgt=539263010115&crea=en4001162953629&netw=u&device=c&albpg=539263010115&albpd=en4001162953629&gclid=Cj0KCQiApY6BBhCsARIsAOI_GjbOzfYS4_ErcpXTCpJbQBmP0_g_tUv3AOtZ_WvaBC9cbi36lyjDnAYaAnihEALw_wcB&gclsrc=aw.ds) | [Schematic](https://www.u-blox.com/sites/default/files/products/documents/NEO-6_DataSheet_(GPS.G6-HW-09005).pdf) |
|                               |                                                              |                                                              |
| **Analog  pH Sensor**         | **Product Link**                                             | **Schematic**                                                |
| SKU:SEN0169-V2                | [Product link](https://www.dfrobot.com/product-2069.html)    | [Schematic](https://wiki.dfrobot.com/Gravity__Analog_pH_Sensor_Meter_Kit_V2_SKU_SEN0161-V2) |
|                               |                                                              |                                                              |
| **Water  Temperature Sendor** | **Product Link**                                             | **Schematic**                                                |
| DS18B20                       | [Product link](https://www.dfrobot.com/product-689.html)     | [Schematic](https://image.dfrobot.com/image/data/DFR0198/DS18B20.pdf) |

**Arduino IDE** 

We use Arduino IDE to write code and upload it to our board.

[Link](https://www.arduino.cc/en/software) to download software.

**Library**

After finish downloading the Arduino IDE software, launch the software on your machine and open the [folder](https://github.com/cWenyu/CCCMI/tree/Arduino_Master/Arduino). After open the folder include all libraries listed below with the following steps:

**Sketch > Include Library > Add .ZIP Library**

**1.**  [**DFRobot_ESP_PH.h**](https://github.com/GreenPonik/DFRobot_ESP_PH_BY_GREENPONIK)

**2.**  [**TinyGsmClient.h**](https://github.com/vshymanskyy/TinyGSM)

**3.**  [**TinyGPS++.h**](https://github.com/mikalhart/TinyGPSPlus)

**4.**  [**DallasTemperature.h**](https://www.arduinolibraries.info/libraries/dallas-temperature)

**5.**  [**OneWire.h**](https://www.arduinolibraries.info/libraries/one-wire)

**6.**  [**StreamDebugger.h**](https://github.com/vshymanskyy/StreamDebugger)

 

**Installing ESP32 Add-on in Arduino IDE**

To install the ESP32 board in your Arduino IDE, follow instructions in this [link](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/).

**Board**

After installing ESP32 Add-on in Arduino IDE change your Board to ESP32 Wrover Module in:

**Tools > Board > ESP32 Arduino > ESP32 Wrover Module**

Make sure you select the correct Port corresponding the port you are using.

![img](https://cdn1.bbcode0.com/uploads/2021/2/12/43dde60ddecad7a2afa7150abbf45fec-full.png) 

**Upload Code**

Finally, upload your code to your board and everything’s done!

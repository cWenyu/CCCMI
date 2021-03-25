// Please select the corresponding model

#define SIM800L_IP5306_VERSION_20190610
// #define SIM800L_AXP192_VERSION_20200327
// #define SIM800C_AXP192_VERSION_20200609
// #define SIM800L_IP5306_VERSION_20200811

// #define TEST_RING_RI_PIN            //Note will cancel the phone call test

// #define ENABLE_SPI_SDCARD   //Uncomment will test external SD card

// Define the serial console for debug prints, if needed
#define DUMP_AT_COMMANDS
#define TINY_GSM_DEBUG          SerialMon

#include "utilities.h"

// Set serial for debug console (to the Serial Monitor, default speed 115200)
#define SerialMon Serial
// Set serial for AT commands (to the module)
#define SerialAT  Serial1

// Configure TinyGSM library
#define TINY_GSM_MODEM_SIM800          // Modem is SIM800
#define TINY_GSM_RX_BUFFER      1024   // Set RX buffer to 1Kb

#include <TinyGsmClient.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include "DFRobot_ESP_PH.h"
#include <EEPROM.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#ifdef DUMP_AT_COMMANDS
#include <StreamDebugger.h>
StreamDebugger debugger(SerialAT, SerialMon);
TinyGsm modem(debugger);
#else
TinyGsm modem(SerialAT);
#endif

#define uS_TO_S_FACTOR 1000000ULL  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  30        /* Time ESP32 will go to sleep (in seconds) */

// Your GPRS credentials (leave empty, if missing)
const int arduinoId = 5;
const char apn[]      = "data.myeirmobile.ie"; // Your APN
const char gprsUser[] = ""; // User
const char gprsPass[] = ""; // Password
const char simPIN[]   = ""; // SIM card PIN code, if any

// Server details
String channelName = "arduino";
const char publishKey[] = "pub-c-72e030ad-423e-4bba-ae6f-319b1c7a946f"; // secret key for publishing
const char subscribeKey[] = "sub-c-05214e3e-3599-11eb-88bb-1ad0e2424f4f"; // secret key for subscribing
const char server[] = "ps.pndsn.com";

TinyGsmClient client(modem);
const int  port = 80;

static const int RXPin = 14, TXPin = 27;
static const uint32_t GPSBaud = 9600;

// The TinyGPS++ object
TinyGPSPlus gps;
// The serial connection to the GPS device
SoftwareSerial gpsSerial(RXPin, TXPin);

// GPIO where the DS18B20 is connected to
const int oneWireBus = 32;
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor
DallasTemperature sensors(&oneWire);

//pH Sensor
DFRobot_ESP_PH ph;
#define ESPADC 4096.0   //the esp Analog Digital Convertion value
#define ESPVOLTAGE 3300 //the esp voltage supply value
#define PH_PIN 35    //the esp gpio data pin number
float voltage, phValue, temperature = 25;
/*
  This is just to demonstrate how to use SPI device externally.
  Here we use SD card as a demonstration. In order to maintain versatility,
  I chose three boards with free pins as SPI pins
*/
#ifdef ENABLE_SPI_SDCARD

#include "FS.h"
#include "SD.h"
#include <SPI.h>

SPIClass SPI1(HSPI);

#define MY_CS       33
#define MY_SCLK     25
#define MY_MISO     27
#define MY_MOSI     26

void setupSDCard()
{
  SPI1.begin(MY_SCLK, MY_MISO, MY_MOSI, MY_CS);
  //Assuming use of SPI SD card
  if (!SD.begin(MY_CS, SPI1)) {
    Serial.println("Card Mount Failed");
  } else {
    Serial.println("SDCard Mount PASS");
    String size = String((uint32_t)(SD.cardSize() / 1024 / 1024)) + "MB";
    Serial.println(size);
  }
}
#else
#define setupSDCard()
#endif


void setupModem()
{
#ifdef MODEM_RST
  // Keep reset high
  pinMode(MODEM_RST, OUTPUT);
  digitalWrite(MODEM_RST, HIGH);
#endif

  pinMode(MODEM_PWRKEY, OUTPUT);
  pinMode(MODEM_POWER_ON, OUTPUT);

  // Turn on the Modem power first
  digitalWrite(MODEM_POWER_ON, HIGH);

  // Pull down PWRKEY for more than 1 second according to manual requirements
  digitalWrite(MODEM_PWRKEY, HIGH);
  delay(100);
  digitalWrite(MODEM_PWRKEY, LOW);
  delay(1000);
  digitalWrite(MODEM_PWRKEY, HIGH);

  // Initialize the indicator as an output
  pinMode(LED_GPIO, OUTPUT);
  digitalWrite(LED_GPIO, LED_OFF);
}

void turnOffNetlight()
{
  SerialMon.println("Turning off SIM800 Red LED...");
  modem.sendAT("+CNETLIGHT=0");
}

void turnOnNetlight()
{
  SerialMon.println("Turning on SIM800 Red LED...");
  modem.sendAT("+CNETLIGHT=1");
}

void setup()
{
  // Set console baud rate
  SerialMon.begin(115200);
  //gpsSerial.begin(GPSBaud);
  Serial2.begin(9600, SERIAL_8N1, 14, 27);//This opens up communications to the GPS
  delay(10);
  sensors.begin();
  delay(10);
  EEPROM.begin(32);//needed to permit storage of calibration value in eeprom
  ph.begin();
  delay(10);

  // Start power management
  if (setupPMU() == false) {
    Serial.println("Setting power error");
  }

  setupSDCard();

  // Some start operations
  setupModem();

  // Set GSM module baud rate and UART pins
  SerialAT.begin(115200, SERIAL_8N1, MODEM_RX, MODEM_TX);

  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);
}

void loop()
{
  // Restart takes quite some time
  // To skip it, call init() instead of restart()
  SerialMon.println("Initializing modem...");
  modem.init();

  while (Serial2.available() <= 0) {
    SerialMon.print("Booting up GPS Module...");
  }
  // Turn off network status lights to reduce current consumption
  turnOffNetlight();

  // The status light cannot be turned off, only physically removed
  //turnOffStatuslight();

  // Or, use modem.init() if you don't need the complete restart
  String modemInfo = modem.getModemInfo();
  SerialMon.print("Modem: ");
  SerialMon.println(modemInfo);

  // Unlock your SIM card with a PIN if needed
  if (strlen(simPIN) && modem.getSimStatus() != 3 ) {
    modem.simUnlock(simPIN);
  }

  SerialMon.print("Waiting for network...");
  if (!modem.waitForNetwork(240000L)) {
    SerialMon.println(" fail");
    delay(10000);
    return;
  }
  SerialMon.println(" OK");

  // When the network connection is successful, turn on the indicator
  digitalWrite(LED_GPIO, LED_ON);

  if (modem.isNetworkConnected()) {
    SerialMon.println("Network connected");
  }

  SerialMon.print(F("Connecting to APN: "));
  SerialMon.print(apn);
  if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
    SerialMon.println(" fail");
    delay(10000);
    return;
  }
  SerialMon.println(" OK");

  SerialMon.print("Connecting to ");
  SerialMon.print(server);
  if (!client.connect(server, port)) {
    SerialMon.println(" fail");
    delay(10000);
    return;
  }
  SerialMon.println(" OK");

  float latitude = 0.000000;
  float longtitude = 0.000000;
  while (Serial2.available() <= 0) {

  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Get data
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Get GPS coordinates
  while (Serial2.available() > 0 && latitude == 0.000000 && longtitude == 0.000000) {
    if (gps.encode(Serial2.read())) {
      displayInfo();
      latitude = gps.location.lat();
      longtitude = gps.location.lng();
    }
    if (latitude != 0.000000 && longtitude != 0.000000)
    {
      break;
    }
  }
  //Get temperature data
  sensors.requestTemperatures();
  float temperature = sensors.getTempCByIndex(0);

  //Get pH data
  //voltage = rawPinValue / esp32ADC * esp32Vin
  voltage = analogRead(PH_PIN) / ESPADC * ESPVOLTAGE; // read the voltage
  SerialMon.print("voltage:");
  SerialMon.println(voltage, 4);

  SerialMon.print("temperature:");
  SerialMon.print(temperature, 1);
  SerialMon.println("^C");

  phValue = ph.readPH(voltage, temperature); // convert voltage to pH with temperature compensation
  Serial.print("pH:");
  Serial.println(phValue, 4);

  ph.calibration(voltage, temperature); // calibration process by Serail CMD
  // If 5000 milliseconds pass and there are no characters coming in
  // over the software serial port, show a "No GPS detected" error
  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    SerialMon.println("No GPS detected");
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Send data out to PubNub channel
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  float value1 = temperature;
  float value2 = phValue;
  String dataInput = "%7B%0A%20%20%20%20%20%20%20%20%22arduino_id%22%3A%20" + String(arduinoId) + "%2C%0A%20%20%20%20%20%20%20%20%22latitude%22%3A%20" + String(latitude, 6) + "%2C%0A%20%20%20%20%20%20%20%20%22longitude%22%3A%20" + String(longtitude, 6) + "%2C%0A%20%20%20%20%20%20%20%20%22pH%22%3A%20" + String(value2) + "%2C%0A%20%20%20%20%20%20%20%20%22temp%22%3A%20" + String(value1) + "%0A%20%20%20%20%7D";

  String resource = "/publish/" + String(publishKey) + "/" + String(subscribeKey)
                    + "/0/" + channelName + "/0/" + dataInput;

  // Make a HTTP GET request:
  SerialMon.println("Performing HTTP GET request...");
  client.print(String("GET ") + resource + " HTTP/1.1\r\n");
  client.print(String("Host: ") + server + "\r\n");
  client.print("Connection: close\r\n\r\n");
  client.println();

  unsigned long timeout = millis();
  while (client.connected() && millis() - timeout < 10000L) {
    // Print available data
    while (client.available()) {
      char c = client.read();
      SerialMon.print(c);
      timeout = millis();
    }
  }
  SerialMon.println();

  // Shutdown
  client.stop();
  SerialMon.println(F("Server disconnected"));

  modem.gprsDisconnect();
  SerialMon.println(F("GPRS disconnected"));


  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  esp_deep_sleep_start();

  /*
    The sleep current using AXP192 power management is about 500uA,
    and the IP5306 consumes about 1mA
  */
}

void displayInfo()
{
  if (gps.location.isValid())
  {
    SerialMon.print("Latitude: ");
    SerialMon.println(gps.location.lat(), 6);
    SerialMon.print("Longitude: ");
    SerialMon.println(gps.location.lng(), 6);
    SerialMon.print("Altitude: ");
    SerialMon.println(gps.altitude.meters());
  }
  else
  {
    SerialMon.println("Location: Not Available");
  }

  SerialMon.print("Date: ");
  if (gps.date.isValid())
  {
    SerialMon.print(gps.date.month());
    SerialMon.print("/");
    SerialMon.print(gps.date.day());
    SerialMon.print("/");
    SerialMon.println(gps.date.year());
  }
  else
  {
    SerialMon.println("Not Available");
  }

  SerialMon.print("Time: ");
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) SerialMon.print(F("0"));
    SerialMon.print(gps.time.hour());
    SerialMon.print(":");
    if (gps.time.minute() < 10) SerialMon.print(F("0"));
    SerialMon.print(gps.time.minute());
    SerialMon.print(":");
    if (gps.time.second() < 10) SerialMon.print(F("0"));
    SerialMon.print(gps.time.second());
    SerialMon.print(".");
    if (gps.time.centisecond() < 10) SerialMon.print(F("0"));
    SerialMon.println(gps.time.centisecond());
  }
  else
  {
    SerialMon.println("Not Available");
  }

  SerialMon.println();
  SerialMon.println();
  delay(1000);
}

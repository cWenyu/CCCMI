# CCCMI(4th year project DKIT)

## Table of Contents

- [Aquality 2.0](#aquality)
  - [Folder Description](#folder-description)
  - [Installation](#installation)
  - [Screen Cuts](#screen-cuts)
  - [API Testing](#api-testing)
  - [CI Pipeline ](#ci-pipeline )
  - [Commit Law](#commit-law)
  - [Merge Request Law](#merge-request-law)

# Aquality 2.0

Aquality 2.0 is a **Mobile Application** , it helps Citizen Scientists to get more accurate water quality via **AI model** to analysis insects and uses **IOT** technology to talk with 2 sensors (**PH, Temperature**) to get accurate extra information of water body. Further information please check [CCCMI DKIT Mahara Page](https://mahara.dkit.ie/view/view.php?t=YyRMElgz5pfnFu394amh).

Technologies: 

- **Hardware:** 
  *   ​	PH Sensor (H-101 pH Electrode)

  *   ​	Temperature Sensor (DS18B20)

  *   ​	Microcontroller (ESP32)

  *   ​	GSM/GPRS Module (SIM 800L)

  *   ​	GPS Module (Neo-6M)

- **App:** React Native

- **Cloud:** AWS, PubNub 

- **AI:** Yolov3+LabelImg+Google Cloud Platform

- **Backend**: Django + PostgreSQL

- **UI Testing**: Appium + WendriveIO

- **API Testing**: Postman + newman + Github Actions

  

## Folder Description

**.github/workflows**: GitHub action workflows used in CI/CD pipeline

**Aquality_2_AI_Model_Server**: AI model build using Yolov3 and LabelImg helps to recognize insects

**Aquality_Two_Backend_Server:**  Server build on Django supports for Mobile Application and data storage

**Arduino/TTGO_T-Call**: Arduino support PH and temperature sensor catch data and send to PubNub

**mobile_ui**: Mobile Application build on React Native including UI E2E testing.

## Installation

Installation setps please chekc each foder.
Auality V2 Mobile App is avaliable on Google Play Store,and scan the QR code to download the app: 

![image](https://i.ibb.co/56wpsgv/Aquality-V2-QR-code-small-size.png)

## Screen Cuts

   1. If Aquality_Two_Backend_Server runs successfully, you should get APIs when you open the server link
   
   ![image](https://cdn1.bbcode0.com/uploads/2021/2/11/7da074ece582146b6f1c4d04ad6dfcb2-full.jpg)

   2. If mobile_ui runs successfully, you should get a home screen in android simulator.
   
   ![image](https://cdn1.bbcode0.com/uploads/2021/2/11/f1fd4d8a6359fbac7257c0a2fc0ffcc7-full.png)

## API Testing
   
API (Application Programming Interface) is a computing interface which enables communication and data exchange between two separate software systems. API testing is a software testing type that validates Application Programming Interfaces (APIs). The purpose of API Testing is to check the functionality, reliability, performance, and security of the programming interfaces.
   
The API testing uses [Postman](https://www.postman.com/), you can make own collections or using [prepared collection](https://www.getpostman.com/collections/69a4df7d52a8dc4a21ee)
   
## CI Pipeline 
   
Continuous integration (CI) is a software practice that requires frequently committing code to a shared repository. Committing code more often detects errors sooner and reduces the amount of code a developer needs to debug when finding the source of an error. Frequent code updates also make it easier to merge changes from different members of a software development team. This is great for developers, who can spend more time writing code and less time debugging errors or resolving merge conflicts.
   
Please build your own workflow in ./github/workflows

## Commit Law

| Title Key word |                          Deception                           | Example (enter commit title first then commit message following) |
| -------------- | :----------------------------------------------------------: | ------------------------------------------------------------ |
| ui             |               any new/update components display on UI               | ui_add or ui_update primary button                                           |
| style          |               any style changes on components                | style_table height/width                                     |
| feat           |                        new functions                         | feat_show user name                                          |
| fix            |                     fix functional bugs                      | fix_can't pop login successful window                        |
| docs           | README, .gitignore, liciences,    any changes in related docs | docs_add xx folder into gitignore                             |
| build          |           any changes in config file, dependencies           | build_import xxx dep                                         |
| refactor       |                only used in code refactoring                 | refactor_xxfile_check()                                      |
| file           |              any new files into project folder               | File_add index.html into view folder                         |
| test           |                        unit test case                        | Test_xxx func                                                |
| db             |          new table in DB, change fileds name, etc…           | DB_table_new student table    DB_filed_student table_rename age as Age |


## Merge Request Law

1. Create Merge request 

2. Require at least two reviewer (corresponding lead and git lead)

3. Send MR message in CCCMI teams Merge Request channel (MR + task name + MR link + reviwer1 + reviewer2)

   E.g: MR The Step able User Upload all photo of Insect, also post image into server https://github.com/cWenyu/CCCMI/pull/116 @reviewer1 @reviewer2 

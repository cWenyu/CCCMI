# Overview Of Application
This is the backend server for AI Model using YOLOv3, Django framework and Google Cloud Platform (GCP) as server 

## AI Model Progress: 
* Model works on group 1 mayflies
* Processes image from both image file and base64 image
* Gives back name of insect, confidence and predicted count
* Configured to deploy and run on GCP. See app.yaml for deployment file needs
* Uses custom weights to detect images
* yolov3.cfg set to work for group 1 only

## Server
* Allows for large requests
* Using highest instance_class: F4_1G for higher storage

This application is using Python 3.7.8

# Installation Guide

Access to target url and install python 3.7.8
Install [Python 3.7.8](https://www.python.org/downloads/release/python-378/) to the machine.

Add python to system path.
Install [pip](https://pip.pypa.io/en/stable/installing/) for the machine.

Access to https://trac.osgeo.org/osgeo4w/ and download 
run the code 

### Package 
```
pip install -r requirements.txt
```
# Configuration for .env File

djangorestframework-gis
To run this folder you should have a .env file that include
```
DEBUG= Debug Mode (Be True of False)
SECRET_KEY= A secret key provide by Django, can be generated in MiniWebTool Website
DATABASE_NAME= Currently is using sql database name
DATABASE_USERNAME=username use to access database
DATABASE_PASSWORD=password use to access database
DATABASE_HOST=the url database hosting(should be localhost if hosting locally)
DATABASE_PORT= port that database using( should be 5432 defaultly)
DATABASE_INITCOMMAND="SET sql_mode='STRICT_TRANS_TABLES'"
```

# Operating Instruction

## To run locally

For the first time running the application, should setup the database first. 
Run the following code:
```
python manage.py migrate
```
Create static folder needed for GCP deployment wont work otherwise
Run following code:
```
python manage.py collectstatic
```
You test locally to see if all works as planned
Run following code:  
```
python manage.py runserver
```

## To Deploy (GCP)
Upload folder to GCP Bucket can be done manually throught website

Create directory in gcloud shell: 
```
mkdir aquality2
```
* ls - to view items in the current directory
* rsync - Synchronize content of two buckets/directories 

Run following to sync bucket containing the app into created directory:
```
gsutil rsync -r gs://aquality2.appspot.com aquality2
```
Go to folder containing app.yaml:
```
cd Aquality_2_AI_Model_Server
```
Run code to deploy app using app.yaml specifications:
```
gcloud app deploy
```

# A file manifest (list of files included)
##### Key:
Folders: |_ 

Files:   *
```
Aquality_2_AI_Model_Server
|_ ai_model
|   |_cfg
|   |  * yolov3.cfg
|   |_darknet
|   |  * _init_.py
|   |  * darknet.py
|   |_data
|   |  * class.names
|   |_migration
|   |  * _init_.py
|   |_utils
|   |  * _init_.py
|   |  * utils.py
|   |_weights
|   |  * yolov3.weigths
|   |
|   * _init_.py
|   * apps.py
|   * urls.py
|   * views.py
|_Aquality2
|    * __init__.py
|    * asgi.py
|    * settings.py
|    * urls.py
|    * wsgi.py
* .env
* .gcloudignore
* .gitignore
* app.yaml
* aquality-sql
* main.py
* manage.py
* readme.md
* requirements.txt

```



# Overview Of Application

This is a backend server for Aquality_2 using django framework.

This server provide API for :

- River List
- Sample History
- User Authentication
- User Register
- Insect List
- Arduino Data List

This application is using Python 3.7.8

# Installation Guide

Install [Python 3.7.8](https://www.python.org/downloads/release/python-378/) to the machine.

Install [pip](https://pip.pypa.io/en/stable/installing/) for the machine.

run the code 

```
pip install -r requirements.txt
```

The command should install all the require packages for the application

# Configuration for .env File

To run this folder you should have a .env file that include
```
DEBUG= Debug Mode (Be True of False)
SECRET_KEY= A secret key provide by Django, can be generated in MiniWebTool Website
DATABASE_NAME=The postgres database name
DATABASE_USERNAME=username use to access database
DATABASE_PASSWORD=password use to access database
DATABASE_HOST=the url database hosting(should be localhost if hosting locally)
DATABASE_PORT= port that database using( should be 5432 defaultly)
DATABASE_INITCOMMAND="SET sql_mode='STRICT_TRANS_TABLES'"
GOOGLEMAP_APIKEY = Google Map Api Key
AWS_ACCESS_KEY_ID = AWS account access key id that have premission to S3 Bucket
AWS_SECRET_ACCESS_KEY = AWS secret access 
AWS_STORAGE_BUCKET_NAME = AWS S3 Bucket Name to Store static and media file
```

# Operating Instruction

For the first time running the application, should setup the database first.

run

```
python manage.py migrate
```

This should set up the database

Then everything is good to go,

You can run 
```
python manage.py runserver
```
To start the server
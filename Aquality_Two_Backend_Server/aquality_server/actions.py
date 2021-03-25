import requests
from aquality_server.models import River
# from django.contrib.gis.geos import Point

#The Path Variable Access to wfd Api
catchmentsUrl = "https://wfdapi.edenireland.ie/api/"
catchmentApiKey = 'catchment/'
subcatchmentApiKey = '/subcatchment/'
waterbodyApiKey = 'waterbody/'

#Get JsonResult From targetUrl
def getJsonFrom(targetUrl):
    response = requests.get(targetUrl)
    return response.json()

#Get all CatchmentList From API
def getCatchmentList():
    targetUrl = catchmentsUrl + catchmentApiKey
    jsonData = getJsonFrom(targetUrl)
    return jsonData['Catchments']

#Get One CatchmentDetai By Catchment Code
def getCatchmentDetail(code):
    targetUrl = catchmentsUrl + catchmentApiKey + code
    jsonData = getJsonFrom(targetUrl)
    return jsonData

#Get All Catchment Detail By Using All Catchment 
def getCatchmentDetailList():
    catchmentList = getCatchmentList()
    catchmentDataList = []
    for catchment in catchmentList:
        targetUrl = catchmentsUrl + catchmentApiKey + catchment['Code']
        catchmentDataList.append(getJsonFrom(targetUrl))
    return catchmentDataList

#Get Subcatchment Detail by SubcatchmentCode
def getSubCatchmentDetail(subcatchmentcode):
    targetUrl = catchmentsUrl + catchmentApiKey + subcatchmentcode.split('_')[0]+ subcatchmentApiKey + subcatchmentcode
    jsonData = getJsonFrom(targetUrl)
    return jsonData

#Get Waterbody Detail by its code
def getWaterBodyDetail(waterbodycode):
    targetUrl = catchmentsUrl + waterbodyApiKey + waterbodycode
    jsonData = getJsonFrom(targetUrl)
    return jsonData

#Get All Waterbody Code 
def getAllWaterBodyCode():
    catchmentList = getCatchmentDetailList()
    waterbodyCodeList = []
    for catchment in catchmentList:
        for subcatchment in catchment['Subcatchments']:
            for waterbody in getSubCatchmentDetail(subcatchment['Code']).get("Waterbodies"):
                waterbodyCodeList.append(waterbody["Code"])
    return waterbodyCodeList
            
#Get All Waterbody Details List
def getAllWaterBodyDetails():
    waterbodyCodeList = getAllWaterBodyCode()
    waterbodyCodeList = list(dict.fromkeys(waterbodyCodeList))
    waterbodyDetailList = []
    for waterbodyCode in waterbodyCodeList:
        targetUrl = catchmentsUrl + waterbodyApiKey + waterbodyCode
        waterbodyDetailList.append(getJsonFrom(targetUrl))
    return waterbodyDetailList

#Get Waterbody Detail By Its Code
def getOneWaterDetails(waterbodyCode):
#   waterbodyCode = "IE_NW_01B010100"
    targetUrl = catchmentsUrl + waterbodyApiKey + waterbodyCode
    return getJsonFrom(targetUrl)

#Save All RiverList into Database
def saveRiverListToDb(waterbodyList):
    for waterbody in waterbodyList:
        water = River(
                river_code=waterbody.get("Code"),
                river_name = waterbody.get("Name"),
                river_catchments_code =waterbody.get("Catchment")[0].get("Code"),
                river_catchments =waterbody.get("Catchment")[0].get("Name"),
                # location = Point(waterbody.get("Longitude"),waterbody.get("Latitude") ),
                latitude = waterbody.get("Latitude"),
                longitude = waterbody.get("Longitude"),
                local_authority = waterbody.get("LocalAuthority"),
                water_body_category  =waterbody.get("Type") ,
                protected_area = waterbody.get("ProtectedArea"),
                transboundary = waterbody.get("Transboundary"),
                canal =waterbody.get("IsCanal") ,
                )
        water.save()

# Load All Data From WFA, Save to DB
def saveRiverListToDbFromWFA():
    waterbodylist = getAllWaterBodyDetails()
    saveRiverListToDb(waterbodylist)
    return 'Done'
import requests
from aquality_server.models import River

#The Path Variable Access to wfd Api
CATCHMENTS_URL = "https://wfdapi.edenireland.ie/api/"
CATCHMENT_API_KEY = 'catchment/'
SUB_CATCHMENT_API_KEY = '/subcatchment/'
WATERBODY_API_KEY = 'waterbody/'

#Get JsonResult From targetUrl
def get_json_from(target_url):
    response = requests.get(target_url)
    return response.json()

#Get all CatchmentList From API
def get_catchment_list():
    target_url = CATCHMENTS_URL + CATCHMENT_API_KEY
    json_data = get_json_from(target_url)
    return json_data['Catchments']

#Get One CatchmentDetai By Catchment Code
def get_catchment_detail(code):
    target_url = CATCHMENTS_URL + CATCHMENT_API_KEY + code
    json_data = get_json_from(target_url)
    return json_data

#Get All Catchment Detail By Using All Catchment 
def get_catchment_detail_list():
    catchment_list = get_catchment_list()
    catchment_data_list = []
    for catchment in catchment_list:
        target_url = CATCHMENTS_URL + CATCHMENT_API_KEY + catchment['Code']
        catchment_data_list.append(get_json_from(target_url))
    return catchment_data_list

#Get Subcatchment Detail by SubcatchmentCode
def get_subcatchment_detail(subcatchment_code):
    target_url = CATCHMENTS_URL + CATCHMENT_API_KEY + subcatchment_code.split('_')[0]+ SUB_CATCHMENT_API_KEY + subcatchment_code
    json_data = get_json_from(target_url)
    return json_data

#Get Waterbody Detail by its code
def get_water_body_detail(waterbody_code):
    target_url = CATCHMENTS_URL + WATERBODY_API_KEY + waterbody_code
    json_data = get_json_from(target_url)
    return json_data

#Get All Waterbody Code 
def get_all_water_body_code():
    catchment_list = get_catchment_detail_list()
    waterbody_code_list = []
    for catchment in catchment_list:
        for subcatchment in catchment['Subcatchments']:
            for waterbody in get_subcatchment_detail(subcatchment['Code']).get("Waterbodies"):
                waterbody_code_list.append(waterbody["Code"])
    return waterbody_code_list
            
#Get All Waterbody Details List
def get_all_water_body_details():
    waterbody_code_list = get_all_water_body_code()
    waterbody_code_list = list(dict.fromkeys(waterbody_code_list))
    waterbody_detail_list = []
    for waterbody_code in waterbody_code_list:
        target_url = CATCHMENTS_URL + WATERBODY_API_KEY + waterbody_code
        waterbody_detail_list.append(get_json_from(target_url))
    return waterbody_detail_list

#Get Waterbody Detail By Its Code
def get_one_water_details(waterbody_code):
    target_url = CATCHMENTS_URL + WATERBODY_API_KEY + waterbody_code
    return get_json_from(target_url)

#Save All RiverList into Database
def save_river_list_to_database(waterbody_list):
    for waterbody in waterbody_list:
        water = River(
                river_code=waterbody.get("Code"),
                river_name = waterbody.get("Name"),
                river_catchments_code =waterbody.get("Catchment")[0].get("Code"),
                river_catchments =waterbody.get("Catchment")[0].get("Name"),
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
def save_river_list_to_database_from_wfa():
    waterbodylist = get_all_water_body_details()
    save_river_list_to_database(waterbodylist)
    return 'Done'
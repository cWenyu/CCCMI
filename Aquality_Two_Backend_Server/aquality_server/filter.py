from decouple import config
import requests
from .models import River, Data


def get_location_from_request(request):
    '''Extract longitude and latitude from request and return a point'''
    longitute = request.query_params.get('longitude')
    latitude = request.query_params.get('latitude')
    return [latitude, longitute]


def get_location_point_from_google_api(request):
    '''Getting coordinates object by using goole api search '''
    request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + request.query_params.get(
        'location') + "&inputtype=textquery&fields=geometry&key=" + config('GOOGLEMAP_APIKEY')
    location_found = requests.get(request_url)
    data = location_found.json().get("candidates")[0].get("geometry").get("location")
    longitude = data.get("lng")
    latitude = data.get("lat")
    return [latitude, longitude]


def get_location_point(request):
    '''Extract request into coordicates point '''
    if (request.query_params.get('longitude') and request.query_params.get('latitude')):
        pnt = get_location_from_request(request)
    elif (request.query_params.get('location')):
        pnt = get_location_point_from_google_api(request)
    else:
        latitude = 54.93
        longitute = -7.55
        pnt = [latitude, longitute]
    return pnt


def get_nearby_list(pnt):
    ''' Using Raw SQL Query to get nearby river list'''
    query = """SELECT 
    river_id,
	longitude,
	latitude,
 
 
	ROUND(
		6378.138 * 2 * ASIN(
			SQRT(
				POW(
					SIN(
						(
							""" + str(pnt[0]) + """ * PI() / 180 - latitude * PI() / 180
						) / 2
					),
					2
				) + COS(""" + str(pnt[0]) + """ * PI() / 180) * COS(latitude * PI() / 180) * POW(
					SIN(
						(
							""" + str(pnt[1]) + """ * PI() / 180 - 	longitude * PI() / 180
						) / 2
					),
					2
				)
			)
		) * 1000
	) AS distance
FROM
aquality_server_river
ORDER BY
	distance ASC"""
    return River.objects.raw(query)[0:5]


def get_nearby_list_hardware(pnt):
    query = """
    SELECT 
        DISTINCT ON (arduino_id) arduino_id,
        data_id,
        longitude,
        latitude,
        date_captured,
    
    
        ROUND(
            6378.138 * 2 * ASIN(
                SQRT(
                    POW(
                        SIN(
                            (
                                """ + str(pnt[0]) + """ * PI() / 180 - latitude * PI() / 180
                            ) / 2
                        ),
                        2
                    ) + COS(""" + str(pnt[0]) + """ * PI() / 180) * COS(latitude * PI() / 180) * POW(
                        SIN(
                            (
                                """ + str(pnt[1]) + """ * PI() / 180 - 	longitude * PI() / 180
                            ) / 2
                        ),
                        2
                    )
                )
            ) * 1000
        ) AS distance
    FROM
    aquality_server_data
    WHERE date_captured BETWEEN NOW() - INTERVAL '15 MINUTES' AND NOW()
    ORDER BY arduino_id, date_captured DESC"""

    return Data.objects.raw(query)

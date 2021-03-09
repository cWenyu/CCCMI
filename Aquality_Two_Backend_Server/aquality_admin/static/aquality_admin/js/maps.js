var map;
var ireland = { lat: 53.4624, lng: -7.6921 };

async function getJSON(){
  return fetch('https://cccmi-aquality.tk/aquality_server/samplerecord/?username=userzzz')
      .then((response)=>response.json())
      .then((responseJson)=>{return responseJson});
};

async function getRiver(array){
    const data = await getJSON()
    for(let i = 0 ; i < data.length ;i++)
    {
      river = data[i].sample_river;
      array.push({lat: river.latitude, lng : river.longitude})
    }
}

//  
async function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: ireland,
        zoom: 7
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [];

    await getRiver(locations);
    
    console.log(locations)


    const markers = locations.map((location, i) => {
        return new google.maps.Marker({
          position: location,
          label: labels[i % labels.length],
        });
      });

    const heatmapdata = locations.map((location) => {
        return new google.maps.LatLng(location.lat,location.lng);
    });
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapdata
    });
    heatmap.setMap(map);

    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}
var map,heatmap,markerclusterer,markers;
var ireland = { lat: 53.4624, lng: -7.6921 };

async function getJSON(){
  return fetch('/aquality_server/samplerecord/?username=userzzz')
  // return fetch('https://cccmi-aquality.tk/aquality_server/samplerecord/?username=userzzz')
      .then((response)=>response.json())
      .then((responseJson)=>{return responseJson});
};

async function getRiver(array){
    const data = await getJSON()
    for(let i = 0 ; i < data.length ;i++)
    {
      river = data[i].sample_river;
      array.push({lat: river.latitude, lng : river.longitude})
      data[i].coordinates = {lat: river.latitude, lng : river.longitude}
    }
    console.log(data)
    return data
}

//  
async function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: ireland,
        zoom: 7
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [];
    var sampleDatas = await getRiver(locations);
    

    markers = sampleDatas.map((sampleData) => {
        var infowindow = new google.maps.InfoWindow({
          content:sampleData.sample_date
        })
        var marker =  new google.maps.Marker({
          position: sampleData.coordinates,
          title: sampleData.sample_user
        });
        marker.addListener("click",()=>{
          infowindow.open(map,marker);
        })
        return marker
      });

    const heatmapdata = locations.map((location) => {
        return new google.maps.LatLng(location.lat,location.lng);
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapdata
    });

    markerclusterer = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}

function toggleHeatmap() {
  if(heatmap.getMap()){
    heatmap.setMap(null)
    markerclusterer.addMarkers(markers)
  }
  else{
    heatmap.setMap(map)
    markerclusterer.clearMarkers()
  }
}

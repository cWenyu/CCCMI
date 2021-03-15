var map, heatmap, markerclusterer, markers;
var ireland = { lat: 53.4624, lng: -7.6921 };

async function getSampleRecordListJSON() {
  return fetch('/aquality_server/samplerecord/?username=userzzz')
    // return fetch('https://cccmi-aquality.tk/aquality_server/samplerecord/?username=userzzz')
    .then((response) => response.json())
    .then((responseJson) => { return responseJson });
};

async function getSampleRecordJSON(sample_id_in) {
  var bodyFormData = new FormData()
  bodyFormData.append('sample_id', sample_id_in)
  return fetch('/aquality_server/sampledetail',
  // return fetch('https://cccmi-aquality.tk/aquality_server/sampledetail',
    {
      method: 'POST',
      body: bodyFormData,

    }
  )
    .then((response) => response.json())
    .then((responseJson) => { return responseJson });
}

async function getRiver(array) {
  const data = await getSampleRecordListJSON()
  for (let i = 0; i < data.length; i++) {
    river = data[i].sample_river;
    array.push({ lat: river.latitude, lng: river.longitude })
    data[i].coordinates = { lat: river.latitude, lng: river.longitude }
  }
  console.log(data)
  return data
}


async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: ireland,
    zoom: 7
  });

  var locations = [];
  var sampleDatas = await getRiver(locations);


  markers = sampleDatas.map((sampleData) => {
    var contentWithLayout =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h2 id="firstHeading" class="firstHeading">ID : ' + sampleData.sample_id + '</h2>' +
      '<div id="bodyContent">' +
      "<p>Sample Date  : " + sampleData.sample_date + "</p>" +
      "<p>Sample Score : " + sampleData.sample_score + "</p>" +
      "<p>Sample User  : " + sampleData.sample_user + "</p>" +
      "<p>Sample Ph    : " + sampleData.sample_ph + "</p>" +
      "<p>Sample Temp  : " + sampleData.sample_tmp + "</p>" +
      "<p>Sample River : " + sampleData.sample_river.river_name + "</p>" +
      "<p>Sample Coor  : " + JSON.stringify(sampleData.coordinates) + "</p>" +
      "<button onclick='setModel(" + sampleData.sample_id + ")' type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Click Here for More Details</button>" +
      "</div>" +
      "</div>";

    var infowindow = new google.maps.InfoWindow({
      content: contentWithLayout
    })
    var marker = new google.maps.Marker({
      position: sampleData.coordinates,
      title: sampleData.sample_user
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    })
    return marker
  });

  const heatmapdata = locations.map((location) => {
    return new google.maps.LatLng(location.lat, location.lng);
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
  if (heatmap.getMap()) {
    heatmap.setMap(null)
    markerclusterer.addMarkers(markers)
  }
  else {
    heatmap.setMap(map)
    markerclusterer.clearMarkers()
  }
}

async function setModel(sample_id) {
  if(document.querySelector('#ModalContent').contains(document.querySelector('.json-container')))
  {
    document.querySelector('#ModalContent').removeChild(document.querySelector('.json-container'))
  }
  var sampleDetail = await getSampleRecordJSON(sample_id)
  const tree = JsonView.createTree(sampleDetail);
  JsonView.render(tree, document.querySelector('#ModalContent'));
  JsonView.expandChildren(tree);
  document.querySelector('#ModalLabel').innerHTML= ("Sampling Detail for ID "+sample_id)
}
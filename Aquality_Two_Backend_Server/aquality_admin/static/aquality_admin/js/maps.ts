let map: google.maps.Map;

const ireland = { lat: 53.1424, lng: -7.6921 };

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: ireland,
    zoom: 8,
  });
  const marker = new google.maps.Marker({
    position: ireland,
    map: map,
  });
}


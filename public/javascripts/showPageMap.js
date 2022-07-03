// const campground = require("../../models/campground");

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 10// starting zoom
});
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');




new mapboxgl.Marker()        //adding a marker for our location
    .setLngLat(campground.geometry.coordinates)//look into the docs...mapbox GL Js
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
    )
.addTo(map) 
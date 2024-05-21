var map;
var circle;
var markerList = [];

function initMap() {
    var mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
    };
    map = new kakao.maps.Map(mapContainer, mapOption);
}

function setRadius() {
    var radiusSelect = document.getElementById('radius-select');
    var radius = radiusSelect.value;

    if (radius === "none") {
        if (circle) {
            circle.setMap(null); // 원을 숨김
        }
        clearMarkers();
        clearRestaurantInfo();
    } else {
        if (circle) {
            circle.setMap(null); // 이전 원을 숨김
        }
        var center = map.getCenter();
        circle = new kakao.maps.Circle({
            center: center,
            radius: parseInt(radius), // 미터 단위의 반경
            strokeWeight: 2,
            strokeColor: '#5347AA',
            strokeOpacity: 0.8,
            fillColor: '#CFE7FF',
            fillOpacity: 0.5
        });
        circle.setMap(map);
        fetchRestaurantInfo(radius);
    }
}

function fetchRestaurantInfo(radius){
    clearMarkers();
    clearRestaurantInfo();

    var center = map.getCenter();
    var lat = center.getLat();
    var lng = center.getLng();

    fetch(`http://localhost:3000/api/restaurants?lat=${lat}&lng=${lng}&radius=${radius}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('No restaurants found.');
            }
            displayRestaurants(data);
        })
        .catch(error => {
            console.error('Error fetching restaurant data:', error);
            displayErrorMessage(error.message);
        });
}

function displayRestaurants(restaurants) {
    const restaurantInfoContainer = document.getElementById('restaurant-info-container');
    restaurantInfoContainer.innerHTML = '';

    restaurants.forEach(restaurant => {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'restaurant-info';
        infoDiv.innerHTML = `
            <div class="restaurant-info-content">
                <h3>${restaurant.name}</h3>
                <p>업종: ${restaurant.category}</p>
                <p>주소: ${restaurant.address}</p>
                <div class="rating">
                    <span>★</span><span>${parseFloat(restaurant.rating).toFixed(1)}</span>
                </div>
                <p>리뷰: ${restaurant.reviewCount}</p>
            </div>
        `;
        restaurantInfoContainer.appendChild(infoDiv);

        const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(restaurant.y, restaurant.x),
            map: map,
            title: restaurant.name
        });
        markerList.push(marker);
    });
}

function clearMarkers() {
    for (var i = 0; i < markerList.length; i++) {
        markerList[i].setMap(null);
    }
    markerList = [];
}

function clearRestaurantInfo() {
    var restaurantInfoContainer = document.getElementById('restaurant-info-container');
    restaurantInfoContainer.innerHTML = '';
}

function displayErrorMessage(message) {
    const restaurantInfoContainer = document.getElementById('restaurant-info-container');
    restaurantInfoContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

window.onload = initMap;

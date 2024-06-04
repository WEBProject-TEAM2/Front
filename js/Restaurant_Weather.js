var map; // 지도 객체
var circle; // 반경을 표시할 원 객체
var markerList = []; // 지도에 표시된 마커 목록
var restaurantList = []; // 검색된 음식점 목록
var infoWindow; // 정보창 객체
var geocoder; // 지오코딩 객체
var panorama; // 거리뷰 객체

const API_KEY = "0eb3c18f86fc6fc3b7f1922d73ae5779"; // 날씨 API 키

// 주요 도시 및 위치 좌표
var locations = {
    서울: { lat: 37.5663, lng: 126.9779 },
    경기: { lat: 37.2751, lng: 127.0096 },
    제주도: { lat: 33.4996, lng: 126.5312 },
    충청남도: { lat: 36.6589, lng: 126.6713 },
    전라북도: { lat: 35.8206, lng: 127.1088 },
    세종: { lat: 36.4803, lng: 127.2895 },
    광주: { lat: 35.1600, lng: 126.8514 },
    경상남도: { lat: 35.2338, lng: 128.6929 },
    충청북도: { lat: 36.6357, lng: 127.4917 },
    인천: { lat: 37.4563, lng: 126.7052 },
    울산: { lat: 35.5395, lng: 129.3114 },
    강원: { lat: 37.8661, lng: 127.7203 },
    경상북도: { lat: 36.5760, lng: 128.5056 },
    전라남도: { lat: 34.8161, lng: 126.4629 },
    대구: { lat: 35.8722, lng: 128.6018 },
    대전: { lat: 36.3504, lng: 127.3845 },
    부산: { lat: 35.1796, lng: 129.0756 },
};

// 지도를 초기화하는 함수
function initMap() {
    var mapOptions = {
        center: { lat: 37.5665, lng: 126.978 }, // 서울 시청 중심 좌표
        zoom: 16, // 초기 줌 레벨 설정
        streetViewControl: true, // 거리뷰 컨트롤을 표시
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // 반경을 표시할 원 객체 초기화
    circle = new google.maps.Circle({
        map: map,
        center: mapOptions.center,
        radius: 0, // 초기 반경 0m
        strokeColor: "#5347AA",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#CFE7FF",
        fillOpacity: 0.5,
    });

    infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();

    // 거리뷰 초기화
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"),
        {
            position: mapOptions.center,
            pov: {
                heading: 34,
                pitch: 10,
            },
            visible: false, // 기본적으로 거리뷰는 숨김
        }
    );

    map.setStreetView(panorama);

    // 거리뷰 상태 변경 시 처리
    google.maps.event.addListener(
        map.getStreetView(),
        "visible_changed",
        function () {
            if (map.getStreetView().getVisible()) {
                document.getElementById("street-view").style.display = "block"; // 거리뷰 표시
            } else {
                document.getElementById("street-view").style.display = "none"; // 거리뷰 숨김
            }
        }
    );

    // 페그맨을 사용하여 거리뷰 위치를 변경할 때 거리뷰를 표시
    google.maps.event.addListener(map, "click", function (event) {
        if (map.getStreetView().getVisible()) {
            panorama.setPosition(event.latLng);
        }
    });
}

// 반경을 설정하는 함수
function setRadius() {
    var radiusSelect = document.getElementById("radius-select");
    var radius = radiusSelect.value;
    if (radius === "none") {
        circle.setMap(null); // 반경을 선택하지 않은 경우 원을 숨김
        clearMarkers();
        clearRestaurantInfo();
    } else {
        circle.setMap(map); // 반경이 선택된 경우 원을 다시 보이게 함
        var center = map.getCenter();
        circle.setCenter(center);
        circle.setRadius(parseInt(radius));
        if (radius === "1000") {
            map.setZoom(15); // 줌 레벨 설정 (16 : 500m정도에 알맞음, 숫자가 클수록 더 많이 확대됨)
        } else if (radius === "500") {
            map.setZoom(16);
        } else {
            map.setZoom(17);
        }
        map.setCenter(center);
        fetchAllRestaurantMarkers(center.lat(), center.lng(), radius);
    }
}

// 지정된 위치로 지도를 이동하는 함수
function moveToLocation(location) {
    if (locations[location]) {
        var newCenter = {
            lat: locations[location].lat,
            lng: locations[location].lng,
        };
        map.setCenter(newCenter);
        circle.setCenter(newCenter);
        map.setZoom(16); // 줌 레벨 설정 (16 : 대충 500m정도에 알맞음)
        document.getElementById("selected-location").textContent =
            "현재 선택된 지역 : " + location;
        fetchAllRestaurantMarkers(
            newCenter.lat,
            newCenter.lng,
            document.getElementById("radius-select").value
        );
    }
}

// 검색 기능을 처리하는 함수
function searchLocation() {
    var address = document.getElementById("search-input").value;
    geocoder.geocode({ address: address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var newCenter = results[0].geometry.location;
            map.setCenter(newCenter);
            circle.setCenter(newCenter);
            panorama.setPosition(newCenter);
            map.setZoom(16);
            document.getElementById("selected-location").textContent =
                "현재 선택된 지역: " + results[0].formatted_address;
            fetchAllRestaurantMarkers(
                newCenter.lat(),
                newCenter.lng(),
                document.getElementById("radius-select").value
            );
            getWeather(newCenter.lat(), newCenter.lng()); // 검색된 위치의 날씨 정보 업데이트
            document.getElementById("search-input").value = ''; // 검색어 초기화
        } else {
            alert("지오코드가 성공하지 못한 이유: " + status);
        }
    });
}

// 드롭다운 메뉴를 토글하는 함수
function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-content");
    dropdown.classList.toggle("show");
}

// 페이지 외부 클릭 시 드롭다운 메뉴 닫기
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-label')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// 음식점 마커를 불러오는 함수
async function fetchAllRestaurantMarkers(lat, lng, radius) {
    clearMarkers();
    clearRestaurantInfo();
    restaurantList = [];

    var service = new google.maps.places.PlacesService(map);
    var request = {
        location: new google.maps.LatLng(lat, lng),
        radius: radius,
        type: ["restaurant"], // 음식점만 검색
    };

    // 페이지별로 결과를 처리하는 함수
    function getNextPage(results, status, pagination) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const infoBox = document.getElementById("restaurant-info-box");

            results.forEach(function (place) {
                var detailsRequest = {
                    placeId: place.place_id,
                    fields: [
                        "name",
                        "vicinity",
                        "formatted_phone_number",
                        "rating",
                        "user_ratings_total",
                        "geometry",
                        "photos",
                    ],
                };

                // 음식점 상세 정보를 불러오는 요청
                service.getDetails(detailsRequest, function (placeDetails, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // 별점 또는 리뷰가 없거나 이미지를 불러올 수 없는 경우 스킵
                        if (
                            placeDetails.rating &&
                            placeDetails.user_ratings_total &&
                            placeDetails.photos
                        ) {
                            createMarker(placeDetails);
                            restaurantList.push(placeDetails);
                            renderRestaurantInfo(restaurantList);
                        }
                    }
                });
            });

            if (pagination && pagination.hasNextPage) {
                pagination.nextPage();
            }
        }
    }

    service.nearbySearch(request, getNextPage);
}

// 마커를 생성하는 함수
function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
    });

    google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
        panorama.setPosition(place.geometry.location);
    });

    markerList.push(marker);
}

// 지도에서 마커를 지우는 함수
function clearMarkers() {
    for (var i = 0; i < markerList.length; i++) {
        markerList[i].setMap(null);
    }
    markerList = [];
}

// 음식점 정보를 지우는 함수
function clearRestaurantInfo() {
    const infoBox = document.getElementById("restaurant-info-box");
    infoBox.innerHTML = "";
}

// 음식점을 정렬하는 함수
function sortRestaurants() {
    var sortBy = document.getElementById("sort-select").value;
    if (sortBy === "rating") {
        restaurantList.sort((a, b) => {
            if (b.rating && a.rating) {
                return b.rating - a.rating;
            } else if (b.rating) {
                return 1;
            } else if (a.rating) {
                return -1;
            } else {
                return 0;
            }
        });
    } else
        if (sortBy === "reviews") {
            restaurantList.sort((a, b) => {
                if (b.user_ratings_total && a.user_ratings_total) {
                    return b.user_ratings_total - a.user_ratings_total;
                } else if (b.user_ratings_total) {
                    return 1;
                } else if (a.user_ratings_total) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }
    renderRestaurantInfo(restaurantList);
}

// 음식점 정보를 표시하는 함수
function renderRestaurantInfo(restaurants) {
    const infoBox = document.getElementById("restaurant-info-box");
    clearRestaurantInfo();

    restaurants.forEach((placeDetails) => {
        const restaurantInfo = document.createElement("div");
        restaurantInfo.classList.add("restaurant-info");

        const img = document.createElement("img");
        img.src = placeDetails.photos
            ? placeDetails.photos[0].getUrl({ maxWidth: 80, maxHeight: 80 })
            : noImageUrl;
        restaurantInfo.appendChild(img);

        const details = document.createElement("div");
        details.classList.add("restaurant-details");

        const name = document.createElement("h4");
        name.textContent = placeDetails.name;
        details.appendChild(name);

        const address = document.createElement("p");
        address.textContent = `주소: ${placeDetails.vicinity}`;
        details.appendChild(address);

        const rating = document.createElement("p");
        rating.classList.add("star-rating");
        rating.textContent = `${placeDetails.rating ? placeDetails.rating.toFixed(1) : "N/A"
            }`;
        details.appendChild(rating);

        const reviewCount = document.createElement("p");
        reviewCount.textContent = `리뷰 수: ${placeDetails.user_ratings_total ? placeDetails.user_ratings_total : "N/A"
            }`;
        details.appendChild(reviewCount);

        const phone = document.createElement("p");
        phone.textContent = `연락처: ${placeDetails.formatted_phone_number
            ? placeDetails.formatted_phone_number
            : "N/A"
            }`;
        details.appendChild(phone);

        restaurantInfo.appendChild(details);

        const actions = document.createElement("div");
        actions.classList.add("restaurant-actions");

        const detailBtn = document.createElement("button");
        detailBtn.textContent = "상세정보";
        detailBtn.addEventListener("click", function () {
            const name = encodeURIComponent(placeDetails.name); // 음식점 이름을 URL 형식에 맞게 인코딩합니다.
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${name}`;
            window.open(mapUrl, "_blank");
        });

        actions.appendChild(detailBtn);

        const likeBtn = document.createElement("button");
        likeBtn.innerHTML = "찜";
        actions.appendChild(likeBtn);
        
        const likeImg = document.createElement("img");
        likeImg.src = "../img/love.png";
        likeImg.alt = "찜";
        likeImg.classList.add("action-image");
        
        // 이미지 로드 실패 시 대체 이미지 설정
        likeImg.onerror = function() {
            this.src = "../img/사진없음.png"; // 대체 이미지 경로
        };
        
        likeBtn.insertBefore(likeImg, likeBtn.firstChild);

        restaurantInfo.appendChild(actions);

        infoBox.appendChild(restaurantInfo);
    });
}


function redirectToPage1() {
    window.location.href = '../html/Main.html';
}
function redirectToPage2() {
    window.location.href = '../html/Hotel.html';
}
function redirectToPage3() {
    window.location.href = '../html/Restaurant_Weather.html';
}
function redirectToPage4() {
    window.location.href = '../html/Tour_att.html';
}
function redirectToPage5() {
    window.location.href = '../html/MyPage.html';
}

// 페이지 로드 시 지도 초기화
window.onload = initMap;

// 좌표를 받을 변수
const COORDS = 'coords';

// DOM 객체들
const weatherInfo = document.querySelector('.weatherInfo');
const weatherIconImg = document.querySelector('.weatherIcon');

// 초기화
function init() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

// 좌표를 얻는데 성공했을 때 쓰이는 함수
function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude); // 얻은 좌표값을 바탕으로 날씨정보를 불러온다.
    initMap(latitude, longitude); // 지도 초기화도 한 번에 수행합니다.
}

// 좌표를 얻는데 실패했을 때 쓰이는 함수
function handleError() {
    console.log("can't not access to location");
}

// 드롭다운에서 지역을 선택했을 때 호출되는 함수
function selectLocation(location) {
    moveToLocation(location); // 선택된 지역으로 이동하고 날씨 업데이트
}

// 드롭다운에서 선택된 지역으로 이동하고 날씨 업데이트하는 함수
function moveToLocation(location) {
    if (locations[location]) {
        var newCenter = {
            lat: locations[location].lat,
            lng: locations[location].lng,
        };
        map.setCenter(newCenter); // 선택된 지역으로 지도 이동
        circle.setCenter(newCenter); // 원도 선택된 지역으로 이동
        map.setZoom(16); // 줌 레벨 설정 (16 : 대충 500m정도에 알맞음)
        getWeather(newCenter.lat, newCenter.lng); // 선택된 지역의 날씨 업데이트

        // 선택된 지역의 이름을 업데이트
        document.getElementById("selected-location").textContent = "현재 선택된 지역: " + location;
        fetchAllRestaurantMarkers(
            newCenter.lat,
            newCenter.lng,
            document.getElementById("radius-select").value
        );
    }
}

// 날씨 API를 통해 날씨에 관련된 정보들을 받아온다.
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            // 온도와 날씨 아이콘 정보를 받아온다.
            const temperature = json.main.temp;
            const weatherIcon = json.weather[0].icon;
            const weatherDescription = convertWeatherDescription(json.weather[0].description); // 영문 설명을 한글로 변환

            // 영문으로 받은 날씨 아이콘 정보를 한글로 변환한다.
            const weatherIconCode = json.weather[0].icon;
            const weatherIconAdrs = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            // 받아온 정보들을 표현한다.
            const weatherIconHTML = `<img src="${weatherIconAdrs}" alt="Weather Icon" style="display: inline-block; vertical-align: middle;">`;
            const temperatureHTML = `<span style="display: inline-block; vertical-align: middle; margin-right: 10px;">${temperature}°C</span>`;
            weatherInfo.innerHTML = `${weatherIconHTML}${temperatureHTML}`;
        })
        .catch((error) => console.log("error:", error));
}

// 영문으로 받은 날씨 설명을 한글로 변환하는 함수
function convertWeatherDescription(description) {
    switch (description) {
        case "clear sky":
            return "맑음";
        case "few clouds":
            return "구름 조금";
        case "scattered clouds":
            return "구름 많음";
        case "broken clouds":
            return "구름 낌";
        case "shower rain":
            return "소나기";
        case "rain":
            return "비";
        case "thunderstorm":
            return "천둥 번개";
        case "snow":
            return "눈";
        case "mist":
            return "안개";
        default:
            return description;
    }
}
function toggleDropdown() {
    const dropdownContent = document.getElementById("myDropdown");
    dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
}

function closeDropdown() {
    const dropdownContent = document.getElementById("myDropdown");
    dropdownContent.style.display = "none";
}

function viewDetail(url) {
    window.open(url, "_blank");
}

init();

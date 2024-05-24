const API_KEY = "0eb3c18f86fc6fc3b7f1922d73ae5779"; //add your API KEY
const COORDS = 'coords'; //좌표를 받을 변수

//DOM객체들
const weatherInfo = document.querySelector('.weatherInfo');
const weatherIconImg = document.querySelector('.weatherIcon');

//초기화
function init() {
    askForCoords();
}

//좌표를 물어보는 함수
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

//좌표를 얻는데 성공했을 때 쓰이는 함수
function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude); //얻은 좌표값을 바탕으로 날씨정보를 불러온다.
}
//좌표를 얻는데 실패했을 때 쓰이는 함수
function handleError() {
    console.log("can't not access to location");
}

// 날씨 api를 통해 날씨에 관련된 정보들을 받아온다.
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
            const temperatureHTML = `<span style="display: inline-block; vertical-align: middle; margin-right: 20px;">${temperature} °C</span>`;
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

// 선택된 지역의 날씨를 가져오는 함수
function getWeatherForLocation(location) {
    // 선택된 지역의 주소를 이용하여 위도와 경도를 가져옴
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': location }, function(results, status) {
        if (status === 'OK') {
            const latitude = results[0].geometry.location.lat();
            const longitude = results[0].geometry.location.lng();
            getWeather(latitude, longitude); // 날씨 정보를 가져오는 함수 호출
            // 지도 이동
            moveToLocationOnMap(results[0].geometry.location);
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// 지도에서 선택된 지역으로 이동하는 함수
function moveToLocationOnMap(location) {
    map.setCenter(location);
}

// 사용자가 지역을 선택했을 때 호출되는 함수
function moveToLocation(location) {
    getWeatherForLocation(location); // 선택된 지역의 날씨를 가져오도록 호출
}

// 사용자가 입력한 지역을 검색했을 때 호출되는 함수
function searchLocation() {
    const input = document.getElementById('search-input').value;
    if (input.trim() !== '') {
        getWeatherForLocation(input); // 입력된 지역의 날씨를 가져오도록 호출
    }
}

// 날씨 정보를 표시하는 함수
function displayWeather(weatherData) {
    // 날씨 정보를 표시할 요소 선택
    const weatherDisplay = document.getElementById('weather-display');
    // 오늘의 날씨 데이터를 표시
    weatherDisplay.textContent = `오늘의 날씨: ${weatherData}`;
}

init();
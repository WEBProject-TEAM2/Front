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
            const weatherDescriptionHTML = `<span style="display: inline-block; vertical-align: middle; margin-left: 20px;">${weatherDescription}</span>`;
            weatherInfo.innerHTML = `${weatherIconHTML}${temperatureHTML}${weatherDescriptionHTML}`;
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
init();
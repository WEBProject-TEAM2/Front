
function redirectToPage() {
    window.location.href = 'mypage.html'; // 'mypage.html'을 마이페이지의 실제 경로로 변경하세요.
}

function goToHome() {
    window.location.href = 'mainpage.html'; // 'mainpage.html'을 메인 페이지의 실제 경로로 변경하세요.
}

function toggleDropdown() {
var dropdownContent = document.getElementById('dropdown-content');
if (dropdownContent.style.display === 'flex') {
dropdownContent.style.display = 'none';
} else {
dropdownContent.style.display = 'flex';
}
}

function showAddress(region) {
var addressDisplay = document.getElementById('address-display');
if (addressDisplay.innerText !== region) {
addressDisplay.innerText = region;
addressDisplay.style.display = 'block';
} else {
if (addressDisplay.style.display === 'block') {
    addressDisplay.innerText = '';
    addressDisplay.style.display = 'none';
} else {
    addressDisplay.style.display = 'block';
}
}
}

window.onload = function() {
var addressDisplay = document.getElementById('address-display');
var dropdownContent = document.getElementById('dropdown-content');

addressDisplay.innerText = '';
addressDisplay.style.display = 'none';

dropdownContent.style.display = 'none'; // 페이지가 처음 로드될 때 드롭다운 컨텐츠를 숨깁니다.

// 날짜 입력 필드 기본값 설정
var travelDateInput = document.getElementById('travel-date');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
travelDateInput.value = `${year}-${month}-${day}`;

var places = [
{ name: "강릉 솔향수목원", coords: [37.693190, 128.862323] },
{ name: "해동횟집", coords: [37.8426092, 128.8736372] },
{ name: "박이추커피", coords: [37.8645917, 128.8424394] },
{ name: "동명낙가사", coords: [37.7113977, 129.0063848] },
{ name: "정동진", coords: [37.6904194, 129.0348774] }
];

// 지도 생성
var mapOptions = {
center: new naver.maps.LatLng(37.769644, 128.897044),
zoom: 10
};
var map = new naver.maps.Map('map', mapOptions);

places.forEach(function(place, index) {
var marker = new naver.maps.Marker({
position: new naver.maps.LatLng(place.coords[0], place.coords[1]),
map: map,
icon: {
    content: `<div style="position: relative; display: flex; justify-content: center; align-items: center;">
                <div style="position: absolute; top: -30px; background: purple; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; color: white; font-size: 12px; font-weight: bold;">
                    ${index + 1}
                </div>
            </div>`
}
});
});

// 여행 경로 선 생성
var pathCoords = places.map(place => new naver.maps.LatLng(place.coords[0], place.coords[1]));
var polyline = new naver.maps.Polyline({
    map: map,
    path: pathCoords,
    strokeColor: 'red', // 선 색상
    strokeWeight: 2,    // 선 두께
    strokeOpacity: 0.7  // 선 투명도
    
});

}


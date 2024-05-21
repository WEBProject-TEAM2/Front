function redirectToPage() {
    window.location.href = '../HTML/myPage.html; // 'mypage.html'을 마이페이지의 실제 경로로 변경하세요.
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
}
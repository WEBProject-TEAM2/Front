<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지</title>
    <script src="https://kit.fontawesome.com/b2560cc337.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/css/MyPage.css">
</head>
<body>
<header>
    <div class="right">
        <a href="../html/Login.html"><button type="button" class="btn-navi login">로그인 / 회원가입</button></a>
        <div class="dropdown">
            <button class="dropdown-btn" onclick="toggleDropdown()"><i class="fa-solid fa-bars"></i></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="/html/Hotel.html" onclick="closeDropdown()">숙소</a>
                <a href="/html/Restaurant_Weather.html" onclick="closeDropdown()">음식점</a>
                <a href="/html/Tour_att.html" onclick="closeDropdown()">관광지</a>
                <a href="/html/MyPage.html" onclick="closeDropdown()">마이페이지</a>
            </div>
        </div>
    </div>
    <h1>혼자왔니</h1>
    <nav>
        <ul>
            <li><a href="/html/Main.html">홈</a></li>
            <li><a href="/html/Hotel.html">숙소</a></li>
            <li><a href="/html/Restaurant_Weather.html">음식점</a></li>
            <li><a href="/html/Tour_att.html">관광지</a></li>
        </ul>
    </nav>
</header>

<div class="profile">
    <img src="/img/my.png" alt="Your Image">
    <div class="text-boxes">
        <input type="text" placeholder="아이디">
        <input type="text" placeholder="이메일">
        <input type="date" placeholder="생년월일">
        <div class="right">
            <button type="button" class="update" onclick="confirmUpdate()">회원 정보 수정</button>
            <button type="button" class="quit" onclick="openModal()">회원탈퇴</button>
        </div>
    </div>
</div>
  
<!-- 회원탈퇴 모달 -->
<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>비밀번호 확인</h2>
        <input type="password" placeholder="비밀번호를 입력하세요" id="passwordInput">
        <button type="button" onclick="confirmDelete()">탈퇴하기</button>
        <button type="button" onclick="closeModal()">취소</button>
    </div>
</div>

<aside class="menu">
    <h1>마이페이지</h1>
    <ul>
        <li><a href="/html/MyPage.html" class="highlight">나의 정보</a></li>
        <li><a href="/html/Like.html">찜 목록 보기</a></li>
    </ul>
</aside>

<script src="/js/MyPage.js"></script>
</body>

<!-- 푸터 -->
<footer>
    <p>당장 떠나고 싶으면 고민하지 말고 Let' Go</p>
    <p>© 2024. 혼자왔니?</p>
</footer>

</html>

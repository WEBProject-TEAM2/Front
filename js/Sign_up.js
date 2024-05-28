function registerUser() {
    // 여기에 회원가입 로직을 추가합니다.
    // 성공적으로 회원가입되었을 경우 아래의 코드를 실행합니다.
    document.getElementById("signupForm").reset(); // 폼을 초기화합니다.
    document.getElementById("success-message").style.display = "block"; // 성공 메시지를 표시합니다.
}

function redirectToLogin() {
    window.location.href = "../HTML/login.html";
}
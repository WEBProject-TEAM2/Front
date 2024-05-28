document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // 여기서 회원가입 여부를 확인합니다. 실제 데이터베이스나 다른 저장소에서 확인할 수 있습니다.
    var isRegistered = false; // 회원가입 여부를 나타내는 변수입니다. 여기서는 가정적으로 false로 설정합니다.

    if (isRegistered) {
        // 회원가입된 경우
        if (username === "admin" && password === "password") {
            alert("로그인에 성공했습니다!");
            // 여기서 실제 로그인 로직을 처리합니다.
            // 예: 페이지 리다이렉션, 서버 요청 등
        } else {
            document.getElementById("error-message").textContent = "Invalid username or password";
        }
    } else {
        // 회원가입되지 않은 경우
        document.getElementById("error-message").textContent = "회원가입을 먼저 해주세요.";
        document.getElementById("signup-link").style.display = "inline-block"; // 회원가입 링크를 보이게 함
    }
});

document.getElementById("signup-link").addEventListener("click", function() {
    // 회원가입 페이지로 이동
    window.location.href = "../HTML/Sign_up.html";
});

// confirmDelete.js
async function confirmDelete() {
    // 모달이 열려있는지 확인
    var modal = document.getElementById("myModal");
    if (modal.style.display === "block") {
        // 입력한 비밀번호 가져오기
        var password = document.getElementById("passwordInput").value;

        // 비밀번호 확인
        const result = await checkPassword(password);

        if (result.success) {
            // 비밀번호가 일치하는 경우
            alert("회원 탈퇴되었습니다.");
            closeModal(); // 모달 닫기
        } else {
            // 비밀번호가 일치하지 않는 경우
            alert(result.message);
        }
    } else {
        // 모달이 열려있지 않은 경우
        alert("비밀번호를 입력하고 확인 버튼을 눌러주세요.");
    }
}

async function checkPassword(password) {
    try {
        const response = await fetch('/api/checkPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        });

        const data = await response.json();
        return data; // 서버에서 받은 결과 반환
    } catch (error) {
        console.error('Error checking password:', error);
        return { success: false, message: '비밀번호 확인 중 오류가 발생했습니다.' };
    }
}

// MyPage.js
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function confirmUpdate() {
    alert("회원 정보가 수정되었습니다.");
}

function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

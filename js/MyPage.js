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

// 회원 정보 수정 모달 열기
function openUpdateProfileModal() {
    document.getElementById("updateProfileModal").style.display = "block";
}

// 회원 정보 수정 모달 닫기
function closeUpdateProfileModal() {
    document.getElementById("updateProfileModal").style.display = "none";
}

// 회원 정보 수정 확인
function confirmUpdateProfile() {
    var password = document.getElementById("updatePasswordInput").value;
    var confirmPassword = document.getElementById("updateConfirmPasswordInput").value;

    if (password === "" || confirmPassword === "") {
        alert("비밀번호를 입력하세요.");
        return;
    }

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    // 여기에 회원 정보 수정 로직을 추가합니다.
    alert("회원 정보가 수정되었습니다.");
    closeUpdateProfileModal(); // 모달 닫기
}

// 회원탈퇴 모달 열기
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// 회원탈퇴 모달 닫기
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function confirmDelete() {
    var password = document.getElementById("passwordInput").value;
    if (password === "") {
        alert("비밀번호를 입력하세요.");
        return;
    }
    // 여기에서 비밀번호 확인 및 회원 탈퇴 로직을 추가합니다.
    alert("회원 탈퇴가 완료되었습니다.");
    closeModal(); // 모달 닫기
}

function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

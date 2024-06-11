// confirmDelete.js

// 회원 탈퇴 확인 및 처리 함수
async function confirmDelete() {
    // 탈퇴 확인 메시지 출력
    var result = confirm("정말 탈퇴하시겠습니까?\n탈퇴시, 복구가 불가능합니다.");
    if (result) {  // 사용자가 확인을 누르면
        // 비밀번호 입력 값을 가져옴
        var password = document.getElementById('passwordInput').value;
        try {
            // 서버에 DELETE 요청을 보내 탈퇴 처리
            const response = await fetch('/user/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                // 비밀번호를 JSON 형식으로 본문에 포함
                body: JSON.stringify({ password: password })
            });

            // 서버 응답을 JSON 형식으로 파싱
            const data = await response.json();
            console.log("data : ", data); // 응답 데이터 출력
            console.log("response : ", response); // 응답 객체 출력

            // 응답이 성공적이면
            if (response.ok) {
                alert(data.message); // 성공 메시지 출력
                window.location.href = '/'; // 메인 페이지로 이동
            } else {
                alert(data.message || 'Unknown error occurred'); // 오류 메시지 출력
            }
        } catch (error) { // 요청 중 오류가 발생하면
            alert('오류가 발생했습니다: ' + error.message); // 오류 메시지 출력
            console.error('Error:', error); // 콘솔에 오류 로그 출력
        }
    } else { // 사용자가 취소를 누르면
        alert("탈퇴가 취소되었습니다."); // 취소 메시지 출력
    }
}

// 회원 정보 수정 확인 함수
async function confirmUpdate() {
    // 정보 수정 완료 메시지 출력
    var result = confirm("회원 정보를 수정하시겠습니까?");
    if (result){
        var password = document.getElementById('passwordInput').value;
        try {
            const response=await fetch('/user/update', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: password })
            });
            const data = await response.json();
            console.log("data : ", data);
            console.log("response : ", response);
            if (response.ok) {
                alert(data.message);
                window.location.href = '/';
            }else {
                alert(data.message || 'Unknown error occurred');
            }
        } catch (error){
            alert('오류가 발생했습니다 : ' + error.message);
            console.log(error.message);
        }
    }
}

// 비밀번호 확인 함수
async function checkPassword(password) {
    try {
        // 서버에 POST 요청을 보내 비밀번호 확인
        const response = await fetch('/user/checkPassword', {  // 경로 변경 필요 시 여기 확인
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // 비밀번호를 JSON 형식으로 본문에 포함
            body: JSON.stringify({ password: password })
        });

        // 서버 응답을 JSON 형식으로 파싱
        const data = await response.json();
        // console.log("data : ", data); // 응답 데이터 출력 (주석 처리)
        // console.log("response : ", response); // 응답 객체 출력 (주석 처리)
        return data; // 서버에서 받은 결과 반환
    } catch (error) { // 요청 중 오류가 발생하면
        console.error('Error checking password:', error); // 콘솔에 오류 로그 출력
        // 오류 발생 시 결과 반환
        return { success: false, message: '비밀번호 확인 중 오류가 발생했습니다.' };
    }
}


// MyPage.js

// 모달 창 열기 함수
function openModal() {
    // 모달 창의 display 속성을 block으로 설정하여 표시
    document.getElementById("myModal").style.display = "block";
}

// 모달 창 닫기 함수
function closeModal() {
    // 모달 창의 display 속성을 none으로 설정하여 숨김
    document.getElementById("myModal").style.display = "none";
}



// 드롭다운 메뉴 토글 함수
function toggleDropdown() {
    // 드롭다운 메뉴 요소를 가져옴
    var dropdown = document.getElementById("myDropdown");
    // 드롭다운 메뉴의 display 속성을 토글
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"; // 보이는 경우 숨김
    } else {
        dropdown.style.display = "block"; // 숨겨진 경우 표시
    }
}
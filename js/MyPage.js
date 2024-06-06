function confirmDelete() {
  var result = confirm("정말 탈퇴하시겠습니까?");
  if (result) {
      alert("탈퇴되었습니다."); 
      // 이자리에 탈퇴 로직 추가
  } else {
      alert("탈퇴가 취소되었습니다."); 
  }
}

function confirmUpdate() {
  var result = confirm("정보를 변경하시겠습니까?");
  if (result) {
      alert("변경되었습니다."); 
      // 이자리에 변경 로직 추가
  } else {
      alert("변경이 취소되었습니다."); 
  }
}
function toggleDropdown() {
  const dropdownContent = document.getElementById("myDropdown");
  dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
}

function closeDropdown() {
  const dropdownContent = document.getElementById("myDropdown");
  dropdownContent.style.display = "none";
}

function viewDetail(url) {
  window.open(url, "_blank");
}

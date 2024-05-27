// 마이페이지 아이콘 클릭 시 실행되는 함수
function goToMyPage() {
  // 여기서는 단순히 사용자가 로그인되어 있는지 여부만 확인합니다.
  // 실제 프로젝트에서는 사용자의 로그인 상태를 서버에서 확인해야 합니다.

  // 사용자가 로그인되어 있는지 여부를 확인
  var isLoggedIn = checkUserLoginStatus(); // 여기에는 실제로 사용자의 로그인 상태를 확인하는 코드가 들어갑니다.

  // 만약 사용자가 로그인되어 있지 않다면 로그인 페이지로 이동
  if (!isLoggedIn) {
      window.location.href = "../HTML/login.html";
  } else {
      // 사용자가 로그인되어 있다면 마이페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
      window.location.href = "../HTML/MyPage.html";
  }
}

// 실제로 사용자의 로그인 상태를 확인하는 함수
function checkUserLoginStatus() {
  // 여기에는 실제로 사용자의 로그인 상태를 확인하는 코드가 들어갑니다.
  // 예를 들어, 쿠키나 세션을 사용하여 사용자의 로그인 상태를 확인할 수 있습니다.
  // 이 함수는 사용자가 로그인되어 있는지 여부를 true 또는 false로 반환합니다.
  // 이 예시에서는 간단히 false를 반환하도록 합니다.
  return false;
}

function openURL(url) {
  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
  const topResultsDiv = document.getElementById("top-results");
  const resultCards = topResultsDiv.querySelectorAll(".result-card");
  const numCardsPerSlide = 4; // 각 슬라이드당 표시될 카드의 수
  const numSlides = Math.ceil(resultCards.length / numCardsPerSlide); // 전체 슬라이드 수

  let currentSlide = 0;

  // 결과 카드들을 그룹으로 나누기
  const cardGroups = [];
  for (let i = 0; i < numSlides; i++) {
    cardGroups.push(
      Array.from(resultCards).slice(
        i * numCardsPerSlide,
        (i + 1) * numCardsPerSlide
      )
    );
  }

  // 모든 이미지의 크기를 조정하여 동일하게 만듭니다.
  function setEqualImageSize() {
    let maxWidth = 0;
    let maxHeight = 0;
    // 모든 카드의 이미지 크기를 비교하여 최대 너비와 높이를 구합니다.
    resultCards.forEach((card) => {
      const image = card.querySelector("img");
      const width = image.offsetWidth;
      const height = image.offsetHeight;
      maxWidth = Math.max(maxWidth, width);
      maxHeight = Math.max(maxHeight, height);
    });
    // 최대 너비와 높이를 모든 이미지에 적용합니다.
    resultCards.forEach((card) => {
      const image = card.querySelector("img");
      image.style.width = `${maxWidth}px`;
      image.style.height = `${maxHeight}px`;
    });
  }

  function showSlide(slideIndex) {
    // 모든 카드를 숨깁니다.
    resultCards.forEach((card) => {
      card.style.display = "none";
    });

    // 해당 슬라이드의 카드들을 표시합니다.
    cardGroups[slideIndex].forEach((card) => {
      card.style.display = "block";
    });

    // 각 이미지의 크기를 조정합니다.
    setEqualImageSize();
  }

  // 페이지 로드 후 처음 3개의 카드 표시
  showSlide(0);

  // 일정 시간마다 다음 슬라이드 표시
  setInterval(() => {
    currentSlide = (currentSlide + 1) % numSlides;
    showSlide(currentSlide);
  }, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
  const travelInfoDiv = document.getElementById("travel-info");
  let currentPage = 1;
  let isInitialLoad = true;

  travelInfoDiv.addEventListener("click", function (event) {
    if (event.target.classList.contains("detail-button")) {
      const url = event.target.dataset.url;
      window.open(url, "_blank");
    }
  });

  // 이미지 URL 배열
  const initialImageUrls = [
    "../img/카트.jpg",
    "../img/광안리.jpg",
    "../img/짚라인.jpg",
    "../img/어름치 마을.jpg",
  ];

  const subsequentImageUrls1 = [
    "../img/네트어드벤처.jpg",
    "../img/단양 선암골생태유람길.PNG",
    "../img/춘천 강촌레일파크.PNG",
    "../img/벚꽃 명당 영천 임고강변공원.PNG",
  ];

  const subsequentImageUrls2 = [
    "../img/임실 사선대국민관광지.PNG",
    "../img/나주 영산강둔치체육공원.PNG",
    "../img/시흥 그린웨이.PNG",
    "../img/강릉 자전거 타고 한 바퀴.PNG",
  ];

  const subsequentImageUrls3 = [
    "../img/서산 천수만 자전거길.PNG",
    "../img/영주 자전거길.PNG",
    "../img/광양 섬진강자전거길.PNG",
    "../img/팔공산.PNG",
  ];

  function preloadImages(urls) {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  preloadImages(initialImageUrls);
  preloadImages(subsequentImageUrls1);

  // 함수를 통해 여행 정보를 가져와서 화면에 표시합니다.
  function fetchAndDisplayTravelInfo(numOfRows, pageNo) {
    fetch(
      `http://api.kcisa.kr/openapi/API_CNV_061/request?serviceKey=346a3dbc-d9fb-41f2-aae0-1a125ccbc5e6&numOfRows=${numOfRows}&pageNo=${pageNo}`
    )
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        // 기존의 카드를 모두 제거합니다.
        while (travelInfoDiv.firstChild) {
          travelInfoDiv.removeChild(travelInfoDiv.firstChild);
        }

        // 적절한 이미지 URL 배열을 선택합니다.
        let imageUrls;
        if (pageNo === 1) {
          imageUrls = initialImageUrls;
        } else if (pageNo === 2) {
          imageUrls = subsequentImageUrls1;
        } else if (pageNo === 3) {
          imageUrls = subsequentImageUrls2;
        } else if (pageNo === 4) {
          imageUrls = subsequentImageUrls3;
        } else {
          // 페이지 번호가 범위를 벗어날 경우 처리할 내용 추가
        }

        items.forEach((item, index) => {
          const title = item.querySelector("title").textContent;
          const url = item.querySelector("url").textContent;

          // 이미지 URL 배열에서 해당 인덱스의 이미지 경로를 가져옵니다.
          const imageUrl = imageUrls[index % imageUrls.length];

          // 각 이미지를 화면에 표시합니다.
          const itemHTML = `
                <div class="result-card">
                    <img src="${imageUrl}" alt="${title}">
                    <h2>${title}</h2>
                    <button class="detail-button" data-url="${url}">자세히 보기</button>
                </div>
            `;
          travelInfoDiv.insertAdjacentHTML("beforeend", itemHTML);
        });

        if (isInitialLoad) {
          isInitialLoad = false;
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // 페이지 로드 시 처음 5개의 여행 정보를 가져와서 화면에 표시합니다.
  fetchAndDisplayTravelInfo(4, currentPage);

  // 10초마다 새로운 5개의 여행 정보를 가져와서 화면에 표시합니다.
  setInterval(function () {
    if (currentPage < 4) {
      currentPage++; // 다음 페이지로 이동
    } else {
      currentPage = 1; // 처음 페이지로 이동
    }
    preloadImages(subsequentImageUrls1);
    preloadImages(subsequentImageUrls2);
    preloadImages(subsequentImageUrls3);
    fetchAndDisplayTravelInfo(4, currentPage);
  }, 5000);
});

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

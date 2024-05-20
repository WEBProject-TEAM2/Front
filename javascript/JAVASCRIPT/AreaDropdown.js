function toggleDropdown() {
    var dropdown = document.getElementById("region-select");
    var toggleButton = document.getElementById("region-toggle");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        toggleButton.innerHTML = "지역 ▼";
    } else {
        dropdown.style.display = "block";
        toggleButton.innerHTML = "지역 ▲";
    }
}

function closeDropdown() {
    var dropdown = document.getElementById("region-select");
    var toggleButton = document.getElementById("region-toggle");
    dropdown.style.display = "none";
    toggleButton.innerHTML = "지역 ▼";
}

window.onclick = function (event) {
    if (!event.target.matches('.region-button button')) {
        var dropdowns = document.getElementsByClassName("region-select");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
                document.getElementById("region-toggle").innerHTML = "지역 ▼";
            }
        }
    }
}

function activateResults(region) {
    var regionButton = document.getElementById("region-toggle");
    regionButton.innerHTML = "지역: " + region + " ▼";

    document.getElementById('lodging-card').classList.remove('disabled');
    document.getElementById('restaurant-card').classList.remove('disabled');
    document.getElementById('attraction-card').classList.remove('disabled');
}

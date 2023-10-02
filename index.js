const api_url = "https://restcountries.com/v3.1/";
// Search by name or region must add text after it
const apiFetchList = {
  searchAll: "all",
  searchByName: "name/",
  searchByRegion: "region/",
};

const getapi = async (url) => {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  if (response) {
    // hideloader();
  }
  showData(data);
};

function hideloader() {
  document.getElementById("loading").style.display = "none";
}
// Function to define innerHTML for HTML table
const showData = (data) => {
  console.log(data);
};
getapi(api_url + apiFetchList.searchByName + "amer");

// the class name data on dropdown list toggle
const dropDownClassList = {
  expandedClass: ["ease-out", "duration-100", "opacity-100", "scale-100"],
  unexpandedClass: ["ease-in", "duration-75", "opacity-0", "scale-95"],
};

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const toggleDropDown = () => {
  const dropdownList = document.getElementById("dropdown");
  if (dropdownList.getAttribute("aria-expanded") === "false") {
    dropdownList.classList.remove(...dropDownClassList.unexpandedClass);
    dropdownList.classList.add(...dropDownClassList.expandedClass);
    dropdownList.setAttribute("aria-expanded", "true");
  } else {
    dropdownList.classList.remove(...dropDownClassList.expandedClass);
    dropdownList.classList.add(...dropDownClassList.unexpandedClass);
    dropdownList.setAttribute("aria-expanded", "false");
  }
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const api_url = "https://restcountries.com/v3.1/";
// Search by name or region must add text after it
const apiFetchList = {
  searchAll: "all",
  searchByName: "name/",
  searchByRegion: "region/",
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

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
const showData = (countries) => {
  const countryList = document.getElementById("country-list");
  removeAllChildNodes(countryList);

  countries.map((country) => {
    const { flags, name, population, region, capital } = country;
    // country wrapper
    const div = document.createElement("div");
    div.classList.add(
      "h-[336px]",
      "w-full",
      "overflow-hidden",
      "rounded",
      "bg-white",
    );

    // flag
    const flagDiv = document.createElement("div");
    flagDiv.classList.add(
      "h-2/5",
      "w-full",
      "items-center",
      "bg-contain",
      "bg-center",
      "bg-no-repeat",
      "p-2",
      "hover:bg-contain",
      "md:bg-cover",
    );
    flagDiv.style.backgroundImage = `url(${flags.svg})`;

    div.appendChild(flagDiv);
    countryList.appendChild(div);

    // description wrapper
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("p-6");

    // add country name tag
    const countryName = document.createElement("h2");
    countryName.classList.add("text-lg", "font-semibold");
    countryName.textContent = name.official;

    // add country deatil wrapper
    const countryDetailDiv = document.createElement("div");
    countryDetailDiv.classList.add(
      "mt-4",
      "flex",
      "flex-col",
      "gap-2",
      "text-sm",
      "font-light",
    );

    const deatilArr = ["Population", "Region", "Capital"];

    deatilArr.map((deatilTitle) => {
      const paragraph = document.createElement("div");
      const span = document.createElement("span");
      span.classList.add("mr-1", "font-medium");
      span.textContent = deatilTitle + ":";
      paragraph.appendChild(span);

      if (deatilTitle === "Population") {
        paragraph.innerHTML += population.toLocaleString("en-US");
      } else if (deatilTitle === "Region") {
        paragraph.innerHTML += region;
      } else if (deatilTitle === "Capital") {
          paragraph.innerHTML += (capital != undefined)? capital[0]: "N/A";
      }

      countryDetailDiv.appendChild(paragraph);
    });

    descriptionDiv.appendChild(countryName);
    descriptionDiv.appendChild(countryDetailDiv);
    div.append(descriptionDiv);
  });

  /* the country list boilplate */

  // <div class="h-[336px] w-full overflow-hidden rounded bg-white">
  //   <div
  //     class="h-2/5 w-full items-center bg-contain bg-center bg-no-repeat p-2 hover:bg-contain md:bg-cover"
  //     style="background-image: url(https://flagcdn.com/as.svg)"
  //   ></div>
  //   <div class="p-6">
  //     <h2 class="text-lg font-semibold">American Samoa</h2>
  //     <div class="mt-4 flex flex-col gap-2 text-sm">
  //       <div class="font-light">
  //         <span class="mr-1 font-medium">Population:</span>323,947,000
  //       </div>
  //       <div class="font-light">
  //         <span class="mr-1 font-medium">Region:</span>Americas
  //       </div>
  //       <div class="font-light">
  //         <span class="mr-1 font-medium">Capital:</span>Washington, D.C.
  //       </div>
  //     </div>
  //   </div>
  // </div>
};
getapi(api_url + apiFetchList.searchByName + "amer");

// the class name data on dropdown list toggle
const dropDownClassList = {
  expandedClass: ["ease-out", "duration-100", "opacity-100", "scale-100", "z-10"],
  unexpandedClass: ["ease-in", "duration-75", "opacity-0", "scale-95", "-z-10"],
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

// Seatch Bar

const searchCountries = (e) => {
  const searchCountriesName = e.target.value;
  if (searchCountriesName !== "") {
    console.log(searchCountriesName);
    getapi(api_url + apiFetchList.searchByName + searchCountriesName);
  }
};

const searchBar= document
  .getElementById("search-bar")
  .addEventListener("input", searchCountries);

// const menutItems = document.querySelectorAll('[role="menuitem"]');
// console.log(menutItems);

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

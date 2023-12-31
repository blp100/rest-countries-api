const api_url = "https://restcountries.com/v3.1/";
// Search by name or region must add text after it
const apiFetchList = {
  searchAll: "all",
  searchByName: "name/",
  searchByRegion: "region/",
  searchByCCA3: "alpha?codes=",
  shortQueryFileds: "fields=flags,name,population,region,capital,cca3",
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
const getapi = async (url) => {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  // console.log(data);
  if (data.status) {
    return data.message;
  }

  if (response) {
    // hideloader();
  }
  return data;
};

function hideloader() {
  document.getElementById("loading").style.display = "none";
}
// Function to define innerHTML for HTML table
const showData = (countries) => {
  const countryList = document.getElementById("country-list");
  removeAllChildNodes(countryList);

  if (typeof countries === "string") {
    const div = document.createElement("div");
    div.classList.add(
      "h-[336px]",
      "w-full",
      "flex",
      "items-center",
      "text-3xl",
      "bg-zinc-200",
      "opacity-50",
      "text-center",
      "rounded",
      "p-4",
    );
    div.textContent = "This country is not on Earth.";
    countryList.appendChild(div);
    return;
  }

  countries.map((country) => {
    const { flags, name, population, region, capital, cca3 } = country;
    // country wrapper
    const anchor = document.createElement("a");
    anchor.classList.add(
      "h-[336px]",
      "w-full",
      "overflow-hidden",
      "rounded",
      "bg-white",
    );
    anchor.href = "country.html?cca3=" + cca3;

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

    anchor.appendChild(flagDiv);
    countryList.appendChild(anchor);

    // description wrapper
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("p-6");

    // add country name tag
    const countryName = document.createElement("h2");
    countryName.classList.add("text-lg", "font-semibold");
    countryName.textContent = name.common;

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
        paragraph.innerHTML += capital.length !== 0 ? capital[0] : "N/A";
      }

      countryDetailDiv.appendChild(paragraph);
    });

    descriptionDiv.appendChild(countryName);
    descriptionDiv.appendChild(countryDetailDiv);
    anchor.append(descriptionDiv);
  });

  /* the country list boilerplate */

  // <a class="h-[336px] w-full overflow-hidden rounded bg-white">
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
  // </a>
};

(async () => {
  const data = await getapi(
    api_url +
      apiFetchList.searchByCCA3 +
      "AUS,CAN,USA,SAU,IND,RUS,ZAF,TUR,ARG,BRA,MEX,FRA,DEU,ITA,GBR,CHN,IDN,JPN,KOR" +
      "&" +
      apiFetchList.shortQueryFileds,
  );
  showData(data);
})();

// the class name data on dropdown list toggle
const dropDownClassList = {
  expandedClass: [
    "ease-out",
    "duration-100",
    "opacity-100",
    "scale-100",
    "z-10",
  ],
  unexpandedClass: ["ease-in", "duration-75", "opacity-0", "scale-95", "-z-10"],
};

// Seatch Bar
const queryCountries = (e) => {
  const searchCountriesName = e.target.value;
  if (searchCountriesName !== "") {
    (async () => {
      const data = await getapi(
        api_url +
          apiFetchList.searchByName +
          searchCountriesName +
          "?" +
          apiFetchList.shortQueryFileds,
      );
      showData(data);
    })();
  }
  menutItems.forEach((item) => {
    item.classList.remove("bg-gray-100", "text-gray-900", "font-semibold");
  });
};

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", queryCountries);

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

const menutItems = document.querySelectorAll('[role="menuitem"]');

// Region Menu Items
const queryRegion = (e) => {
  const regionName = e.target.innerText;
  (async () => {
    const data = await getapi(
      api_url +
        apiFetchList.searchByRegion +
        regionName +
        "?" +
        apiFetchList.shortQueryFileds,
    );
    showData(data);
  })();
  menutItems.forEach((item) => {
    item.classList.remove("bg-gray-100", "text-gray-900", "font-semibold");
  });
  e.target.classList.add("bg-gray-100", "text-gray-900", "font-semibold");
  toggleDropDown();
};

menutItems.forEach((item) => {
  item.addEventListener("click", queryRegion);
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (
    !(dropdowns = document
      .getElementById("dropdown-menu")
      .contains(event.target))
  ) {
    const dropdownList = document.getElementById("dropdown");
    dropdownList.classList.remove(...dropDownClassList.expandedClass);
    dropdownList.classList.add(...dropDownClassList.unexpandedClass);
    dropdownList.setAttribute("aria-expanded", "false");
  }
};

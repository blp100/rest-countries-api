const api_url = "https://restcountries.com/v3.1/";

window.addEventListener("load", () => {
  try {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var name = url.searchParams.get("name");
    var cca3 = url.searchParams.get("cca3");
    // console.log(name);
    // console.log(cca3);
    if (name) {
      (async () => {
        const data = await getapi(
          api_url +
            "name/" +
            name +
            "?fulltext=true&" +
            "fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders",
        );
        showData(data);
      })();
      return;
    } else if (cca3) {
      (async () => {
        const data = await getapi(
          api_url +
            "alpha?codes=" +
            cca3 +
            "&fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders",
        );
        showData(data);
        return;
      })();
    }
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
  }
});

const getapi = async (url) => {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  if (response) {
    // hideloader();
  }
  return await data;
};

const showData = (countries) => {
  const [country] = countries;
  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = country;

  if (borders.length !== 0) {
    (async () => {
      const data = await getapi(
        api_url + "alpha?codes=" + borders.toString() + "&fields=name,cca3",
      );
      showborder(data);
    })();
  } else {
    showborder(borders);
  }

  const countryFlag = document.getElementById("flag");
  countryFlag.src = flags.svg;
  countryFlag.alt = flags.alt;

  const countryName = document.getElementById("country-name");
  countryName.textContent = name.common;

  const countryInformation = document.getElementById("country-information");
  const informationAmount = 8;

  const nativeName = Object.values(name?.nativeName)[0]?.common;
  const currenciesName = Object.values(currencies)[0]?.name;
  const languagesList = Object.values(languages);

  for (let i = 0; i < informationAmount; i++) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.classList.add("mr-1", "font-semibold");
    li.appendChild(span);

    switch (i) {
      case 0:
        span.textContent = "Native Name:";
        li.innerHTML += nativeName !== undefined ? nativeName : "N/A";
        break;
      case 1:
        span.textContent = "Population:";
        li.innerHTML +=
          population !== undefined ? population.toLocaleString() : "N/A";
        break;
      case 2:
        span.textContent = "Region:";
        li.innerHTML += region !== undefined ? region : "N/A";
        break;
      case 3:
        span.textContent = "Sub Region:";
        li.innerHTML +=
          subregion !== undefined && subregion !== "" ? subregion : "N/A";
        break;
      case 4:
        span.textContent = "Capital:";
        li.innerHTML += capital.length !== 0 ? capital[0] : "N/A";
        break;
      case 5:
        span.textContent = "Top Level Domain:";
        li.innerHTML += tld.length !== 0 ? tld[0] : "N/A";
        break;
      case 6:
        span.textContent = "Currencies:";
        li.innerHTML += currenciesName !== undefined ? currenciesName : "N/A";
        break;
      case 7:
        span.textContent = "Languages:";
        li.innerHTML +=
          languagesList.length !== 0 ? languagesList.toString() : "N/A";
        break;
    }
    countryInformation.appendChild(li);
  }
};

// Country Boilerplate
//   <li><span class="mr-1 font-semibold">Native Name:</span>België</li>

const showborder = (borders) => {
  const borderCountries = document.getElementById("border-countries");
  if (borders.length === 0) {
    const div = document.createElement("div");
    div.classList.add(
      "rounded",
      "bg-zinc-200",
      "px-4",
      "py-2",
      "transition-colors",
      "opacity-50",
    );
    div.textContent = "N/A";
    borderCountries.appendChild(div);
    return;
  }
  borders.map((country) => {
    const { name, cca3 } = country;

    const anchor = document.createElement("a");
    anchor.classList.add(
      "rounded",
      "bg-white",
      "px-4",
      "py-2",
      "transition-colors",
      "hover:bg-zinc-200",
    );
    anchor.href = "country.html?cca3=" + cca3;
    anchor.textContent = name.common;

    borderCountries.appendChild(anchor);
  });
};

// Border countries boilerplate
// <button
//   class="rounded bg-white px-4 py-2 transition-colors hover:bg-zinc-200"
// >
//   France
// </button>

async function countriesInfo() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let countries = await response.json();
  return countries;
}
const countryInfoArray = countriesInfo().then((countries) => {
  return countries;
});
const displayDiv = document.createElement("div");
displayDiv.setAttribute("id", "display-country");

function display(event) {
  const searchCountry = event.target.value.toLowerCase();

  countryInfoArray.then((countries) => {
    let countryNames = countries.filter((country) => {
      if (country.name.common.toLowerCase().includes(searchCountry)) {
        return country.name.common;
      }
    });
    if (countryNames.length != 0) {
      displayDiv.innerHTML = "";
      document.getElementById("content").appendChild(displayDiv);
      countryNames.forEach((country) => {
        let displayName = document.createElement("p");
        displayName.innerHTML = country.name.common + "<br/>";
        displayName.onclick = () => countryInfo(country);
        displayName.setAttribute("class", "display-name");
        displayDiv.appendChild(displayName);
      });
    } else {
      displayDiv.innerHTML = "Please enter a valid country name.";
      document.getElementById("content").appendChild(displayDiv);
    }
  });
}

const displayCountryDiv = document.createElement("div");
displayCountryDiv.setAttribute("class", "display-country-info");

function countryInfo(country) {
  displayCountryDiv.innerHTML = "";
  document.getElementById("content").appendChild(displayCountryDiv);
  Object.entries(country).forEach(([key, value]) => {
    let displayPara = document.createElement("p");
    displayCountryDiv.appendChild(displayPara);
    displayPara.innerHTML = key + " : " + value;
  });
}

let time = document.getElementById("time");
setTimeout(() => {
  setInterval(() => {
    let now = new Date();
    time.innerHTML = now;
  }, 1000);
}, 100);

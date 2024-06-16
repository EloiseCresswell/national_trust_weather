//getting the lat and long for the weather based off of the map's lat and long
let ahref = document.getElementById("propertyViewOnGoogleMaps_image");
// console.log(ahref.href);
// console.log(ahref.href.indexOf("destination="));
const latlongindex = ahref.href.indexOf("destination=");
let allLatLng = ahref.href.slice(latlongindex + 12);
let divideLatLong = allLatLng.indexOf("%");
let latitude = allLatLng.slice(0, divideLatLong);
let longitude = allLatLng.slice(divideLatLong + 3);
// console.log(latitude);
// console.log(longitude);

//creating a new li to go with the li's on the national trust's page
// console.log(allWeather[0]);
const listForWeather = document.createElement("li");
listForWeather.id = "place-weather";
//main overall div to contain the weather and the titles
const mainDiv = document.createElement("div");
mainDiv.className = 'weather__holdingDiv aria-hidden="true"';
listForWeather.appendChild(mainDiv);
//div to hold the titles (dates for the weather)
const headerDiv = document.createElement("div");
headerDiv.className = "weather__headerDiv";
mainDiv.appendChild(headerDiv);
//div to hold the results of the weather
const resultsDiv = document.createElement("div");
resultsDiv.className = "weather__resultsDiv";
resultsDiv.id = "weather__resultsDiv";
resultsDiv.style.setProperty("display", "flex");
resultsDiv.style.setProperty("justify-content", "space-around");
mainDiv.appendChild(resultsDiv);

//accessing the list used to show the visitor information
let ul = document.getElementsByClassName(
  "Accordionstyle__StyledAccordionsList-sc-5agikf-2"
);
//cloning place-contact
let lastList = document.getElementById("place-contact");
let clonedLast = lastList.cloneNode(true);
clonedLast.querySelector("span").textContent = "Weather";
ul[0].appendChild(clonedLast);
clonedLast.appendChild(listForWeather);
clonedLast.style.setProperty(
  "border-bottom",
  "0.0625rem solid rgb(31, 31, 31);"
);

clonedLast.addEventListener("click", function () {
  console.log("clicking clones");
  let showingDiv = document.getElementById("place-weather");
  console.log(showingDiv);
  // Check the visibility using style property
  if (showingDiv.style.visibility === "visible") {
    // Update styles using style property
    showingDiv.style.setProperty("max-height", "0px");
    showingDiv.style.removeProperty("min-height", "100%");
    showingDiv.style.visibility = "hidden";
  } else {
    // Update styles using style property
    showingDiv.style.setProperty("min-height", "100%");
    showingDiv.style.removeProperty("max-height", "0px");
    showingDiv.style.visibility = "visible";
  }

  weather();
});

//fetch request to get the weather from the API
async function getWeather() {
  try {
    const response = await fetch(
      `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=${latitude}&lon=${longitude}`
    );
    if (response.ok) {
      const weather = await response.json();
      return weather;
    } else {
      console.error("Promise resolved but HTTP status failed");
      //adding error message if the weather is not found - this will need to be assigned to the right place in the NT site
      let htmlFailRequest = "<p>Oops, something went wrong!</p>";
      document.body.innerHTML = htmlFailRequest;
    }
  } catch {
    console.error("Promise rejected");
    //adding error message if the weather is not found
    let htmlFailRequest = "<p>Oops, something went wrong!</p>";
    document.body.innerHTML = htmlFailRequest;
  }
}
//calling the get weather function
const weatherFromAPI = await getWeather();
// Save weather from API to sessionStorage
sessionStorage.setItem("weather", JSON.stringify(weatherFromAPI.list));
// Get saved data from sessionStorage - which is stored when get weather is run
let weatherData = JSON.parse(sessionStorage.getItem("weather"));

//finding weather for each of the days
async function filteredWeather(weather) {
  console.log(weather);
  let selectedWeather = [];
  let todayWeather = [];
  let tomorrowWeather = [];
  let dayAfterWeather = [];
  //filtering the weather to only have the weather data for the times wanted
  selectedWeather = weather.filter(
    (weather) =>
      Number(weather.dt_txt.slice(10, -6)) >= 9 &&
      Number(weather.dt_txt.slice(10, -6) <= 18)
  );
  //selectedWeather is the weather for times 9am - 6pm
  //finding todays weather
  const date = new Date().toJSON().slice(0, 10);
  //   console.log(date);
  todayWeather = selectedWeather.filter(
    (weather) => weather.dt_txt.slice(0, 10) === date
  );
  //next days weather
  const today = new Date(); // get today's date
  let tomorrow = new Date(today);
  //add another day onto today
  tomorrow.setDate(today.getDate() + 1);
  tomorrow = tomorrow.toJSON().slice(0, 10);
  tomorrowWeather = selectedWeather.filter(
    (weather) => weather.dt_txt.slice(0, 10) === tomorrow
  );
  //console.log(tomorrowWeather);
  //the day after's weather
  let dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  dayAfter = dayAfter.toJSON().slice(0, 10);
  dayAfterWeather = selectedWeather.filter(
    (weather) => weather.dt_txt.slice(0, 10) === dayAfter
  );
  console.log([todayWeather, tomorrowWeather, dayAfterWeather]);
  return [todayWeather, tomorrowWeather, dayAfterWeather];
  //console.log(dayAfterWeather);
}
//function to show the weather for the given day
async function displayChosenWeathers(allWeather) {
  console.log("results", resultsDiv);

  resultsDiv.innerHTML = "";
  //addition of todays weather to the resultsDiv
  let htmlToAdd = "";
  allWeather.forEach((element) => {
    //create a div to hold the weather for that given time
    const individualTimeDiv = document.createElement("div");
    individualTimeDiv.className = "weather__individualTime";
    individualTimeDiv.id = "weather__individualTime";
    const todayTime = document.createElement("p");
    //determining the time
    htmlToAdd = `<p>${element.dt_txt.slice(11, -3)}</p>`;
    //determining the weather icon
    // console.log(element.weather[0].icon);
    if (element.weather[0].icon === "01d") {
      htmlToAdd += `
      <img
        alt="icon indicating a clear sky"
        src="http://openweathermap.org/img/wn/01d@2x.png"
      />`;
    } else if (element.weather[0].icon === "02d") {
      htmlToAdd += `
      <img
        alt="icon indicating a few clouds"
        src="http://openweathermap.org/img/wn/02d@2x.png"
      />`;
    } else if (element.weather[0].icon === "03d") {
      htmlToAdd += `
      <img
        alt="icon indicating scattered clouds"
        src="http://openweathermap.org/img/wn/03d@2x.png"
      />
    `;
    } else if (element.weather[0].icon === "04d") {
      htmlToAdd += `
      <img
        alt="icon indicating broken clouds"
        src="http://openweathermap.org/img/wn/04d@2x.png"
      />
    `;
    } else if (element.weather[0].icon === "09d") {
      htmlToAdd += `<img
    alt="icon indicating shower rain"
    src="http://openweathermap.org/img/wn/09d@2x.png"
  />`;
    } else if (element.weather[0].icon === "10d") {
      htmlToAdd += `<img
      alt="icon indicating rain"
      src="http://openweathermap.org/img/wn/10d@2x.png"
    />`;
    } else if (element.weather[0].icon === "11d") {
      htmlToAdd += `<img
      alt="icon indicating thunderstorms"
      src="http://openweathermap.org/img/wn/11d@2x.png"
    />`;
    } else if (element.weather[0].icon === "13d") {
      htmlToAdd += `<img
      alt="icon indicating snow"
      src="http://openweathermap.org/img/wn/13d@2x.png"
    />`;
    } else if (element.weather[0].icon === "50d") {
      htmlToAdd += `<img
  alt="icon indicating mist"
  src="http://openweathermap.org/img/wn/50d@2x.png"
/>`;
    }
    //determing the weather description
    htmlToAdd += `<p>${element.weather[0].description}</p>`;
    //temperature
    htmlToAdd += `<p>${Math.floor(element.main.temp)} &#8451</p>`;
    //rain amount
    htmlToAdd += `<p>${element.rain["3h"]} mm</p>`;
    //wind
    htmlToAdd += `<p>${element.wind.speed.toFixed(1)} mph</p>`;
    resultsDiv.appendChild(individualTimeDiv);
    individualTimeDiv.innerHTML = htmlToAdd;
  });

  // add the newly created element and its content into the DOM
  //adding the weather alert if user clicks on today and the house is shut...
  //taking length of all weather which is 0 if there is no weather / AKA house is shut...
  if (allWeather.length === 0) {
    const noWeatherDiv = document.createElement("div");
    noWeatherDiv.className = "weather__individualTime";
    noWeatherDiv.id = "weather__noWeatherAlert";
    resultsDiv.appendChild(noWeatherDiv);
    noWeatherDiv.innerHTML = `<p>No weather for today as the house is shut, check tomorrow's weather!</p>`;
  }
}

async function weather() {
  //addition of the headers to the headers div - this will show the buttons for today, tomorrow etc when user clicked on the down arrow
  let htmlToAdd = `<div id="weather__buttonsDiv"> <button id="weather__todayButton">Today</button><button id="weather__tomorrowButton">Tomorrow</button><button id="weather__nextDayButton">Next day</button></div>`;
  headerDiv.innerHTML = htmlToAdd;
  let buttonsDivToStyle = document.getElementById("weather__buttonsDiv");
  buttonsDivToStyle.style.cssText = "display: flex; gap: 30px; margin: 15px";

  const newFilteredWeather = await filteredWeather(weatherData);

  await displayChosenWeathers(newFilteredWeather[0]);

  //event listener to listen for tomorrow being clicked
  document
    .getElementById("weather__tomorrowButton")
    .addEventListener("click", async function (e) {
      e.stopPropagation();
      console.log("clicking");

      const element = document.getElementById("weather__resultsDiv");
      console.log(element);
      element.innerHTML = "";
      await displayChosenWeathers(newFilteredWeather[1]);
    });
  //add event listener for next day being clicked
  document
    .getElementById("weather__nextDayButton")
    .addEventListener("click", async function (e) {
      e.stopPropagation();

      console.log("clicking");

      const element = document.getElementById("weather__resultsDiv");
      console.log(element);
      element.innerHTML = "";
      await displayChosenWeathers(newFilteredWeather[2]);
    });
  //add event listener for today being clicked
  document
    .getElementById("weather__todayButton")
    .addEventListener("click", async function (e) {
      e.stopPropagation();

      console.log("clicking");
      const element = document.getElementById("weather__resultsDiv");
      console.log(element);
      element.innerHTML = "";
      await displayChosenWeathers(newFilteredWeather[0]);
    });
}

//how to style
let css = " #weather__resultsDiv { display: flex; }";
let head = document.head || document.getElementsByTagName("head")[0];
let style = document.createElement("style");

head.appendChild(style);

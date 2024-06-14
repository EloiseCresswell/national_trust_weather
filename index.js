//variables used throughout the project
let todayWeather = [];
let tomorrowWeather = [];
let dayAfterWeather = [];

//fetch request to get the weather ...
async function weather() {
  async function getWeather() {
    const response = await fetch(
      "https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026"
    );
    const weather = await response.json();
    return weather;
  }

  const weatherFromAPI = await getWeather();
  //finding weather for today

  async function filteredWeather(weather) {
    let selectedWeather = [];
    //filtering the weather to only have the weather data for the times wanted
    selectedWeather = weather.list.filter(
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
    return [todayWeather, tomorrowWeather, dayAfterWeather];
    //console.log(dayAfterWeather);
  }
  const newFilteredWeather = await filteredWeather(weatherFromAPI);
  //step 3: get the weather to display on the page

  //creating a new li to go with the li's on the national trust's page
  // console.log(allWeather[0]);
  const listForWeather = document.createElement("li");
  listForWeather.className =
    "AccordionItemstyle__AccordionItemWrapper-sc-zx14w3-1 gQSStJ Accordionstyle__StyledAccordionItem-sc-5agikf-0 hYFtIQ";
  listForWeather.id = "place-weather";
  //main overall div to contain the weather and the titles
  const mainDiv = document.createElement("div");
  mainDiv.className = "weather__holdingDiv";
  listForWeather.appendChild(mainDiv);
  //div to hold the titles (dates for the weather)
  const headerDiv = document.createElement("div");
  headerDiv.className = "weather__headerDiv";
  mainDiv.appendChild(headerDiv);
  //div to hold the results of the weather
  const resultsDiv = document.createElement("div");
  resultsDiv.className = "weather__resultsDiv";
  mainDiv.appendChild(resultsDiv);

  //addition of the headers to the headers div
  const todayHeader = document.createElement("h3");
  todayHeader.className = "Typographystyle__HeadingLevel3";
  todayHeader.textContent = "Today";
  headerDiv.appendChild(todayHeader);
  //   console.log(todayWeather);

  async function displayTodayWeathers(allWeather) {
    //addition of todays weather to the resultsDiv
    allWeather.forEach((element) => {
      //create a div to hold the weather for that given time
      const individualTimeDiv = document.createElement("div");
      individualTimeDiv.className = "weather__individualTime";
      const todayTime = document.createElement("p");
      //determining the time
      let htmlToAdd = `<p>${element.dt_txt.slice(11, -3)}</p>`;
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
      //rain amount
      htmlToAdd += `<p>${element.rain["3h"]} mm</p>`;
      //wind
      htmlToAdd += `<p>${element.wind.speed.toFixed(1)} mph</p>`;
      resultsDiv.appendChild(individualTimeDiv);
      individualTimeDiv.innerHTML = htmlToAdd;
    });

    // add the newly created element and its content into the DOM
    document.body.appendChild(listForWeather);
  }

  const todayWeatherDisplay = await displayTodayWeathers(newFilteredWeather[0]);
}
weather();

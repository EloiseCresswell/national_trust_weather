//fetch request to get the weather ...
async function getWeather() {
  const response = await fetch(
    "https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026"
  );
  const weather = await response.json();
  //finding weather for today
  let todayWeather = [];
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
  console.log(tomorrowWeather);
  //the day after's weather
  let dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  dayAfter = dayAfter.toJSON().slice(0, 10);
  dayAfterWeather = selectedWeather.filter(
    (weather) => weather.dt_txt.slice(0, 10) === dayAfter
  );
  console.log(dayAfterWeather);
}

getWeather();

//fetch request to get the weather ...
async function getWeather() {
  const response = await fetch(
    "https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026"
  );
  const weather = await response.json();
  //finding weather for today
  let todayWeather = {};
  let selectedWeather = [];
  //for loop to go through the returned array and pick out the main pieces of information
  selectedWeather = weather.list.filter(
    (weather) =>
      Number(weather.dt_txt.slice(10, -6)) < 9 ||
      Number(weather.dt_txt.slice(10, -6) > 18)
  );
  console.log(selectedWeather);
  //selectedWeather is the weather for times 9am - 6pm
  //using selectedWeather, I now want to extract the main pieces of weather information that I want to show the user
}

getWeather();

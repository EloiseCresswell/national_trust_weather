//fetch request to get the weather ...
async function getWeather() {
  const response = await fetch(
    "https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026"
  );
  const weather = await response.json();
  //finding weather for today
  let todayWeather = {};
  let allWeather = [];
  let selectedWeather = [];
  //for loop to go through the returned array and pick out the main pieces of information
  for (let i = 0; i < weather.list.length; i++) {
    //return all the weather results - this gives us midnight and night times that we want to remove for our user and only give them times related to the opening times
    allWeather.push(weather.list[i]);
  }
  //remove out the results that are not in the times we want
  for (let j = 0; j < allWeather.length; j++) {
    if (
      Number(allWeather[j].dt_txt.slice(10, -6)) >= 9 &&
      Number(allWeather[j].dt_txt.slice(10, -6) <= 18)
    ) {
      selectedWeather.push(allWeather[j]);
    }
  }
  //selectedWeather is the weather for times 9am - 6pm
  //using selectedWeather, I now want to extract the main pieces of weather information that I want to show the user
}

getWeather();

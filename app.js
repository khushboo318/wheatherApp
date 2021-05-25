// 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}',"bab281d79e5f1e9755a68d754cc313e7"

const wheatherApi = {
  key: "946eaf51a1cf690c299b71aeb2e54d42",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

//Event Listener function on keypress
const searchInputBox = document.getElementById("input-box");

searchInputBox.addEventListener("keypress", (event) => {
  if (searchInputBox.value != "") {
    if (event.keyCode == 13) {
      console.log(searchInputBox.value);
      getWheatherReport(searchInputBox.value);
    }
  } else if (searchInputBox.value == "") {
    document.getElementById("city").innerText = "";
  }
});

// Get Wheather Report
function getWheatherReport(city) {
  fetch(
    `${wheatherApi.baseUrl}?q=${city}&appid=${wheatherApi.key}&units=metric`
  )
    .then((wheather) => {
      return wheather.json();
    })
    .then(showWheatherReport);
}

// show wheather report
function showWheatherReport(wheather) {
  console.log(wheather);

  let city = document.getElementById("city");
  city.innerText = `${wheather.name}, ${wheather.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(wheather.main.temp)}&deg;c`;

  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.floor(
    wheather.main.temp_min
  )}&deg;c(min)/${Math.ceil(wheather.main.temp_max)}&deg;c(max)`;

  let wheatherType = document.getElementById("wheather");
  wheatherType.innerText = `${wheather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if (wheatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpeg')";
  } else if (wheatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/cloudy.jpeg')";
  } else if (wheatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rainy.jpg')";
  } else if (wheatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  } else if (wheatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm1.jpeg')";
  }
}

// Date Manage
function dateManage(datearg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sturday",
  ];

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = datearg.getFullYear();
  let month = months[datearg.getMonth()];
  let date = datearg.getDate();
  let day = days[datearg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}

const addCity = document.querySelector(".add-city");
const city = addCity.querySelector("input");
const locationBtn = addCity.querySelector("button");
const weatherInfo = document.querySelector(".weather-info");
const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const minMax = document.querySelector(".min-max");
const errorMssage = document.querySelector(".error");
const body = document.querySelector("body");

const key = "87f38ace566ff2c3e05ec47a70a0fda9";
const url = "https://api.openweathermap.org/data/2.5/weather";

city.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        if (city.value != "") {
            showWeather();
            info();
        }
        else {
            alert("Bir şəhər adı yazın...");
        }
    }
});
locationBtn.addEventListener('click', () => {
    showWeather();
    myLocation();
});

document.addEventListener('DOMContentLoaded', ()=>{
    changeBg();
});

let showWeather = () => {
    addCity.classList.add("close");
    weatherInfo.classList.remove("close");
}

let info = () => {
    let query = `${url}?q=${city.value.trim()}&appid=${key}&units=metric&lang=az`;
    fetch(query).then((weather) => {
        return weather.json();
    }).then((result) => {
        if (result.cod == 404) {
            errorMssage.classList.add("open");
            weatherInfo.classList.add("close");
        }
        else {
            cityName.textContent = `${result.name}, ${result.sys.country}`;
            temp.textContent = `${Math.round(result.main.temp)} °C`;
            description.textContent = `${result.weather[0].description}`;
            minMax.textContent = `${Math.round(result.main.temp_min)} °C/${Math.round(result.main.temp_max)} °C`;
        }
    });
}

let myLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}

let onSuccess = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let query = `${url}?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=az`;
    fetch(query).then((weather) => {
        return weather.json();
    }).then((result) => {
        cityName.textContent = `${result.name}, ${result.sys.country}`;
        temp.textContent = `${Math.round(result.main.temp)} °C`;
        description.textContent = `${result.weather[0].description}`;
        minMax.textContent = `${Math.round(result.main.temp_min)} °C/${Math.round(result.main.temp_max)} °C`;
    });
}

let onError = (err) => {
    if (err.code == 1) {
        alert("Yer bilgiləriniz almaq üçün icazə verin...");
    }
    else if (err.code == 2) {
        alert("Yer bilgisini almaq olamdı...");
    }
    else {
        alert("Bir xəta baş veri...");
    }
}

let changeBg = ()=>{
    let date = new Date();
    let hours = date.getHours();

    if(hours >= 7 && hours <= 19){
        body.style.backgroundImage = "url(/bg2.jpg)";
    }
    else{
        body.style.backgroundImage = "url(/bg.jpg)";
    }
}
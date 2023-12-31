const userTab = document.querySelector("[data-user-weather]")
const searchTab = document.querySelector("[search-user-weather]")

const location_granted = document.querySelector(".location-container")
const location_granted_btn = document.querySelector("[location-Grant-Access]")
const location_search_form = document.querySelector("[location-search-form]")
const location_search_input = document.querySelector("[location-search-here]")
const search_icon = document.querySelector("[loc-search-icon]")
const gif = document.querySelector("[loading-gif]")

const user_weather_info = document.querySelector(".user-weather-info")
const city_name = document.querySelector("[weather-city-name]")
const country_logo = document.querySelector("[weather-country-logo]")
const weather_desc = document.querySelector("[data-weatherDesc]")
const weather_icon = document.querySelector("[data-weatherIcon]")
const temperature = document.querySelector("[data-temp]")
const para = document.querySelector(".parameter")
const wind_data = document.querySelector("[data-wind]")
const humidity_data = document.querySelector("[data-Humidity]")
const cloud_data = document.querySelector("[data-Cloud]")


console.log("Iam in js");
// initially needs
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
let currentTab = userTab;
currentTab.classList.add("current-tab");


// function switchTab(clickedTab) {
//     //remove css from tabs
//     if (clickedTab != currentTab) {
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");
//     }
// }

// userTab.addEventListener("click", () => {
//     switchTab(userTab);
// })


// searchTab.addEventListener("click", () => {
//     switchTab(searchTab);
// })

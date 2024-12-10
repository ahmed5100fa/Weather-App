let current;
let forecast = [];
let city;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const searchInput = document.querySelector('#SearchInput');
const searchBtn = document.querySelector('.find');

async function WeatherService(country = 'Cairo') {
    try {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bc2568b46f424f0eb87123809240912&q=${country}&days=3&aqi=no&alerts=no`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const data = await res.json();
        forecast = data.forecast.forecastday;
        current = data.current;
        city = data.location;

        arrangeCards(current, forecast, city);
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
    }
}

function GETDATE(location) {
    return new Date(location.localtime.replace(" ", "T"));
}

function displayCurrent(current, location) {
    let date = GETDATE(location);
    const currentCard = `
        <div class="col-md-3 weather-card">
            <div class="weather-header">
                <span>${days[date.getDay()]}</span>
                <span>${date.getDate()} ${monthNames[date.getMonth()]}</span>
            </div>
            <div class="city">${location.name}</div>
            <div class="temp text-white">${current.temp_c}°C</div>
            <div class="weather-icon">
                <img src="https:${current.condition.icon}" alt="${current.condition.text}">
            </div>
            <div class="description">${current.condition.text}</div>
            <div class="additional-info">
                <div>
                    <img src="image/icon-umberella.png" alt="Rain Probability">
                    <span>${current.humidity}%</span>
                </div>
                <div>
                    <img src="image/icon-wind.png" alt="Wind Speed">
                    <span>${current.wind_kph} km/h</span>
                </div>
                <div>
                    <img src="image/icon-compass.png" alt="Wind Direction">
                    <span>${current.wind_dir}</span>
                </div>
            </div>
        </div>
    `;

    return currentCard;
}

function displayForecast(forecast) {
    let forecastCards = '';
    for (let i = 0; i < forecast.length; i++) {
        forecastCards += `
            <div class="col-md-3 weather-card two">
                <div class="weather-header d-flex justify-content-center">
                    <span>${days[new Date(forecast[i].date.replace(" ", "T")).getDay()]}</span>
                </div>
                <div class="weather-icon">
                    <img src="https:${forecast[i].day.condition.icon}" alt="Partly Cloudy">
                </div>
                <div class="temp fs-4 text-white">${forecast[i].day.maxtemp_c}°C</div>
                <div class="temp fs-6">${forecast[i].day.mintemp_c}°</div>
                <div class="description">${forecast[i].day.condition.text}</div>
            </div>
        `;
    }
    return forecastCards;
}

function arrangeCards(current, forecast, city) {
    const cardsContainer = document.querySelector('.cards');
    if (cardsContainer) {
        cardsContainer.innerHTML = '';
        cardsContainer.insertAdjacentHTML('afterbegin', displayCurrent(current, city));
        cardsContainer.insertAdjacentHTML('beforeend', displayForecast(forecast));
    } else {
        console.error("No '.cards' container found in the DOM.");
    }
}

searchBtn.addEventListener('click', () => {
    const inputValue = searchInput.value.trim();
    if (inputValue) {
        WeatherService(inputValue);
    } else {
        alert("Please enter a valid city name.");
    }
});

searchInput.addEventListener('input', ()=>{
    const inputValue = searchInput.value.trim();
    WeatherService(inputValue);
})

WeatherService();


document.querySelectorAll('.navbar-nav .nav-item .btn').forEach(item => {
    item.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

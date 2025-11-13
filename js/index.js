async function getLocationByIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const ipData = await response.json();
        const ipResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
        const locationData = await ipResponse.json();
        return locationData.city;
    } catch (error) {
        return 'London';
    }
}

async function fetchData(url){
    try{
        var response = await fetch(url);
        if(response.ok && response.status >= 200 && response.status < 300){
            var data = await response.json();
            console.log(data); 
            displayWeather(data);
        } else {
            throw new Error('failed to fetch data');
        }  
    } catch (error){
        console.error("error fetching data;" , error);
    }  
}

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayWeather(data){
    var forecastday = data.forecast.forecastday;
    var box = "";
    
    for(var i = 0; i < forecastday.length; i++){
        var dayData = forecastday[i];
        var date = new Date(dayData.date.replace(" ", "T"));
        var locationName = i === 0 ? data.location.name : "";
        
        box += `
        <div class="col-lg-4 col-md-6">
            <div class="weather-panel">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <span class="day-title">${days[date.getDay()]}</span>
                    <span class="date">${date.getDate()} ${months[date.getMonth()]}</span>
                </div>
                <h3 class="mb-4">${locationName}</h3>  
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <span class="large-temp">${dayData.day.maxtemp_c}°C</span>
                        <div class="weather-desc">${dayData.day.condition.text}</div>
                        <div class="d-flex align-items-center mt-3 text-muted">
                            <span class="me-3"><i class="fa-solid fa-umbrella"></i> ${dayData.day.daily_chance_of_rain}%</span>
                            <span class="me-3"><i class="fa-solid fa-wind"></i> ${dayData.day.maxwind_kph}km/h</span>
                        </div>
                    </div>
                    <img src="${dayData.day.condition.icon}" alt="${dayData.day.condition.text}" class="weather-icon">
                </div>
            </div>
        </div>
        `;
    }
    
    document.getElementById('rowData').innerHTML = box;
}

var searchBtn = document.querySelector('.btn-primary');
var searchInput = document.querySelector('.form-control');

searchBtn.addEventListener('click', function() {
    var location = searchInput.value.trim();
    if(location) {
        var url = `http://api.weatherapi.com/v1/forecast.json?key=3310605ac6424be5bce91628251211&q=${location}&days=3`;
        fetchData(url);
    }
});

searchInput.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        searchBtn.click(); 
    }
});

getLocationByIP().then(city => {
    console.log("Detected city:", city);
    var url = `http://api.weatherapi.com/v1/forecast.json?key=3310605ac6424be5bce91628251211&q=${city}&days=3`;
    fetchData(url);
});
async function fetchData(url){
try{
        var response = await fetch(url);
        if(response.ok && response.status >= 200 && response.status < 300){
        var data = await response.json();
            console.log(data); 
        displayWeather(data)

        }else{
        throw  new Error('failed to fetch data')
        }  
}  catch (error){
        console.error("error fetching data;" , error);
        
    }  
}
   
    
    


fetchData('http://api.weatherapi.com/v1/forecast.json?key=3310605ac6424be5bce91628251211&q=lond');


function displayWeather(data){
    var forecastday = data.forecast.forecastday;
    var box = ``;
    
    for(var i = 0; i < forecastday.length; i++){
        var dayData = forecastday[i];
        box += `
        <div class="col-lg-4 col-md-6">
            <div class="weather-panel">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <span class="day-title">Monday</span>
                    <span class="date">10 November</span>
                </div>
                <h3 class="mb-4">${data.location.name}</h3>  
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <!-- TEMPERATURE -->
                        <span class="large-temp">${dayData.day.maxtemp_c}°C</span>
                        
                        <!-- WEATHER DESCRIPTION -->
                        <div class="weather-desc">${dayData.day.condition.text}</div>
                        
                        <div class="d-flex align-items-center mt-3 text-muted">
                            <!-- RAIN CHANCE -->
                            <span class="me-3"><i class="fa-solid fa-umbrella"></i> ${dayData.day.daily_chance_of_rain}%</span>
                            
                            <!-- WIND SPEED -->
                            <span class="me-3"><i class="fa-solid fa-wind"></i> ${dayData.day.maxwind_kph}km/h</span>
                            
                            <!-- WIND DIRECTION -->
                                <span><i class="fa-solid fa-compass"></i> N/A</span>
                        </div>
                    </div>
                    
                    <!-- WEATHER ICON -->
                    <img src="${dayData.day.condition.icon}" alt="${dayData.day.condition.text}" class="weather-icon">
                </div>
            </div>
        </div>
        `;
        
    }


document.getElementById('rowData').innerHTML = box;

console.log("Element found:", document.getElementById('rowData'));

}






var searchBtn = document.querySelector('.btn-primary');
var searchInput = document.querySelector('.form-control');

searchBtn.addEventListener('click', function() {
    var location = searchInput.value.trim();
    
    if(location) {
        var url = `http://api.weatherapi.com/v1/forecast.json?key=3310605ac6424be5bce91628251211&q=${location}`;
        console.log("Searching for:", location);
        fetchData(url);
    } else {
        alert("Please enter a location");
    }
});

searchInput.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        searchBtn.click(); 
    }
});
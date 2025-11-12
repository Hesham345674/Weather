async function fetchData(url){
    var response = await fetch(url);
    var data;

        if(response.ok && response.status >= 200 && response.status < 300){
              var data = await response.json()
        console.log(data); 
        }
      
        displayWeather(data)
    }   

    
    
    


fetchData('http://api.weatherapi.com/v1/forecast.json?key=3310605ac6424be5bce91628251211&q=lond');


function displayWeather(data){
    var forecastday = data.forecast.forecastday;

    var box =``;
    for( var i= 0; i< forecastday.length ; i ++){
        var dayData = forecast[i];
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
                                    <span class="large-temp">${dayData.day.maxtemp_c}</span>
                                    <div class="weather-desc">Sunny</div>
                                    <div class="d-flex align-items-center mt-3 text-muted">
                                        <span class="me-3"><i class="fa-solid fa-umbrella"></i> 20%</span>
                                        <span class="me-3"><i class="fa-solid fa-wind"></i> 18km/h</span>
                                        <span><i class="fa-solid fa-compass"></i> East</span>
                                    </div>
                                </div>
                                <i class="fa-solid fa-sun text-warning fs-1"></i>
                            </div>
                        </div>
                    </div>
        
        
        
        `




        
    }
document.getElementById('rawData').innerHTML = box;

}



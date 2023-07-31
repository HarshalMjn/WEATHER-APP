
const API_KEY = "";

function renderWeatherInfo(data) {
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`
    
    document.body.appendChild(newPara);
} 

async function fetchWeatherDetails() {
    try {
        let city = 'goa';

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        console.log("weather data:->",data);

        renderWeatherInfo(data);
    }
    catch(err) {
        //handle the error here

    }
}

async function getCustomWeatherDetails() {
    try {
        let latitude = 17.6333;
        let longitude = 18.3333;

        let result =  await fetch (`https://api.openweathermap.org/data/2.5/weather?
                                 lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

        let data = await result.json();

        console.log(data);

    }
    catch(err) {
        console.log("Error Found",err);
    }
}

function switchTab(clickedTab) {

    apiErrorContainer.classList.remove("active");

    if(clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
          } 
          else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //getFromSessionStorage();
          }
    }
}
 function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("No geoLocation Support");
    }
}function showPosition(postion) {
    let lat = postion.coords.latitude;
    let longi = postion.coords.longitude;

    console.log(lat);
    console.log(logi);

}
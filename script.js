const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[ data-SearchWeather]");
const userContainer = document.querySelector("[weather-container]");

const greantAccessContainer = document.querySelector(".grant-location-conatiner");
const searchFrom = document.querySelector(".data-searchForm");
const loadingScreen = document.querySelector("loading-container");
const userInfoContainer = document.querySelector(".user-info-cotainer");

let currentTab = userTab;
const API_KEY = "2ab52d020fdfc63b2ccd5de2d54907cd";
currentTab.classList.add("current-tab");


function switchTab(clickedTab) {
    if(clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchFrom.classList.contains('active')) {
            userInfoContainer.classList.remove("active");
            greantAccessContainer.classList.remove("active");
            searchFrom.classList.add("active");
        }
        else {
            //main pehle search wal tab pr tha,ab your weather tap visible krna hey
            searchFrom.classList.remove("active");
            userInfoContainer.classList.remove("active")
            // ab main your weather tab mai aagya hu to weather bhi display krna pdega so let check local storage first
            //for coordinates,if we have saved them there.
            getfromSessionStrorage();
        }
    }
}

userTab.addEventListener("click",() => {
    // pass clicks tab as input parameter
    switchTab(userTab);
     
});
searchTab.addEventListener("click", () =>{
    switchTab(searchTab);
});


// check if  cordinate are already present in session storage
function  getfromSessionStrorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    //if local coordinates nhi mile
    if(!localCoordinates) {
        greantAccessContainer.classList.add("active")
    }
    else {
        const  coordinates = JSON.parse(localCoordinates);
        fetchUserweatherInfo(coordinates);
    }

}

async function fetchUserweatherInfo(coordinates) {
    const {lat,log}= coordinates;
    //make grantcontainer invisble
    greantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active")

    // API CALL
    try{

        const response = await fetch (
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
         );
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data)
           
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        // Hw
        

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fetch the elements

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon =  document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp");
    const windspeed = document.querySelector("[data-windxspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const  cloudiness  = document.querySelector("[data-cloudiness]");

    

}



    






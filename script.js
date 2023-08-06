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
getfromSessionStrorage();


function switchTab(clickedTab) {
    if(clickedTab != currentTab) {
        // color change
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
          
        //konse tab pr hu mai --your weather or serach 
        if(!searchFrom.classList.contains('active')) { //!if serach form key ander active nhi hey to excute this means me serch tab visbile kro 
            //means ata your weather remove kr and add the sersch from
            //invisbile remove
            userInfoContainer.classList.remove("active");
            greantAccessContainer.classList.remove("active");
            // visbile add
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
        //ager local coordinates nahi mile to add this class
        greantAccessContainer.classList.add("active")
    }
    else { //local coordinates hey pass to use kro  api call kro
        
        const  coordinates = JSON.parse(localCoordinates);
        // function use fetch the user info and pass coordinates
        fetchUserweatherInfo(coordinates);
    }

}

//  API Call function
async function fetchUserweatherInfo(coordinates) {
    const {lat,lon}= coordinates;
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
       
        //loader remove
       loadingScreen.classList.remove("active");
        //    visbile userinfo
        userInfoContainer.classList.add("active");
        //data mai values lekey UI mai add krega (info mai)
         renderWeatherInfo(data)
           
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        // Hw
        

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fetch the elements
    //kon konsa data hva
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon =  document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp");
    const windspeed = document.querySelector("[data-windxspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const  cloudiness  = document.querySelector("[data-cloudiness]");

    //fetch values from weatherINfo objet and put it UI elements (set UI element )
   cityName = weatherInfo?.name; //direct  child of obj
   countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
   desc.innerText = weatherInfo?.weather?.[0]?.description;
   weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
   temp.innerText = `${weatherInfo?.main?.temp} °C`; //$ 
   windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
   humidity.innerText = `${weatherInfo?.main?.humidity}%`;
   cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
} 
   function getLocation() {
    if(navigator.geolocation) {   // check geo location API support ?
        // hey support find location
        // pass callback funnction showPosition
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        // show an alert for no gelolocation support available
        alert(" gelolocation support available");
    }   
}

function showPosition() {
        //  userCoordinate obj 
        const userCoordinates = {
            lat:Position.coords.latitude,
            lon:Position.coords.longitude,

        }
        //Im sessiomStorage store cooredinate  iss name usercoordinats sey
        sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates)); //string mai convert kiya json obj ko
        //Show on UI
        fetchUserweatherInfo(userContainer);//

}

const greantAccessButton = document.querySelector("[data-grantAccess]");
greantAccessContainer.addEventListener("click",getLocation);

// serch ko submit kru kusch hoona chaahiye and default action privent
let searchInput = document.querySelector("data-searchInpt");
searchFrom.addEventListener("submit", (e) => {
    

    e.preventDefault(); //arrow func remove the defult method
    if(searchInput.value == "") return; //check the string is empty then return

    //input is not empty  
    fetchSearchweatherInfo(searchInput.value); //base on city fthis function call

});
 
// API call so make the asncy this fun 
 async function fetchSearchweatherInfo(city) {

    // fisrt add loderK (api call )
    loadingScreen.classList.add("active");
    // old weather remove 
    userInfoContainer.classList.remove("active")
    // greantAccessContainer remove your weather
    greantAccessContainer.classList.remove("active");

    // API call {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
             const data = await response.json();
             loadingScreen.classList.remove("active");
            //  weather show 
            userInfoContainer.classList.add("active")
            // value of  userContainer
            renderWeatherInfo(data);

             
            
        
        }

        catch(err) {

        }
    }

 







 


    



    






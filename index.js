const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const card2 = document.querySelector(".card2");
const apiKey = "931f90ca066f3f723d9c9f02d4d20983";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            displayRecom(weatherData);
            
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherImage = getWeatherEmoji(id);

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = capitalizeWords(description);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(weatherImage);

    setBackgroundVideo(id);
}

function capitalizeWords(str) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function displayRecom(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card2.textContent = "";
    card2.style.display = "flex";

    const Recommendation = document.createElement("p");
    Recommendation.innerHTML  = getWeatherRecom(id);
    card2.appendChild(Recommendation);

    Recommendation.classList.add("Recommendation");

    const weatherImage2 = getRecomImage(id);
    card2.appendChild(weatherImage2);
    
}

function getWeatherRecom(weatherId) {

    let str;
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            str = "Thunder <br> Stay Inside";
            break
        case (weatherId >= 300 && weatherId < 400):
            str = "Heavy Rain <br> Bring An Umbrella";
            break
        case (weatherId >= 500 && weatherId < 600):
            str = "Light Rain <br> Recommend Umbrella";
            break
        case (weatherId >= 600 && weatherId < 700):
            str = "Snowy <br> Wear Your Jackets";
            break
        case (weatherId >= 700 && weatherId < 800):
            str = "Foggy <br> Drive Safely";
            break
        case (weatherId === 800):
            str = "Sunny <br> Nice Day Out";
            break
        case (weatherId >= 801 && weatherId < 810):
            str = "Cloudy <br> Enjoy The Day";
            break
        default:
            str = "Unknown Phenomenon";
            break

    }
    return str;
}

function getRecomImage(weatherId) {
    const img = document.createElement("img");
    img.classList.add("weatherImage2");

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            img.src = "RecomImages/thunder-r.png";
            break;
        case (weatherId >= 300 && weatherId < 400):
            img.src = "RecomImages/heavyrain-r.png"; 
            break;
        case (weatherId >= 500 && weatherId < 600):
            img.src = "RecomImages/lightrain-r.png"; 
            break;
        case (weatherId >= 600 && weatherId < 700):
            img.src = "RecomImages/snowy-r.png";
            break;
        case (weatherId >= 700 && weatherId < 800):
            img.src = "RecomImages/foggy-r.png";
            break;
        case (weatherId === 800):
            img.src = "RecomImages/sunny-r.png"; 
            break;
        case (weatherId >= 801 && weatherId < 810):
            img.src = "RecomImages/cloudy-r.png"; 
            break;
        default:
            img.src = "images/shrug.png";
            break;
    }

    return img;
}

function getWeatherEmoji(weatherId) {
    const img = document.createElement("img");
    img.classList.add("weatherImage");

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            img.src = "images/thunder.png";
            break;
        case (weatherId >= 300 && weatherId < 400):
            img.src = "images/heavy-rain.png";
            break;
        case (weatherId >= 500 && weatherId < 600):
            img.src = "images/light-rain.png";
            break;
        case (weatherId >= 600 && weatherId < 700):
            img.src = "images/snow.png"; 
            break;
        case (weatherId >= 700 && weatherId < 800):
            img.src = "images/foggy.png"; 
            break;
        case (weatherId === 800):
            img.src = "images/sun.png"; 
            break;
        case (weatherId >= 801 && weatherId < 810):
            img.src = "images/cloudy.png"; 
            break;
        default:
            img.src = "images/shrug.png"; 
            break;
    }

    return img;
}

function setBackgroundVideo(weatherId) {
    const videoElement = document.querySelector(".background-video");
    const sourceElement = videoElement.querySelector("source");
    let videoSrc = "videos/basic background.mp4";

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            videoSrc = "videos/thunder.mp4";
            break;
        case (weatherId >= 300 && weatherId < 400):
            videoSrc = "videos/heavy-rain.mp4";
            break;
        case (weatherId >= 500 && weatherId < 600):
            videoSrc = "videos/light-rain.mp4";
            break;
        case (weatherId >= 600 && weatherId < 700):
            videoSrc = "videos/snow.mp4";
            break;
        case (weatherId >= 700 && weatherId < 800):
            videoSrc = "videos/foggy.mp4";
            break;
        case (weatherId === 800):
            videoSrc = "videos/sun.mp4";
            break;
        case (weatherId >= 801 && weatherId < 810):
            videoSrc = "videos/cloudy.mp4";
            break;
        default:
            videoSrc = "videos/basic background.mp4";
            break;
    }

    sourceElement.src = videoSrc;
    videoElement.load();
}


function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

const input = document.querySelector('.cityInput');

// Function to toggle placeholder visibility
function blinkPlaceholder() {
    if (input.placeholder) {
        input.placeholder = '';
    } else {
        input.placeholder = 'Enter city';
    }
}

// Set interval to blink every 1.5 seconds
setInterval(blinkPlaceholder, 750);
const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'b8a84cd64b007bd7f7ea5f208fe1850e';
const lang = 'es';
const iconUrl = 'https://openweathermap.org/img/wn/'

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const city = document.getElementById('ciudadEntrada').value;
    if(city){
        fetchWeatherData(city);
    }
})

function pressEnter(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('botonBusqueda').click();
    }
}

function fetchWeatherData(city){
    fetch(`${urlBase}?q=${city}&lang=${lang}&appid=${API_KEY}&units=metric`)
    .then(data => data.json())
    .then(data => showWeatherData(data));
}

function showWeatherData(data){
    const divShowData = document.getElementById('datosClima');
    divShowData.innerHTML = '';
    
    const cityName = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    const titleCity = document.createElement('h2');
    titleCity.textContent = cityName;

    const tempData = document.createElement('p');
    tempData.textContent = `La temperatura es ${Math.round(temp) }°C`;

    const descrip = document.createElement('p');
    descrip.textContent = `La descripción meteorológica es:\n${description}`;

    const icon = document.createElement('img');
    icon.srcset = `${iconUrl}${iconCode}.png`;


    divShowData.style.opacity = 1;


    // Introducir los elementos creados dentro del div 
    divShowData.appendChild(titleCity);
    divShowData.appendChild(icon)
    divShowData.appendChild(tempData);
    divShowData.appendChild(descrip);
}

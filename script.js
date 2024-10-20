
let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = '999c13a003cc4d5928106be6f37389f7'


/* Cree este objeto que utilizo para traducir la descripción que se recibe de API ya que esta está en ingles.
Quise ponerlo en un archivo .js aparte pero no me funcionaba por lo que tuve que dejarlo aca. */
const traductorClima = {
    drizzle_rain: "llovizna",
    heavy_intensity_drizzle_rain: "llovizna de alta intensidad",
    shower_rain_and_drizzle: "aguacero y llovizna",
    heavy_shower_rain_and_drizzle: "aguacero intenso y llovizna",
    shower_drizzle: "llovizna",
    light_rain: "lluvia ligera",
    moderate_rain: "lluvia moderada",
    heavy_intensity_rain: "lluvia de alta intensidad",
    very_heavy_rain: "lluvia muy intensa",
    extreme_rain: "lluvia extrema",
    freezing_rain: "lluvia helada",
    light_intensity_shower_rain: "aguacero de baja intensidad",
    shower_rain: "aguacero",
    heavy_intensity_shower_rain: "aguacero de alta intensidad",
    ragged_shower_rain: "aguacero irregular",
    light_snow: "nieve ligera",
    snow: "nieve",
    heavy_snow: "nieve intensa",
    sleet: "aguanieve",
    light_shower_sleet: "aguanieve ligera",
    shower_sleet: "aguacero de aguanieve",
    light_rain_and_snow: "lluvia y nieve ligera",
    rain_and_snow: "lluvia y nieve",
    light_shower_snow: "nieve ligera en forma de aguacero",
    shower_snow: "aguacero de nieve",
    heavy_shower_snow: "aguacero intenso de nieve",
    mist: "neblina",
    smoke: "humo",
    haze: "bruma",
    sand_dust_whirls: "remolinos de arena y polvo",
    fog: "niebla",
    sand: "arena",
    dust: "polvo",
    volcanic_ash: "ceniza volcánica",
    squalls: "rachas de viento",
    tornado: "tornado",
    clear_sky: "cielo despejado",
    few_clouds: "pocas nubes",
    scattered_clouds: "nubes dispersas",
    broken_clouds: "parcialmente nublado",
    overcast_clouds: "cielo cubierto"
}


// La API devuelve la temperatura en Kelvin, asi que definimos una variable que nos ayude a convertirlo a Celcius.
let difKelvin = 273.15

// Estamos a la espera de un click
document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    // Si en el input se puso una ciudad, da TRUE, sino FALSE y no hacemos nada.
    if (ciudad) {
        fetchDatosClima(ciudad)
    }
})

// Obtenemos la información del clima de la ciudad recibida.
function fetchDatosClima(ciudad) {
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
        // Esa información la convertimos en JSON.
        .then(data => data.json())
        // El JSON lo enviamos a la función.
        .then(data => mostrarDatosClima(data))
}

// Recibimos el JSON con la información de la ciudad.
function mostrarDatosClima(data){
    // Guardamos el div entero ya que el ID esta en el div.
    const divDatosClima = document.getElementById('datosClima')
    // Vaciamos el input.
    divDatosClima.innerHTML = ''

    // Guardamos los datos que necesitemos, en este caso el nombre de la ciudad, la temperatura y la descripción que tenga.
    const ciudadNombre = data.name
    const paisNombre = data.sys.country
    const temperatura = data.main.temp
    const sensacionTermica = data.main.feels_like
    const humedad = data.main.humidity
    const descripcion = data.weather[0].description
    const icono = data.weather[0].icon

    // Creación de elementos que van dentro del DIV.
    // Creamos una etiqueta H2 que va a estar dentro del DIV.
    const ciudadTitulo = document.createElement('h2')
    /* Le guardamos texto dentro del elemento, en este caso el nombre de la ciudad y 
    seria como tener <h2>Nombre ciudad</h2>. */
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`
    
    // Hacemos lo mismo con el resto.
    const temperaturaInfo = document.createElement('p')
    /* Como nos devuelve la temperatura en Kelvin, a ese valor hay que restarle lo que definimos en "difKelvin" para convertirlo a Celcius
    y con .toFixed indico la cantidad de decimales que quiero mostrar. */
    temperaturaInfo.textContent = `La temperatura es: ${(temperatura-difKelvin).toFixed(1)} ºC`

    const sensacionTermicaInfo = document.createElement('p')
    /* Como nos devuelve la temperatura en Kelvin, a ese valor hay que restarle lo que definimos en "difKelvin" para convertirlo a Celcius
    y con .toFixed indico la cantidad de decimales que quiero mostrar. */
    sensacionTermicaInfo.textContent = `Sensación térmica: ${(sensacionTermica-difKelvin).toFixed(1)} ºC`

    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `La humedad es: ${humedad}%`

    const iconoInfo = document.createElement('img')
    iconoInfo.src= `http://openweathermap.org/img/wn/${icono}@2x.png`


    const descripcionInfo = document.createElement('p')
    /* El primer argumento es una expresión regular que busca todos los espacios ( ). La g al final indica que debe buscar globalmente 
    en toda la cadena (no solo la primera coincidencia). El segundo argumento es el carácter que deseas usar para reemplazar los espacios, 
    en este caso, el guion bajo (_). 
    Reemplazo los " " por "_" para poder acceder al objeto que cree para poder traducir el resultado. */
    descripcionInfo.textContent = `La descripción meteorológica es: ${traductorClima[descripcion.replace(/ /g, '_')]}`

    // De esta manera insertamos los diferentes elementos dentro del DIV
    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(sensacionTermicaInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionInfo)
}
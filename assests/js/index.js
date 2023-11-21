const btn = document.getElementById('btn')
const ipScreen = document.getElementById('ip')
const timezoneScreen = document.getElementById('timezone')
const ispScreen = document.getElementById('isp')
const locationScreen = document.getElementById('location')
const tittle = document.getElementById('tittle-before')
const divSearch = document.getElementsByClassName('before')
const outputScreen = document.getElementsByClassName('output')

var mapOptions = {
    zoomControl: false
}

var map = L.map('map', mapOptions).setView([51.505, -0.09], 13)

var arrayMarker = []   

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map)

btn.addEventListener('click', async () => {
    var input = document.getElementById('input')
    var url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_GOB8ZzZou4PBdtILKfKMlKKgVcKa5&ipAddress=${input.value}`
    const response = await fetch(url)
    const output = await response.json()

    if(output.code == '422' || output.location.country == 'ZZ'){
        ipScreen.innerHTML = `Not found`
        timezoneScreen.innerHTML = `Not found`
        ispScreen.innerHTML = `Not found`
        locationScreen.innerHTML = `Not found`

        divSearch[0].classList.remove('before')
        tittle.id = 'tittle'
        outputScreen[0].classList.remove('naoMostrar')
    }
    else{
        const timezone = output.location.timezone
        const country = output.location.country
        const region = output.location.region
        const lat = output.location.lat
        const lng = output.location.lng
        const isp = output.isp
        const ip = output.ip
    
        ipScreen.innerHTML = `${ip}`
        timezoneScreen.innerHTML = `UTC ${timezone}`
        ispScreen.innerHTML = `${isp}`
        locationScreen.innerHTML = `${region}, ${country}`

        setNewMap(lat, lng)

        divSearch[0].classList.remove('before')
        tittle.id = 'tittle'
        outputScreen[0].classList.remove('naoMostrar')
    }
})

function setNewMap(lat, lng){
    map.setView(new L.LatLng(lat, lng), 13)
    var marker = L.marker([lat, lng]).addTo(map)
    arrayMarker.push(marker)
    if(arrayMarker.length > 1){
        arrayMarker[0].remove()
        arrayMarker.shift()
    }
}
const latitude1 = 52.52
const longitude1= 13.41


const url = `https://api.saareserver.com/v1/weather?city=${city}&apikey=${apiKey}`;

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m

function saa_API_kutsu(latitude_input, longitude_input){

    const url=`https://api.open-meteo.com/v1/forecast?latitude=${latitude_input}&longitude=${longitude_input}&hourly=temperature_2m`;
    fetch(url)
    .then(response => {
        // Tarkistetaan, onko pyyntö onnistunut
        if (!response.ok) {
            throw new Error(`Virhe: ${response.status}`);
        }
        return response.json(); // Muutetaan vastaus JSON-muotoon
    })
    .then(data => {
        document.getElementById("p1").innerHTML = `Sää Oulussa: ${data.hourly.time[0]}°C`;
        console.log(`Sää Helsingissä: ${data.hourly.time[0]}°C`);
    })
    .catch(error => {
        console.error(error); // Käsitellään mahdolliset virheet
        document.getElementById("p1").innerHTML = "error";
    });

    

}



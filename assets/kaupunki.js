function kaupunki_koordinaatit(kaupunki){

    let leveys=0;
    let pituus=0;
    if(kaupunki == "Oulu"){
        leveys=65.01;
        pituus=25.5;
    }else if(kaupunki == "Turku"){
        leveys=60.45;
        pituus=22.25;
    }else if(kaupunki == "Helsinki"){
        leveys=60.17;
        pituus=24.94;
    }
    document.getElementById("latitude").value=leveys;
    document.getElementById("longitude").value=pituus;
    
}

function kaupunki_2(){

    const kaupunki = document.getElementById('kaupunkinimi')
    url=`https://geocoding-api.open-meteo.com/v1/search?name=${kaupunki}&count=10&language=en&format=json`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        

        document.getElementById("latitude").value=data['results']['latitude'];
        document.getElementById("longitude").value=data['results']['longitude'];

    })
    .catch(error => {
        document.getElementById("latitude").value=error;
        console.error('Virhe:', error);
    });


}
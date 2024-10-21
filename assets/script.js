//const latitude1 = 52.52
//const longitude1= 13.41


//const url = `https://api.saareserver.com/v1/weather?city=${city}&apikey=${apiKey}`;

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m


function saa_API_kutsu(longitude_input, latitude_input){
    
    
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${latitude_input}&longitude=${longitude_input}&hourly=temperature_2m,rain&timezone=Europe%2FBerlin`;
    
    
    
    fetch(url)
    .then(response => {
        // Tarkistetaan, onko pyyntö onnistunut
        if (!response.ok) {
            throw new Error(`Virhe: ${response.status}`);
        }

        return response.json(); // Muutetaan vastaus JSON-muotoon
    })
    .then(data => {
        //const form = document.getElementById("sijainti");
        //document.getElementById("demo").innerHTML = "onnistui";
        let kutsuttava1 = data['hourly']['rain'];
        let kutsuttava2 = data['hourly']['temperature_2m'];
        //document.getElementById("c1") = saa_json.hourly.temperature_2m;
        const table1 = document.getElementById('saa_taulukko_1');
        const table2 = document.getElementById('saa_taulukko_2');
        const paiva = document.getElementById('paiva').value;
        let tuntilisays = 0;
        if(paiva == "paiva_tanaan"){
            tuntilisays = 0;
        }else if(paiva == "paiva_huomenna"){
            tuntilisays = 24;
        }else if (paiva == "paiva_ylihuomenna"){
            tuntilisays = 48;
        }

        let row = table1.rows[1];
        for(let i=1; i <= 12; i++){
            const cell = row.cells[i];
            cell.innerHTML = kutsuttava2[i-1+tuntilisays]+"°C";
        }

        row = table1.rows[2];
        for(let i=1; i <= 12; i++){
            const cell = row.cells[i];
            cell.innerHTML = kutsuttava1[i-1+tuntilisays]+"mm";
        }
        row=table2.rows[1];
        for(let i=1; i <= 12; i++){
            const cell = row.cells[i];
            cell.innerHTML = kutsuttava2[i+12-1+tuntilisays]+"°C";
        }
        row=table2.rows[2];
        for(let i=1; i <= 12; i++){
            const cell = row.cells[i];
            cell.innerHTML = kutsuttava1[i+12-1+tuntilisays]+"mm";
        }


    })
    .catch(error => {
        console.error(error); // Käsitellään mahdolliset virheet
        window.alert("Syötä leveys- ja pituusasteet oikein!")
    });
        
    
    

    

}

function form_listener(){
    
    
    var sijaintiForm=document.getElementById('sijainti');
    //document.getElementById("demo").innerHTML="TESTI1";
    var leveys = document.getElementById('latitude').value;
    var pituus = document.getElementById('longitude').value;
    //document.getElementById("demo").innerHTML="TESTI2";
    const json = saa_API_kutsu(pituus, leveys);
    //document.getElementById("demo").innerHTML="TESTI3";
    



}

/*function modifyCell(rowIndex, cellIndex, newValue) {
    document.getElementById("demo") = 'modifycell';
    const table = document.getElementById('saa_taulukko_1').getElementsByTagName('tbody');
    const row = table.rows[rowIndex];
    const cell = row.cells[cellIndex];
    cell.innerHTML = newValue; // Update the cell with new value
}*/

/*
function KilpailuLista(){
    let url = ;
    //const sijaintiForm = document.getElementById('MatsiTable');

    fetch(url)
  .then(response => {
    // Tarkistetaan, että vastaus on OK
    if (!response.ok) {
      throw new Error('Verkkovirhe: ' + response.status);
    }
    return response.json(); // Palautetaan vastaus JSON-muodossa
  })
  .then(data => {
    console.log(data); // Käsitellään noudettu data
    /*
    const kl = document.getElementById('kilpailulista');

    document.getElementById("demo").innerHTML = "data";
    for(const key in data){
        var row_insert = kl.insertRow(0);
        const row = kl.rows(0);
        const cell=row.cells[0];
        cell.innerHTML = "TESTI";
    }

  })
  .catch(error => {
    console.error('Virhe:', error); 
    document.getElementById("demo").innerHTML = error;
    // Käsitellään mahdolliset virheet
  });
    
  
    
    
};*/


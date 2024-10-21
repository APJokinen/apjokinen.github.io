

function fetchAPIData(url){
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            if(!response.ok){
                reject(`Virhe: ${response.status}` );

            }else{
                resolve(response.json());
            }
        })
        .catch(error =>{
            reject('Verkkovirhe'+ error.message);
        })

    })
}

function haeSaa(pituus, leveys){
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${leveys}&longitude=${pituus}&hourly=temperature_2m,rain&timezone=Europe%2FBerlin`;
    fetchAPIData(url)
    .then(data => {
        console.log(data);
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
    .catch(error =>{
        console.error("Virhe: ", error);
        window.alert("Syötä leveys- ja pituusasteet oikein!");
});
}






function form_listener(event){
    
    
    var sijaintiForm=document.getElementById('sijainti');
    //document.getElementById("demo").innerHTML="TESTI1";
    var leveys = document.getElementById('latitude').value;
    var pituus = document.getElementById('longitude').value;
    //document.getElementById("demo").innerHTML="TESTI2";
    haeSaa(pituus, leveys);
    //document.getElementById("demo").innerHTML="TESTI3";
    event.preventDefault();



}


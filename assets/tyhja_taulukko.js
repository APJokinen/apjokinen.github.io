




function luoTaulukko(){


    //taulukon otsikot:
    let headers=[];
    if(taulukko_numero == 0){
        headers = ["00.00", "01.00", "02.00", "03.00" ,"04.00", "05.00", "06.00", "07.00", "08.00", "09.00", "10.00", "11.00"];
    }else{
        headers = ["12.00", "13.00", "14.00", "15.00" ,"16.00", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00"];
    }


    // Luodaan uusi taulukko
    let headerRow = document.getElementById("tableHeaders").innerHTML;
    //taulukko.border = "1"; // Lisää reunat taulukkoon
    headers.forEach(header => {
        let th = document.createElement("th"); // Luodaan <th>-elementti
        th.textContent = header; // Asetetaan otsikon teksti
        headerRow.appendChild(th); // Lisätään <th> riviin
    });
    //taulukko.appendChild(headerRow);
    // Luodaan uusi rivi (tr) ja solu (td)
    /*var rivi = document.createElement("tr");
    for(let i=0; i < 12; i++){
        solu=document.createElement("td");
        solu.innerHTML="-";
        rivi.appendChild(solu);
    }*/


   

    // Lisätään rivi taulukkoon
   /* taulukko.appendChild(rivi);

    // Lisätään taulukko HTML-sivun div-elementtiin
    if(taulukko_numero == 0){
        document.getElementById("taulukkoContainer").appendChild(taulukko);
    }else{
        document.getElementById("taulukkoContainer2").appendChild(taulukko);
    }*/
    }
    //document.getElementById("tableHeaders").addEventListener("load", luoTaulukko);
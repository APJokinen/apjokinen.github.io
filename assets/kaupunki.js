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
    }else if(kaupunki == "Rovaniemi"){
        leveys=66.5039;
        pituus=25.7294;
    }else if(kaupunki == "Espoo"){
        leveys=60.2055;
        pituus=24.6559;
    }
    document.getElementById("latitude").value=leveys;
    document.getElementById("longitude").value=pituus;
    
}



    

    

    function listenerit(){
        
        let valmiit_kaupungit=["Oulu", "Helsinki", "Turku","Rovaniemi", "Espoo"];
        let kaupunkilista=document.getElementById('kaupunkilista');
        for(const [index, kaupunki1] of valmiit_kaupungit.entries()){
            /*const uusi_a = document.createElement('a');
            uusi_a.textContent = valmiit_kaupungit[i];
            uusi_a.href = "";
            uusi_a.id(valmiit_kaupungit[i]);*/

            
            
            const uusi_li=document.createElement('li');
            uusi_li.id=kaupunki1;
            kaupunkilista.appendChild(uusi_li);

            const link = document.createElement("a");
            link.textContent=kaupunki1;
            link.href="";

            

            uusi_li.appendChild(link);
            //uusi_li.appendChild(uusi_a);

            //const uusi_a= document.createElement('a');


            
            
            window.user_button = document.getElementById(kaupunki1);
            user_button.addEventListener('click', function(event){
            event.preventDefault();
            kaupunki_koordinaatit(kaupunki1);
        });
        }
        
    }

    listenerit();
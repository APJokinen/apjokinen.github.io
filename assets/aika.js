function viikonpaiva(date){
    const paivat=[
        "sunnuntai",
        "maanantai",
        "tiistai", 
        "keskiviikko",
        "torstai", 
        "perjantai", 
        "lauantai" 
    ]
    return paivat[date.getDay()];

}

class aika {
    #date;
    constructor(date) {
      this.date = date;
    }
    kello(){ return this.date.toLocaleTimeString();}
    paiva() {return this.date.getDate();}
    vk_paiva(){ return viikonpaiva(this.date);}
    kuukausi(){ return this.date.getMonth();}
    vuosi(){return this.date.getFullYear();}
    pvm_teksti() {return this.paiva()+"."+this.kuukausi()+"."+this.vuosi();}
    koko_teksti() {return this.vk_paiva()+" "+this.pvm_teksti()+" "+this.kello(); }

  }

function kello(){
        
    let d = new Date();
    let a = new aika(d);
    
            

   
    //let pvm=d.getDate()+"."+d.getMonth()+"."+d.getFullYear();
    document.getElementById("kello").innerHTML = a.koko_teksti();
    }
    
    setInterval(kello, 1000);
let powerOld, powerNew;
let choose1;
let devices = []
let accus = []
let productions = []
let systems = []
let deviceId = 0
let accuId = 0
let productionId = 0
let systemId = 0

const deviceMargin = 20

function uusiTuotanto() {
    const uusiDiv = document.createElement("div")
    const pohja = document.getElementById("tuotantoClickBoxJaolla");
    const container = document.getElementById("containerMuutosTuotanto");
    const clickbox = document.getElementById("tuotantoClickbox");
    const leveys = getComputedStyle(clickbox).width
    let kopio = pohja.cloneNode(true);
    //kopio.style.width = leveys
    kopio.style.display = "flex"
    kopio.style.flexDirection = "row"
    kopio.className="productionClickBox";

   let modal = document.getElementById("muutosModal1")
    let modalCopy = modal.cloneNode(true);

    
    const alkio = {id: productionId}
    
    const index1 =productionId
    productionId++
    kopio.id="productionClickBox"+ index1;
    
    const delButton = document.createElement("button")
        delButton.textContent="Poista"
        delButton.type="button"
        delButton.addEventListener("click", () => {
        uusiDiv.remove();
        productions = productions.filter(p => p.id !== index1);
        delButton.remove();
        modalCopy.remove()
        const divit = container.querySelectorAll(".productionClickBox");
        divit.forEach((d, index) => {
            d.id = "productionClickBox"+ index;
        });
        const modaalit = container.querySelectorAll(".modal");
        modaalit.forEach((m, index) => {
            m.id = "modalCopy"+index;
        })
        const nimet = container.querySelectorAll(".tuotantoLabel")
        nimet.forEach((n,index) => {
            n.textContent = "Tuotanto "+(index+1)
        })

        verkkoTeho()
        });
    delButton.className = "delButton"
    modalCopy.style.display  = "none"
    modalCopy.id = "modalCopy"+index1
    modalCopy.querySelectorAll("button").forEach(btn => btn.remove());
    let button1 = document.createElement("button")
    button1.type = "button"
    button1.textContent="Lisää"
    let button2 = document.createElement("button")
    button2.type = "button"
    button2.textContent="Sulje"
    button1.onclick = () => {
        if(choose1 === "vanha"){
            const vanha = kopio.querySelector("#VanhaTuotanto")
            const arvo = modalCopy.querySelector("#modalPowerMuutos").value
            vanha.textContent = arvo + " kW"
            alkio.vanha = arvo + " kW"
            
        }else{
            const uusi = kopio.querySelector("#UusiTuotanto")
            const arvo = modalCopy.querySelector("#modalPowerMuutos").value
            uusi.textContent = arvo + " kW"
            alkio.uusi = arvo + " kW"
        }
        verkkoTeho()
        
    }

    button2.onclick = () => {
        modalCopy.style.display="none"
       
    }

     kopio.querySelector(".clickBoxMuutosVanha").onclick = () => {
        choose1 = "vanha"
        modalCopy.style.display = "block"
    }

    kopio.querySelector(".clickBoxMuutosUusi").onclick = () => {
        choose1 = "uusi"
         modalCopy.style.display = "block"
    }


    const modalbox = modalCopy.querySelector(".modalBox")
    modalbox.appendChild(button1)
    modalbox.appendChild(button2) 

    productions.push(alkio)
    const tuotantoLabel = document.createElement("label")
    tuotantoLabel.textContent = "Tuotanto "+productions.length
    tuotantoLabel.className = "tuotantoLabel"
    uusiDiv.appendChild(tuotantoLabel)
    uusiDiv.appendChild(kopio)
    uusiDiv.appendChild(delButton);
    const br1 = document.createElement("br")
    const br2 = document.createElement("br")
    uusiDiv.appendChild(br1)
    uusiDiv.appendChild(br2)
    modalCopy.style.display = "intial"
    container.appendChild(uusiDiv);
    container.appendChild(modalCopy)
    verkkoTeho()
}

function openTuotanto(id,side){

}

function muutosAkku(){
    const uusiDiv = document.createElement("div")
    const container = document.getElementById("akkuMuutosContainer")
    const pohja = document.getElementById("akkuClickBoxJaolla")
    const modal = document.getElementById("muutosAkkuModal")
    const modalCopy = modal.cloneNode(true)
    let kopio = pohja.cloneNode(true);
    kopio.className="muutosAkkuClickBox"
    //kopio.style.display = "flex"
    //kopio.style.flexDirection = "row"
    const index1 = accuId
    accuId++
    const alkio = {id: index1}
    let delButton = document.createElement("button")
    delButton.textContent="Poista"
    delButton.type="button"
    delButton.onclick = () => {
        uusiDiv.remove()
        accus = accus.filter(accu => accu.id !== index1)
        const nimet = container.querySelectorAll(".accuLabel")
        nimet.forEach((n,index) => {
            n.textContent = "Sähkövarasto "+(index+1)
        })
        verkkoTeho()
    }
    uusiDiv.className ="accuDiv"
    modalCopy.querySelectorAll("button").forEach(btn => btn.remove());
    let button1 = document.createElement("button")
    let button2 = document.createElement("button")
    button1.type = "button"
    button1.textContent="Lisää"
    button2.type = "button"
    button2.textContent="Sulje"
    const laatikkoVanha = kopio.querySelector(".vanhaLaite")
    const laatikkoUusi = kopio.querySelector(".uusiLaite")
    button1.onclick = () => {
        if(choose1 === "vanha"){
            //const laatikko = kopio.querySelector(".vanhaLaite")
            const vanhaKapasiteetti = modalCopy.querySelector(".accuChangeCapacity").value
            const vanhaTeho = modalCopy.querySelector(".accuChangePower").value
            alkio.vanha= {}
            alkio.vanha.kapasiteetti = vanhaKapasiteetti + " kWh"
            alkio.vanha.teho = vanhaTeho + " kW"
            const table = document.createElement("table")
            table.innerHTML = "<tr><td>Kapasiteetti: </td><td>"+vanhaKapasiteetti +" kWh</td><td></tr>"
            table.innerHTML += "<tr><td>Teho: </td><td>"+vanhaTeho+" kW</td></tr>"
            laatikkoVanha.innerHTML=""
            laatikkoVanha.appendChild(table)
        }else{
            //const laatikko = kopio.querySelector(".uusiLaite")
            const uusiKapasiteetti = modalCopy.querySelector(".accuChangeCapacity").value
            const uusiTeho = modalCopy.querySelector(".accuChangePower").value
            alkio.uusi= {}
            alkio.uusi.kapasiteetti = uusiKapasiteetti + " kWh"
            alkio.uusi.teho = uusiTeho + " kW"
            const table = document.createElement("table")
            table.innerHTML = "<tr><td>Kapasiteetti: </td><td>"+uusiKapasiteetti +" kWh</td><td></tr>"
            table.innerHTML += "<tr><td>Teho: </td><td>"+uusiTeho+" kW</td></tr>"
            laatikkoUusi.innerHTML=""
            laatikkoUusi.appendChild(table)
        }


        verkkoTeho()
    }

    button2.onclick = () => {
        modalCopy.style.display = "none"
    }
    const vanha = kopio.querySelector(".vanha")
    const uusi = kopio.querySelector(".uusi")
    vanha.querySelector(".clickBoxMuutos").onclick = () => {
        choose1 = "vanha"
        modalCopy.style.display  ="block"
        
    }

    uusi.querySelector(".clickBoxMuutos").onclick = () => {
        choose1 = "uusi"
        modalCopy.style.display  ="block"
    }

    const modalbox = modalCopy.querySelector(".modalBox")
    modalbox.appendChild(button1)
    modalbox.appendChild(button2) 

    accus.push(alkio)
    const accuLabel = document.createElement("label")
    accuLabel.textContent = "Sähkövarasto "+accus.length
    accuLabel.className = "accuLabel"


    const br1 = document.createElement("br")
    const br2 = document.createElement("br")
    kopio.style.display = "flex"
    kopio.style.flexDirection = "row"
    uusiDiv.appendChild(accuLabel)
    uusiDiv.appendChild(kopio)
    uusiDiv.appendChild(delButton)
    uusiDiv.appendChild(br1)
    uusiDiv.appendChild(br2)
    container.appendChild(uusiDiv)
    container.appendChild(modalCopy)
    verkkoTeho()


}

function tuotantoVanha(){
    const modal = document.getElementById("muutosModal1")
    modal.style.display = "initial"
    choose1 = "vanha"
}

function tuotantoUusi(){
    const modal = document.getElementById("muutosModal1")
    modal.style.display = "initial"
    choose1 = "uusi"
}

function openModal(modal1){
    const modal = document.getElementById(modal1)
    const cbox = modal.querySelector("checkbox")
    modal.style.display = "block"
}

function addPower2(){
    if(choose1 === "vanha"){
        powerOld = document.getElementById("modalPowerMuutos").value
        console.log(powerOld)
        document.getElementById("VanhaTuotanto").textContent = powerOld + " kW"
    }else{
        powerNew = document.getElementById("modalPowerMuutos").value
        console.log(powerNew)
        document.getElementById("UusiTuotanto").textContent = powerNew + " kW"
    }
}

function closeModal3(){
    const modal = document.getElementById("muutosModal1")
    modal.style.display = "none"
}

function closeModal4(){
    const modal = document.getElementById("muutosModal2")
    modal.style.display = "none"
}



function uusiLaite(){
    const uusiDiv = document.createElement("div")
    const pohja = document.getElementById("laiteClickBoxJaolla")
    const container = document.getElementById("container4")
    //const clickbox = document.getElementById("tuotantoClickbox");
    const index1 = deviceId
    deviceId++
    const alkio = {id: index1}
    let kopio = pohja.cloneNode(true);
    //console.log("uusiLaite")
    //alkio.vanhaPoistettu= false
    //const leveys = getComputedStyle(clickbox).width
    kopio.style.display = "flex"
    kopio.style.flexDirection = "row"
    //kopio.style.width = leveys
    kopio.id="deviceClickBox"+ index1;
    kopio.className = "deviceClickBox"

    uusiDiv.className = "deviceDiv"
    uusiDiv.id = "deviceDiv"+index1
    //uusiDiv.style.width = leveys
    let modal = document.getElementById("muutosModal2")
    let modalCopy = modal.cloneNode(true);
    //modalCopy.style.display="none"
    //modalCopy.className = "modal"
    modalCopy.id="modalCopy2_"+index1

    const delButton = document.createElement("button")
        delButton.textContent="Poista"
        delButton.type="button"

        delButton.addEventListener("click", () => {
        uusiDiv.remove();
        devices = devices.filter(d => d.id !== index1);
        delButton.remove();
        modalCopy.remove()
        const divit = container.querySelectorAll(".deviceClickBox");
        divit.forEach((d, index) => {
            d.id = "deviceClickBox"+ index;
        });
        const modaalit = container.querySelectorAll(".modal");
        modaalit.forEach((m, index) => {
            m.id = "modalCopy2_"+ index;
        });
        const nimet = container.querySelectorAll(".deviceName")
        nimet.forEach((nimi,index) => {
            nimi.textContent = "Laite "+(index+1)
        })

        verkkoTeho()
    });

        
    const clickVanha = kopio.querySelector(".vanha").querySelector(".clickBoxMuutos")
    const clickUusi = kopio.querySelector(".uusi").querySelector(".clickBoxMuutos")
    
    const poistoDiv = modalCopy.querySelector(".poistoDiv")
    poistoDiv.id= "poistoDiv"+index1
    

    /*const poistoCheckbox = document.body.querySelector(".poistoCheckbox")
    poistoCheckbox.id= "poistoCheckbox"+index1
    poistoCheckbox.onchange = () => {
        if(poistoCheckbox.checked === true){
            devices[index1].vanhaPoistettu = "Kyllä"
        }else{
            devices[index1].vanhaPoistettu = "Ei"
        }
        
    }*/
    
    clickVanha.onclick = () => {
        choose1 = "vanha"
        modalCopy.style.display="block"
        console.log(poistoDiv)
        console.log(poistoDiv.querySelector('input[type="checkbox"]'))
        //console.log(alkio.vanhaPoistettu)
        if(alkio?.vanha?.[8] === true){

            poistoDiv.querySelector('input[type="checkbox"]').checked = true
            
        }else{
            poistoDiv.querySelector('input[type="checkbox"]').checked = false
            
        }
        poistoDiv.style.display="block"
         
    }

    clickUusi.onclick = () => {
        choose1 = "uusi"
        modalCopy.style.display="block"
        poistoDiv.style.display="none"
    }
    modalCopy.querySelectorAll("button").forEach(btn => btn.remove());
    const modalButton1 = document.createElement("button")
    const modalButton2 = document.createElement("button")
    modalButton1.textContent = "Lisää"
    modalButton2.textContent = "Sulje"
    modalButton1.type="button"
    modalButton2.type="button"
    modalButton1.onclick = () => {
        const tiedot = modalCopy.querySelectorAll(".deviceForm")
        const taulukko = []
        tiedot.forEach((t,index) => {
            taulukko.push(t.value)
        })

        let deviceDiv, plusDiv;
        const table = document.createElement("table")
        const label = document.createElement("label")
        if(choose1 === "vanha"){
            const poistoTieto = modalCopy.querySelector(".poistoCheckBox").checked
            taulukko.push(poistoTieto)
            alkio.vanha = taulukko
            deviceDiv = kopio.querySelector(".vanha").querySelector(".clickBoxMuutosLaite")
            plusDiv = kopio.querySelector(".vanha").querySelector(".clickBoxMuutosPlus")
        }else{
            alkio.uusi = taulukko
            deviceDiv = kopio.querySelector(".uusi").querySelector(".clickBoxMuutosLaite")
            plusDiv = kopio.querySelector(".uusi").querySelector(".clickBoxMuutosPlus")
        }
        table.innerHTML += "<td>Laite:</td><td>" + taulukko[0] +"</td>"
        table.innerHTML += "<td>Merkki:</td><td>" + taulukko[1] +"</td>"
        table.innerHTML += "<td>Malli:</td><td>" + taulukko[2] +"</td>"
        table.innerHTML += "<td>Tyyppi:</td><td>" + taulukko[3] +"</td>"
        table.innerHTML += "<td>Teho:</td><td>" + taulukko[4] +" kW</td>"
        table.innerHTML += "<td>Enimmäisvikavirta:</td><td>" + taulukko[5] +" A</td>"
        table.innerHTML += "<td>Oikosulkuvirta:</td><td>" + taulukko[6] +" A</td>"
        table.innerHTML += "<td>Kytketyt vaiheet:</td><td>" + taulukko[7] +" </td>"
        if(choose1 === "vanha"){
            if(taulukko[8] === true){
                label.innerHTML += "<label class='boldLabel'>Vanha laite poistettu</label><br/>"
            }else{
                label.innerHTML += "<label class='boldLabel'>Vanhaa laitetta ei poistettu</label><br/>"
            }
        }else{
            label.innerHTML += "<br/>"
        }
        deviceDiv.innerHTML = ""
        deviceDiv.appendChild(table)
        deviceDiv.appendChild(label)
        const plus = plusDiv.querySelectorAll(".clickBoxPlus")
        if(plus){
            plus.forEach(plus => {
                plus.className = "devicePlus"
            })
        }
        verkkoTeho()
    }   

    modalButton2.onclick = () => {
        modalCopy.style.display="none"
    }

    
    devices.push(alkio)
    const box = modalCopy.querySelector(".modalBox")
    box.appendChild(modalButton1)
    box.appendChild(modalButton2)
    const name = document.createElement("label")
    name.textContent = "Laite "+(devices.length)
    name.className = "deviceName"
    uusiDiv.appendChild(name)
    delButton.width = "fit-content"
    uusiDiv.appendChild(modalCopy)
    uusiDiv.appendChild(kopio)
    const br1 = document.createElement("br")
    const br2 = document.createElement("br")
    uusiDiv.appendChild(delButton)
    uusiDiv.appendChild(br1)
    uusiDiv.appendChild(br2)
    container.appendChild(uusiDiv)
    verkkoTeho()
}

function addSystemChange() {
    const container = document.getElementById("container5")
    const new1 = {}
    new1.id=systemId
    systemId++
    new1.tuotantoTapa = document.getElementById("muutosTuotantoTapa").value
    new1.tuotanto = productions
    new1.akut = accus
    new1.laitteet = devices
    new1.lisatiedot = document.getElementById("infoAreaChange").value
    systems.push(new1)
    showSystem(new1)
}

function showSystem(newSystem){
    let vanhaVerkkoTeho = 0;
    let uusiVerkkoTeho = 0;
    const laiteTeho =  {vanha : 0, uusi: 0}
    const akkuTeho = {vanha: 0, uusi: 0}
    const tuotantoTeho = {vanha : 0, uusi: 0}
    const container = document.getElementById("container5")
    const div = document.createElement("div")
    div.className = "systemChangeDiv"
    const index = systems.length
    div.id="systemChangeDiv"+(index-1)
    const legend = "Järjestelmä "+index
    let text = "<fieldset><legend>"+legend+"</legend>"
    text += "<label class='systemBold'>Tuotantotapa: </label><label>"+ newSystem.tuotantoTapa+"</label><br/><br/>"
    if(productions.length > 0){
    text += "<label class='systemBold'>Tuotantolaitteiden tehojen muutos: </label><br/>"
    text += "<table><tr><th></th><th>Vanha</th><th></th><th>Uusi</th></tr>"
    }
    for(let i = 0; i < productions.length; i++){
        text += "<tr><td>Tuotanto " +(i+1)+ ": </td><td>"+productions[i]?.vanha+"</td><td>&#8594;</td><td>" + productions[i]?.uusi+"</td></tr>"
        const vanha= parseInt(productions[i]?.vanha?.match(/\d+/)?.[0])
        const uusi= parseInt(productions[i]?.uusi?.match(/\d+/)?.[0])
        vanhaVerkkoTeho += Number.isNaN(vanha) ? 0 : vanha;
        uusiVerkkoTeho += Number.isNaN(uusi) ? 0 : uusi;
        tuotantoTeho.vanha += Number.isNaN(vanha) ? 0 : vanha;
        tuotantoTeho.uusi += Number.isNaN(uusi) ? 0 : uusi;
    }
    if(productions.length >0){
    text += "<tr><td><span class='boldLabel'>Yhteensä: </span></td><td>"+tuotantoTeho.vanha+" kW</td><td>&#8594;</td><td>"+tuotantoTeho.uusi+" kW</td></tr>"
    text += "</table><br/>"
    }

    

    if(accus.length > 0){
        text += "<label class='systemBold'>Sähkövarastot: </label><br/><br/>"
        //text += "<table><tr><th></th><th>Vanha</th><th></th><th>Uusi</th></tr>"
    }
    for(let i = 0; i<accus.length;i++){
        let alkio = {vanha:{},uusi:{}}
        alkio.vanha.teho= parseInt(accus[i]?.vanha?.teho?.match(/\d+/)?.[0])
        alkio.uusi.teho= parseInt(accus[i]?.uusi?.teho?.match(/\d+/)?.[0])
        alkio.vanha.kapasiteetti= parseInt(accus[i]?.vanha?.kapasiteetti?.match(/\d+/)?.[0])
        alkio.uusi.kapasiteetti= parseInt(accus[i]?.uusi?.kapasiteetti?.match(/\d+/)?.[0])
        alkio.vanha.teho = Number.isNaN(alkio.vanha.teho) ? 0: alkio.vanha.teho
        alkio.uusi.teho = Number.isNaN(alkio.uusi.teho) ? 0: alkio.uusi.teho
        alkio.vanha.kapasiteetti = Number.isNaN(alkio.vanha.kapasiteetti) ? 0: alkio.vanha.kapasiteetti
        alkio.uusi.kapasiteetti = Number.isNaN(alkio.uusi.kapasiteetti) ? 0: alkio.uusi.kapasiteetti
        text += "<fieldset><legend>Sähkövarasto " + (i+1)+"</legend>"
        text += "<table>"
        text += "<tr><td>Teho:</td><td>"+alkio.vanha.teho+" kW</td><td>&#8594;</td><td>"+alkio.uusi.teho+" kW</td></tr>"
        text += "<tr><td>Kapasiteetti:</td><td>"+alkio.vanha.kapasiteetti+" kWh</td><td>&#8594;</td><td>"+alkio.uusi.kapasiteetti+" kWh</td></tr>"
        text += "</table></fieldset><br/>"
        akkuTeho.vanha += alkio.vanha.teho
        akkuTeho.uusi += alkio.uusi.teho
    }

    if(accus.length > 0){
        text += "<label class='systemBold'>Sähkövarastojen kokonaisteho: </label><br/>"
        text += "<label>"+akkuTeho.vanha+" kW &#8594; "+akkuTeho.uusi+" kW</label><br/><br/>"
    }

    if(accus.length > 0 && productions.length >0 ){
        text += "<label class='systemBold'>Tuotantolaitteiden ja sähkövarastojen yhteinen kokonaisteho: </label><br/>"
        text += "<label>"+(tuotantoTeho.vanha + akkuTeho.vanha)+" kW &#8594; "+(tuotantoTeho.uusi + akkuTeho.uusi)+" kW</label><br/><br/>"
   
    }

    
    if(devices.length > 0){
    text += "<label class='systemBold'>Verkkoliitäntälaitteet: </label><br/><br/>"
    }
    for(let i = 0; i < devices.length; i++){
        text += "<fieldset><legend>Laite "+(i+1)+"</legend></br>"
        text += "<table>"
        text += "<tr><th></th><th>Vanha</th><th></th><th>Uusi</th></tr>"
        text += "<tr><td>Laite: </td><td>"+devices[i]?.vanha?.[0]+"</td><td>&#8594;</td><td>" + devices[i]?.uusi?.[0]+"</td></tr>"
        text += "<tr><td>Merkki: </td><td>"+devices[i]?.vanha?.[1]+"</td><td>&#8594;</td><td>" + devices[i]?.uusi?.[1]+"</td></tr>"
        text += "<tr><td>Malli: </td><td>"+devices[i]?.vanha?.[2]+"</td><td>&#8594;</td><td>" + devices[i]?.uusi?.[2] +"</td></tr>"
        text += "<tr><td>Tyyppi: </td><td>"+devices[i]?.vanha?.[3]+"</td><td>&#8594;</td><td>" + devices[i]?.uusi?.[3] +"</td></tr>"
        text += "<tr><td>Teho: </td><td>"+devices[i]?.vanha?.[4]+" kW</td><td>&#8594;</td><td>" + devices[i]?.uusi?.[4]+" kW</td></tr>"
        text += "<tr><td>Enimmäisvikavirta: </td><td>"+devices[i]?.vanha?.[6]+" A</td><td>&#8594;</td><td>" + devices[i]?.uusi?.[5] + " A</td></tr>"
        text += "<tr><td>Oikosulkuvirta: </td><td>"+devices[i]?.vanha?.[7]+" A</td><td>&#8594;</td><td>" + devices[i]?.uusi?.[6] +" A</td></tr>"
        text += "<tr><td>Kytketyt vaiheet: </td><td>"+devices[i]?.vanha?.[8]+"</td><td>&#8594;</td><td>" + devices[i]?.uusi?.[7]+"</td></tr>"
        //text += "</table><label>Vanha laite poistetttu: </label><label>"+devices[i]?.vanhaPoistettu+"</label></fieldset><br/>"
        if(devices[i]?.vanha?.[8] === true){
            text += "</table><label class='boldLabel'>Vanha laite poistettu</label></fieldset><br/>"
        }else{
            text += "</table><label class='boldLabel'>Vanha laite ei ole poistettu</label></fieldset><br/>"
        }
        const vanhaTeho = parseInt(devices[i]?.vanha?.[4].match(/\d+/)?.[0]);
        const uusiTeho= parseInt(devices[i]?.uusi?.[4].match(/\d+/)?.[0]);
        vanhaVerkkoTeho += Number.isNaN(vanhaTeho) ? 0 : vanhaTeho;
        uusiVerkkoTeho += Number.isNaN(uusiTeho) ? 0 : uusiTeho;
        laiteTeho.vanha += Number.isNaN(vanhaTeho) ? 0 : vanhaTeho;
        laiteTeho.uusi += Number.isNaN(uusiTeho) ? 0 : uusiTeho;
    }

    if(devices.length > 0){
        text += "<label class='systemBold'>Verkkoliittymisen kokonaistehon muutos:</label><br/>"
        text += "<table><tr><th>Vanha</th><th></th><th>Uusi</th><tr/>"
        text += "<tr><td>"+laiteTeho.vanha+" kW</td><td>&#8594;</td><td>"+laiteTeho.uusi+" kW</td></tr></table><br/><br/>"
    }

    const lisatiedot = document.getElementById("infoAreaChange").value
    console.log("Lisätiedot:",lisatiedot)
    if(lisatiedot !== null && lisatiedot !== ""){
        text += "<label class='systemBold'>Lisätiedot: </label><br/>"
        text += "<label>"+lisatiedot+"</label>"
    }

    
    //text += "<label class='verkkoTeho'>Verkkoon liitetyn kokonaistehon muutos: </label><br/>"
    //text += "<table><tr><th>Vanha</th><th></th><th>Uusi</th><tr/>"
    //text += "<tr><td>"+vanhaVerkkoTeho.toString()+" kW</td><td>&#8594;</td><td>"+uusiVerkkoTeho.toString()+" kW</td></tr></table>"
    text += "</fieldset><button>Poista järjestelmä</button><br/>"
    div.innerHTML = text
    /*div.querySelectorAll("label").forEach((el,index) => {
        if(index !== 1 && index !== div.querySelectorAll("label").length - 1){
            el.classList.add("labelForSystem");
        }
    });*/
    const tabButton = document.createElement("button")
    const tabButtonContainer = document.getElementById("container5TabButtons")
    div.querySelectorAll("button").forEach((el,index) => {
        el.type="button"
        el.onclick = () => {
            systems = systems.filter(d => d.id !== newSystem.id);
            div.remove()
            el.remove()
            tabButton.remove()
            const divit = container.querySelectorAll(".systemChangeDiv")
            divit.forEach((div,index1) => {
                div.id="systemChangeDiv"+index1
                div.querySelectorAll("legend").forEach((legend, index2) => {
                    if(index2 === 0){
                        legend.textContent = "Järjestelmä "+(index1+1)
                    }
                    
                })
                if(index1 === divit.length-1){
                    div.style.display = "block"
                }
            })
            const tabNames = tabButtonContainer.querySelectorAll(".tabButtonsChange")
            tabNames.forEach((name,index1) => {
                name.textContent = "Järjestelmä "+(index1+1)
                if(index1 < tabNames.length-1){
                name.classList.remove('active');
                }else{
                    name.style.borderStyle = "double"
                }
            })

        }
    })

    
    div.style.display = "none"

    tabButton.type = "button"
    tabButton.textContent = "Järjestelmä "+index
    tabButton.className = "tabButtonsChange"
    tabButton.onclick = () => {
        const divit = container.querySelectorAll(".systemChangeDiv")
        divit.forEach(div1 => {
            div1.style.display = "none"
        })
        const buttons = tabButtonContainer.querySelectorAll("button")
        buttons.forEach(btn => {
            btn.style.borderStyle = "none"
        })
        
        div.style.display = "block"
        tabButton.style.borderStyle = "double"
    }
    tabButtonContainer.appendChild(tabButton)

    container.appendChild(div)
    if(container.querySelectorAll(".systemChangeDiv").length === 1){
        div.style.display = "block"
    }
}

function nollaaMuutos(){
    devices = []
    productions = []
    accus = []
    const container1 = document.getElementById("container4")
    const container2 = document.getElementById("containerMuutosTuotanto");
    const container3 = document.getElementById("akkuMuutosContainer")
    container1.innerHTML = ""
    container2.innerHTML = ""
    container3.innerHTML = ""
    const textarea = document.getElementById("infoAreaChange")
    textarea.textContent = null
    verkkoTeho()
}

function nollaaIlmoitusMuutos(){
    systems = []
    document.getElementById("container5").innerHTML = ""
}

function verkkoTeho(){
    for(let i of devices){
        const alkio = {}
        alkio.Vanha = {}
        alkio.Vanha.Laite = i?.vanha?.[0]
        alkio.Vanha.Merkki = i?.vanha?.[1]
        alkio.Vanha.Malli =i?.vanha?.[2]
        alkio.Vanha.Tyyppi =i?.vanha?.[3]
        alkio.Vanha.Teho = Number.isNaN(parseInt(i?.vanha?.[4]?.match(/\d+/)?.[0])) ? 0 : parseInt(i?.vanha[4].match(/\d+/)?.[0])
        alkio.Vanha.Poistettu = i?.vanha?.[8]
        alkio.Uusi = {}
        alkio.Uusi.Laite = i?.uusi?.[0]
        alkio.Uusi.Merkki = i?.uusi?.[1]
        alkio.Uusi.Malli =i?.uusi?.[2]
        alkio.Uusi.Tyyppi =i?.uusi?.[3]
        alkio.Uusi.Teho = Number.isNaN(parseInt(i?.uusi?.[4]?.match(/\d+/)?.[0])) ? 0 : parseInt(i?.uusi[4].match(/\d+/)?.[0])
    }

    const uusiDiv = document.createElement("div")
    const container = document.getElementById("KoosteContainer")
    const table1 = document.createElement("table")
    const table2 = document.createElement("table")
    const tableAkut = document.createElement("table")
    const header1 = document.createElement("label")
    const header2 = document.createElement("label")
    const headerAkut = document.createElement("label")
    const headerAkutJaTuotanto = document.createElement("label")

    header2.textContent = "Verkkoonliittämistehot"
    headerAkut.textContent = "Sähkövarastojen tehot"
    headerAkutJaTuotanto.textContent = "Tuotanto ja sähkövarastot yhteensä"

    const fontSize = "20px"
    const fontBold = "bold"

    header1.style.fontSize = fontSize
    header2.style.fontSize = fontSize
    headerAkut.style.fontSize = fontSize
    headerAkutJaTuotanto.style.fontSize = fontSize

    header1.style.fontWeight = fontBold
    header2.style.fontWeight = fontBold
    headerAkut.style.fontWeight = fontBold
    headerAkutJaTuotanto.style.fontWeight = fontBold

    const sum1 = document.createElement("label")
    const sum2 = document.createElement("label")
    const sumAkut = document.createElement("label")
    const sumAkutJaTuotanto = document.createElement("label")

    table1.id="KoosteTuotanto"
    table2.id="KoosteLaitteet"
    tableAkut.id= "KoosteAkut"

    let tehoTuotanto = {}, tehoLaitteet = {}, tehoAkut = {};
    tehoTuotanto.vanha = 0
    tehoTuotanto.uusi = 0
    header1.innerHTML = "Tuotantolaitteiden tehot</br>"
    //header1.innerHTML += "<span class='tuotantoTapaSpan'>Tuotantotapa: "+document.getElementById("muutosTuotantoTapa").value+"</span><br/>"
    table1.innerHTML = ""
    let productCounter = 0;
    for(let i of productions){
        productCounter++
        const vanha = Number.isNaN(parseInt(i?.vanha?.match(/\d+/)?.[0])) ? 0 : parseInt(i?.vanha?.match(/\d+/)?.[0])
        const uusi = Number.isNaN(parseInt(i?.uusi?.match(/\d+/)?.[0])) ? 0 : parseInt(i?.uusi?.match(/\d+/)?.[0])       
        table1.innerHTML += "<td>Tuotanto "+productCounter+":</td><td>"+vanha+" kW</td><td>&#8594;</td><td>"+uusi+" kW</td>"
        tehoTuotanto.vanha += vanha
        tehoTuotanto.uusi += uusi
    }
    //table1.innerHTML += "</table><br/>"
    sum1.innerHTML += "<span class='yhteensaSpan'>Yhteensä</span><br/>"
    sum1.innerHTML += tehoTuotanto.vanha+" kW &#8594; "+tehoTuotanto.uusi+" kW<br/><br/>"

    tehoLaitteet.vanha = 0;
    tehoLaitteet.uusi = 0;
    //table2.innerHTML += "<label>Verkkoliitäntälaitteiden tehot</label></br>"
    //table2.innerHTML += "<table>"

    let accuCounter = 0
    tehoAkut.vanha = 0
    tehoAkut.uusi = 0
    tableAkut.innerHTML = ""
    for(let i of accus){
        accuCounter++
        const vanha = Number.isNaN(parseInt(i?.vanha?.teho?.match(/\d+/)?.[0])) ? 0 : parseInt(i?.vanha?.teho?.match(/\d+/)?.[0])
        const uusi = Number.isNaN(parseInt(i?.uusi?.teho?.match(/\d+/)?.[0])) ? 0 : parseInt(i?.uusi?.teho?.match(/\d+/)?.[0])       
        tehoAkut.vanha += vanha
        tehoAkut.uusi += uusi
        tableAkut.innerHTML += "<tr><td>Sähkövarasto "+accuCounter+": </td><td>"+vanha +" kW</td><td>&#8594;</td><td>"+uusi+" kW</td></tr>"
    }

    sumAkut.innerHTML += "<span class='yhteensaSpan'>Yhteensä</span><br/>"
    sumAkut.innerHTML += tehoAkut.vanha+ " kW &#8594; "+ tehoAkut.uusi+" kW<br/><br/>"

    sumAkutJaTuotanto.innerHTML +="<br/>" + (tehoTuotanto.vanha+tehoAkut.vanha)+ " kW &#8594; "+ (tehoTuotanto.uusi+tehoAkut.uusi)+" kW<br/><br/>"


    let deviceCounter = 0
    for(let i of devices){
        deviceCounter++
        const alkio = {}
        alkio.Vanha = {}
        alkio.Vanha.Laite = i?.vanha?.[0]
        alkio.Vanha.Merkki = i?.vanha?.[1]
        alkio.Vanha.Malli =i?.vanha?.[2]
        alkio.Vanha.Tyyppi =i?.vanha?.[3]
        alkio.Vanha.Teho = Number.isNaN(parseInt(i?.vanha?.[4]?.match(/\d+/)?.[0])) ? 0 : parseInt(i?.vanha?.[4].match(/\d+/)?.[0])
        alkio.Vanha.Poistettu = i?.vanha?.[9]
        alkio.Uusi = {}
        alkio.Uusi.Laite = i?.uusi?.[0]
        alkio.Uusi.Merkki = i?.uusi?.[1]
        alkio.Uusi.Malli =i?.uusi?.[2]
        alkio.Uusi.Tyyppi =i?.uusi?.[3]
        alkio.Uusi.Teho = Number.isNaN(parseInt(i?.uusi?.[4]?.match(/\d+/)?.[0])) ? 0 : parseInt(i?.uusi?.[4].match(/\d+/)?.[0])
        //table2.innerHTML += "<td>Laite "+deviceCounter+ " </td><td></td><td>"+alkio.Uusi.Laite+"</td>"
        table2.innerHTML += "<td>Laite "+deviceCounter+":</td><td>"+alkio.Vanha.Teho+" kW</td><td>&#8594;</td><td>"+alkio.Uusi.Teho+" kW</td>"
        tehoLaitteet.vanha += alkio.Vanha.Teho
        tehoLaitteet.uusi += alkio.Uusi.Teho
    }

    //table2.innerHTML += "</table><br/>"
    sum2.innerHTML += "<span class='yhteensaSpan'>Yhteensä</span><br/>"
    sum2.innerHTML += tehoLaitteet.vanha+ " kW &#8594; "+ tehoLaitteet.uusi+" kW<br/><br/>"
    //tehoYhteensa.vanha = tehoTuotanto.vanha + tehoLaitteet.vanha
    //tehoYhteensa.uusi = tehoTuotanto.uusi + tehoLaitteet.uusi
    //sum3.innerHTML = tehoYhteensa.vanha+" kW &#8594; "+tehoYhteensa.uusi+" kW"
    container.innerHTML = ""
    uusiDiv.id = "verkkoTeho"
    uusiDiv.appendChild(header1)
    uusiDiv.appendChild(table1)
    uusiDiv.appendChild(sum1)
    uusiDiv.appendChild(headerAkut)
    uusiDiv.appendChild(tableAkut)
    uusiDiv.appendChild(sumAkut)
    uusiDiv.appendChild(headerAkutJaTuotanto)
    uusiDiv.appendChild(sumAkutJaTuotanto)
    uusiDiv.appendChild(header2)
    uusiDiv.appendChild(table2)
    uusiDiv.appendChild(sum2)
    //uusiDiv.appendChild(header3)
    //uusiDiv.appendChild(table3)
    //uusiDiv.appendChild(sum3)
    container.appendChild(uusiDiv)
}
let power1;
let production = []
let accuNew = []
let device = []
let system = []
//let productionType = document.getElementById("selectPower1").value
let productionIdNew = 0
let accuIdNew = 0
let deviceIdNew = 0
let systemIdNew = 0


function select1(){
    const val = document.getElementById("uusiPientuotantoSelect").value
    if(val === "no"){
        document.getElementById("uusiPientuotanto").style.display= "none"
    }else{
        document.getElementById("uusiPientuotanto").style.display= "initial"
    }
}   

function select2(){
    const val = document.getElementById("muutosPientuotantoSelect").value
     if(val === "no"){
        document.getElementById("muutosPientuotanto").style.display= "none"
    }else{
        document.getElementById("muutosPientuotanto").style.display= "initial"
    }
}

function select3(){
    const select = document.getElementById("selectPower1")
    const legend1 = document.getElementById("legendUusi");
    const legend2= document.getElementById("invertterit");
    const legendModal1=document.getElementById("modalLegend1")
    const legendModal2=document.getElementById("modalLegend2")
    if (select.value === "aurinko") {
        productionType = "Aurinkovoima"
      legend1.textContent = "Aurinkopaneelit";
      legend2.textContent = "Invertterit"
      legendModal1.textContent = "Aurinkopaneelit"
      legendModal2.textContent = "Uusi invertteri"
    } else if (select.value === "tuuli") {
        productionType = "Tuulivoima"
      legend1.textContent = "Tuulivoima";
      legend2.textContent = "Verkkoonliitäntälaitteet"
      legendModal1.textContent = "Tuulivoima"
      legendModal2.textContent = "Uusi verkkoonliitäntälaite"
    } else if(select.value === "diesel"){
        productionType = "Dieselvoima"
        legend1.textContent = "Dieselvoima";
        legend2.textContent = "Verkkoonliitäntälaitteet"
        legendModal1.textContent = "Dieselvoima"
        legendModal2.textContent = "Uusi verkkoonliitäntälaite"
    }



}


function uusiAkku(){
    const container = document.getElementById("akkuUusiContainer")
    const modal = document.getElementById("accuNewModal")
    const modalCopy = modal.cloneNode(true)

    const modalButton1 = document.createElement("button")
    const modalButton2 = document.createElement("button")

    modalButton1.textContent = "Lisää"
    modalButton2.textContent = "Sulje"
    modalButton1.type = "button"
    modalButton2.type = "button"
    

    modalButton1.onclick = () => {
        const index1 = accuIdNew
        accuIdNew++
        const alkio = {id:index1}
        accuNew.push(alkio)

        const nimi = document.createElement("label")
        const uusiDiv = document.createElement("div")
        uusiDiv.className = "clickBox"
        const br1 = document.createElement("br")
        const br2 = document.createElement("br")
eElement("button")
        delButton.textContent="Poista"
        const delButton = document.creat
        delButton.type="button"
        delButton.onclick = () => {
        uusiDiv.remove()
        nimi.remove()
        delButton.remove()
        br1.remove()
        br2.remove()
        accuNew = accuNew.filter(a => a.id !== index1)
        modalCopy.remove()
        const nimet = container.querySelectorAll(".accuName")
        nimet.forEach((nimi,index) => {
            nimi.textContent = "Sähkövarasto "+(index+1)
        })
        verkkoTehoUusi()
         }

        
        uusiDiv.onclick = () => {
            const buttons = modalCopy.querySelectorAll("button");
            buttons[0].onclick = () => {
                const table = uusiDiv.querySelector("table")
                const kapasiteetti = modalCopy.querySelector(".accuNewCap").value
                const teho =modalCopy.querySelector(".accuNewPower").value
                table.innerHTML = "<tr><td>Kapasiteetti: </td><td>"+kapasiteetti+" kWh</td></tr>"
                table.innerHTML += "<tr><td>Teho: </td><td>"+teho+" kW</td></tr>"
                alkio.teho= teho + " kW"
                alkio.kapasiteetti = kapasiteetti + " kWh"
                verkkoTehoUusi()
            }
            modalCopy.style.display = "flex"
            document.body.classList.add("modal-open")
            
        }

        nimi.textContent  ="Sähkövarasto "+accuNew.length
        nimi.className ="accuName"
        const table = document.createElement("table")
        const plus = document.createElement("label")
        plus.textContent = "+"
        plus.className = "clickBoxPlus"
        const kapasiteetti = modalCopy.querySelector(".accuNewCap").value
        const teho =modalCopy.querySelector(".accuNewPower").value
        alkio.teho= teho + " kW"
        alkio.kapasiteetti = kapasiteetti + " kWh"
        table.innerHTML = "<tr><td>Kapasiteetti: </td><td>"+kapasiteetti+" kWh</td></tr>"
        table.innerHTML += "<tr><td>Teho: </td><td>"+teho+" kW</td></tr>"
        uusiDiv.appendChild(table)
        uusiDiv.appendChild(plus)
        container.appendChild(nimi)
        container.appendChild(uusiDiv)
        container.appendChild(delButton)
        container.appendChild(br2)
        container.appendChild(br1)
        verkkoTehoUusi()
    }

    modalButton2.onclick = () => {
        modalCopy.style.display = "none"
        document.body.classList.remove("modal-open")
    }

    const modalbox = modalCopy.querySelector(".modalBox")
    modalCopy.querySelectorAll("button").forEach(btn => btn.remove());
    modalbox.appendChild(modalButton1)
    modalbox.appendChild(modalButton2)
    container.appendChild(modalCopy)
    modalCopy.style.display = "flex"
    document.body.classList.add("modal-open")



}
/*function addPower1(){
    power1 = document.getElementById("modalPower1").value
    const tuotanto = document.getElementById("tuotanto1")
    tuotanto.textContent = power1 + " kW";
}*/

function openModal1(){
    const modal = document.getElementById("modal1")
    const buttons = modal.querySelectorAll("button")
    const container = document.getElementById("newProductionContainer")
    //buttons[0].type = "button"
    //buttons[1].type = "button"
    const index1 = productionIdNew
    productionIdNew++
    const alkio = {id:index1}
    buttons[0].onclick = () => {
        const newProduction = document.createElement("div")
        newProduction.className = "clickBox"
        const plus = document.createElement("label")
        plus.textContent = "+"
        plus.className = "clickBoxPlus"
        const power = document.getElementById("modalPower1").value
        const powerLabel = document.createElement("label")
        powerLabel.textContent = power + " kW"
        alkio.teho = power+ " kW"
        console.log("Ennen:",production)
        production.push(alkio)
        console.log("Jälkeen:",production)
        const br1 = document.createElement("br")
        const br2 = document.createElement("br")
        const nimi = document.createElement("label")
        newProduction.appendChild(powerLabel)
        newProduction.appendChild(plus)
        newProduction.onclick = () => {
            console.log("New")
            const modal2 = document.getElementById("modal1")
            const buttons2 = modal2.querySelectorAll("button")
            buttons2[0].onclick = () => {
                const power = modal2.querySelector("#modalPower1").value
                powerLabel.textContent = power + " kW"
            
                alkio.teho = power + " kW"
                
                verkkoTehoUusi()
            }
            buttons2[1].onclick = () => {
                modal2.style.display = "none"
                document.body.classList.remove("modal-open")
            }
            modal2.style.display = "flex"
            document.body.classList.add("modal-open")
        }
        nimi.textContent = "Tuotantolaite "+(production.length)
        nimi.className = "uusiTuotantoNimet"
        const delButton = document.createElement("button")
        delButton.textContent = "Poista"
        delButton.type = "button"
        delButton.onclick = () => {
            newProduction.remove()
            br1.remove()
            br2.remove()
            production = production.filter((pr) => 
                pr.id !== index1
            )
            delButton.remove()
            nimi.remove()
            const nimet = container.querySelectorAll(".uusiTuotantoNimet")
            nimet.forEach((n,index) => {
                n.textContent = "Tuotantolaite "+(index+1)
            })
            verkkoTehoUusi()
        }
        delButton.className = "nollaus"
        container.appendChild(nimi)
        container.appendChild(newProduction)
        container.appendChild(delButton)
        container.appendChild(br1)
        container.appendChild(br2)
        verkkoTehoUusi()
    }
    buttons[1].onclick = () => {
        modal.style.display= "none"
        document.body.classList.remove("modal-open")
    }
    modal.style.display="flex"
    document.body.classList.add("modal-open")
}

/*
function closeModal1(){
    const modal = document.getElementById("modal1")
    
}*/

function saveDevice2(number, data){
    let newDevice = []
    for(let i; i < device.length; i++){
        if(i !== number){
            newDevice.push(device[i])
        }else{
            newDevice.push(data)
        }
    }
    device = JSON.parse(JSON.stringify(newDevice));
    const id = "deviceClickBox"+number.toString()
    const container = document.getElementById(id)
    const table = document.createElement("table")
    table.innerHTML = ""
        table.innerHTML += "<tr><td>Laite:</td><td> "+data.Device + "</td></tr>"
        table.innerHTML += "<tr><td>Merkki:</td><td> "+data.Label + "</td></tr>"
        table.innerHTML += "<tr><td>Malli:</td><td> "+data.Model + "</td></tr>"
        table.innerHTML += "<tr><td>Tyyppi:</td><td> "+data.Type + "</td></tr>"
        table.innerHTML += "<tr><td>Teho:</td><td> "+data.Power + " kW" + "</td></tr>"
        table.innerHTML += "<tr><td>Tehon muutos:</td><td> "+data.Change + " kVA/kW" + "</td></tr>"
        table.innerHTML += "<tr><td>Enimmäisvikavirta:</td><td> "+data.MaxFaultCurrent + " A"+ "</td></tr>"
        table.innerHTML += "<tr><td>Oikosulkuvirta:</td><td> "+data.ShortCircuitCurrent + " A" +"</td></tr>"
        table.innerHTML += "<tr><td>Kytketyt vaiheet:</td><td> "+data.Phases + "</td></tr>"

    container.innerHTML=""
    container.appendChild(table)
    verkkoTehoUusi()
    
    

}

function showDevices(){
    const container = document.getElementById("container1")

}


function addDevice2(){
    const newItem = {};
    const index1 = deviceIdNew
    deviceIdNew++
    newItem["Id"] = index1
    newItem["Device"] = document.getElementById("device").value
    newItem["Label"] = document.getElementById("deviceLabel").value
    newItem["Model"] = document.getElementById("deviceLabel").value
    newItem["Type"] = document.getElementById("deviceType").value
    newItem["Power"] =  document.getElementById("devicePower").value
    newItem["MaxFaultCurrent"] =  document.getElementById("deviceMaxFault").value
    newItem["ShortCircuitCurrent"] = document.getElementById("deviceShortCircuit").value
    newItem["Phases"] = document.getElementById("devicePhases").value
    device.push(newItem)
    verkkoTehoUusi()
    const i = device.length - 1
    const container = document.getElementById("container1")
    const uusiDiv = document.createElement("div");
    const nimi = document.createElement("label")
    nimi.textContent = "Laite "+device.length
    nimi.className = "uusiVerkkolaiteNimet"
        uusiDiv.className = "clickBox"
        uusiDiv.id = "deviceClickBox"+i

        let text = "<table><tr><th></th><th></th></tr>"
        text += "<tr><td>Laite: </td><td>"+device[i].Device + "</td></tr><br/>"
        text += "<tr><td>Merkki: </td><td>"+device[i].Label + "</td></tr><br/>"
        text += "<tr><td>Malli: </td><td>"+device[i].Model + "</td></tr><br/>"
        text += "<tr><td>Tyyppi: </td><td>"+device[i].Type + "</td></tr><br/>"
        text += "<tr><td>Teho: </td><td>"+device[i].Power + " kW</td></tr><br/>"
        text += "<tr><td>Enimmäisvikavirta: </td><td>"+device[i].MaxFaultCurrent + " A</td></tr><br/>"
        text += "<tr><td>Oikosulkuvirta: </td><td>"+device[i].ShortCircuitCurrent + "A</td></tr><br/>"
        text += "<tr><td>Kytketyt vaiheet: </td><td>"+device[i].Phases + "</td></tr><br/>"
        text += "</table>"
        uusiDiv.innerHTML = text;
        const plus = document.createElement("label")
        plus.textContent = "+"
        plus.className = "devicePlus"
        const plusDiv = document.createElement("div")
        plusDiv.appendChild(plus)
        uusiDiv.appendChild(plusDiv)
        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        const delButton = document.createElement("button")
        delButton.textContent="Poista"
        delButton.type="button"
        delButton.className = "nollaus"
        delButton.addEventListener("click", () => {
        nimi.remove()
        uusiDiv.remove();
        device = device.filter(device => device.Id !== index1)
        delButton.remove();
        br1.remove()
        br2.remove()
        verkkoTehoUusi()

        const divit = container.querySelectorAll(".clickBox");
        divit.forEach((d, index) => {
            d.id = "deviceClickBox"+ index;
        });

        const nimet = container.querySelectorAll(".uusiVerkkolaiteNimet")
        nimet.forEach((n, index) => {
            n.textContent = "Laite "+(index+1)
        })
        });
        

        


        const pohja = document.getElementById("modal2")
        const kopio = pohja.cloneNode(true);

        const type = kopio.querySelector("#deviceType"); 
        const power = kopio.querySelector("#devicePower");
        const maxFault = kopio.querySelector("#deviceMaxFault"); 
        const shortCircuit = kopio.querySelector("#deviceShortCircuit");
        const phases = kopio.querySelector("#devicePhases");

        if(device[i].Type) type.value = device[i].Type
        if(device[i].Power) power.value = device[i].Power
        if(device[i].MaxFaultCurrent) maxFault.value = device[i].MaxFaultCurrent
        if(device[i].ShortCircuitCurrent) shortCircuit.value = device[i].ShortCircuitCurrent
        if(device[i].Phases) phases.value = device[i].Phases

        kopio.id = "deviceDiv"+i.toString()
        kopio.querySelectorAll("button").forEach(btn => btn.remove());
        kopio.style.display = "none"
        
        
        const content = kopio.querySelector("#modalBox2");
        let button1 = document.createElement("BUTTON");
        button1.textContent = "Tallenna"
        button1.onclick = () => {
            const table = document.createElement("table")
            let data = {
                "Id":index1,
                "Device":content.querySelector("#device").value,
                "Type":content.querySelector("#deviceType").value,
                "Label":content.querySelector("#deviceLabel").value,
                "Model":content.querySelector("#deviceModel").value,
                "Power":content.querySelector("#devicePower").value,
                "MaxFaultCurrent":content.querySelector("#deviceMaxFault").value,
                "ShortCircuitCurrent":content.querySelector("#deviceShortCircuit").value,
                "Phases":content.querySelector("#devicePhases").value,
            }
            const deviceIndex = device.findIndex(d => d.Id === index1);

                if (deviceIndex !== -1) {
                     device[deviceIndex] = data;
                }

            uusiDiv.innerHTML=""
            table.innerHTML+="<tr><td>Laite: </td><td>"+data.Device+"</td></tr>"
            table.innerHTML+="<tr><td>Merkki: </td><td>"+data.Label+"</td></tr>"
            table.innerHTML+="<tr><td>Malli </td><td>"+data.Model+"</td></tr>"
            table.innerHTML+="<tr><td>Tyyppi: </td><td>"+data.Type+"</td></tr>"
            table.innerHTML+="<tr><td>Teho: </td><td>"+data.Power+" kW</td></tr>"
            table.innerHTML+="<tr><td>Enimmäisvikavirta: </td><td>"+data.MaxFaultCurrent+" A</td></tr>"
            table.innerHTML+="<tr><td>Oikosulkuvirta: </td><td>"+data.ShortCircuitCurrent+" A</td></tr>"
            table.innerHTML+="<tr><td>Kytketyt vaiheet: </td><td>"+data.Phases+"</td></tr>"
            uusiDiv.appendChild(table)
            const plus = document.createElement("label")
            plus.textContent = "+"
            const plusDiv = document.createElement("div")
            plusDiv.appendChild(plus)
            uusiDiv.appendChild(plusDiv)
            verkkoTehoUusi()

           

            

            
        }
        let button2 = document.createElement("button");
        button2.textContent = "Sulje"
        button2.onclick = function(){
            kopio.style.display = "none"
            document.body.classList.remove("modal-open")
        }
        content.appendChild(button1)
        content.appendChild(button2)

            
        document.body.appendChild(kopio)
        uusiDiv.onclick = function () {
            kopio.style.display = "flex"
            document.body.classList.add("modal-open")
        }
        container.appendChild(nimi)
        container.appendChild(uusiDiv);
        container.appendChild(delButton);
        container.appendChild(br1);
        container.appendChild(br2);
        

}

function openModal2(){
    const modal = document.getElementById("modal2")
    modal.style.display = "flex"
    document.body.classList.add("modal-open")

}

function closeModal2(){
    const modal = document.getElementById("modal2")
    modal.style.display= "none"
    document.body.classList.remove("modal-open")
}
function addSystem(){
    
    let verkkoonTeho = 0;
    let tuotantoTeho = 0;
    let akkuTeho = 0;
    const productionType = document.getElementById("selectPower1").value
    const data = {
        "Id":systemIdNew,
        "Type":productionType,
        "Accus":accuNew,
        "Production":production,
        "Devices": device,
        "Info":document.getElementById("infoForNew")
    }
    system.push(data)
    const index1 = systemIdNew
    systemIdNew++
    const i = system.length - 1
    const container = document.getElementById("container2")
    const uusiDiv =document.createElement("div")
    let text = "<fieldset><legend class='newSystem'>"+"Järjestelmä "+(i+1)+"</legend>"
        text += "<label class='systemBold'>"+"Tuotantotapa:</label><label>"+productionType + "</label><br/><br/>"
        if(production.length > 0){
            text += "<label class='systemBold'>Tuotantolaitteiden tehot: </label><br/><table>"
        }
        for(let b = 0; b < production.length; b++){
            console.log(production[b])
            const tehoLisays = parseInt(production?.[b]?.teho?.match(/\d+/)?.[0]);
            const teho = Number.isNaN(tehoLisays) ? 0 : tehoLisays;
            text += "<tr><td>Tuotantolaite "+(b+1)+": </td><td>"+teho+" kW</td></tr>"
            tuotantoTeho += teho
        }
        if(production.length > 0){
            text += "<tr><td><span class='boldSpan'>Yhteensä: </span></td><td>"+tuotantoTeho+" kW</td></tr>"
            text += "</table><br/>"
        }
        if(accuNew.length >0){
            text += "<label class='systemBold'>Sähkövarastot: </label><br/>"
        }
        for(let i = 0; i < accuNew.length; i++){
            let teho = parseInt(accuNew?.[i]?.teho?.match(/\d+/)?.[0]);
            teho = Number.isNaN(teho) ? 0: teho
            let kapasiteetti = parseInt(accuNew?.[i]?.kapasiteetti?.match(/\d+/)?.[0]);
            kapasiteetti = Number.isNaN(kapasiteetti) ? 0: teho
            text += "<fieldset><legend>Sähkövarasto "+(i+1)+"</legend><table>"
            text += "<tr><td>Kapasiteetti: </td><td>"+kapasiteetti+" kWh</td></tr>"
            text += "<tr><td>Teho: </td><td>"+teho+" kW</td></tr>"
            text += "</table></fieldset>"
            akkuTeho += teho
        }
        if(accuNew.length >0){
            text += "<label class='systemBold'>Sähkövarastojen kokonaisteho: </label><br/>"
            text += "<label>"+akkuTeho+" kW</label><br/><br/>"
        }

        if(accuNew.length >0 && production.length > 0){
            text += "<label class='systemBold'>Tuotantolaitteiden ja sähkövarastojen yhteinen kokonaisteho: </label><br/>"
            text += "<label>"+(tuotantoTeho+akkuTeho)+" kW</label><br/><br/>"
        }



        if(device.length > 0){
            text += "<label class='systemBold'>Verkkoliitäntälaitteet: </label><br/>"
        }
        for(let a = 0; a < device.length; a++){
        text += "<fieldset>"
        text += "<legend>Laite "+(a+1)+"</legend><table>"
        text += "<tr><td>Laite: "+"</td><td>"+device[a].Device + "</td></tr>"
        text += "<tr><td>Merkki: "+"</td><td>"+device[a].Label + "</td></tr>"
        text += "<tr><td>Malli: "+"</td><td>"+device[a].Model + "</td></tr>"
        text += "<tr><td>Tyyppi: "+"</td><td>"+device[a].Type + "</td></tr>"
        text += "<tr><td>Teho: "+"</td><td>"+device[a].Power + " kW</td></tr>"
        text += "<tr><td>Enimmäisvikavirta: "+"</td><td>"+device[a].MaxFaultCurrent + " A</td></tr>"
        text += "<tr><td>Oikosulkuvirta: "+"</td><td>"+device[a].ShortCircuitCurrent + " A</td></tr>"
        text += "<tr><td>Kytketyt vaiheet: "+"</td><td>"+device[a].Phases + "</td></tr>"
        text += "</table></fieldset><br/><br/>"
        const tehoLisays = parseInt(device[a].Power.match(/\d+/)?.[0]);
        const teho = Number.isNaN(tehoLisays) ? 0 : tehoLisays;
        verkkoonTeho += teho
        }
        if(device.length >0){
            text += "<label class='systemBold'>Verkkoonliittymisteho: </label><br/>"
            text += "<label>"+verkkoonTeho+" kW</label><br/><br/>"
        }
        const info = document.getElementById("infoForNew").value
        if(info !== null && info !== ""){
            text += "<label class='systemBold'>Lisätiedot:</label><br/>"
            text += "<label>"+info+"</label><br/><br/>"
        }
        
    uusiDiv.innerHTML = ""
    uusiDiv.innerHTML = text
    uusiDiv.className = "ilmoitusUusi"
    uusiDiv.id = "ilmoitusUusi_"+i
    const tabButton = document.createElement("button")
    tabButton.className = "tabButtons"
    const tabButtonContainer = document.getElementById("container2TabButtons")
    const delButton = document.createElement("button")
    delButton.textContent="Poista"
    delButton.addEventListener("click", () => {

        uusiDiv.remove();
        system = system.filter(s => s.Id !== index1)
        delButton.remove();
        tabButton.remove()
        const divit = container.querySelectorAll(".ilmoitusUusi");
        divit.forEach((d, index) => {
            d.querySelector("legend").textContent = "Järjestelmä "+(index+1)
            if(index === divit.length-1){
                d.style.display = "block"
            }
        });

        const tabButtons = tabButtonContainer.querySelectorAll(".tabButtonsNew")
        
        tabButtons.forEach((btn, index2) => {
            btn.textContent = "Järjestelmä "+(index2+1)
                if(index2 < tabButtons.length-1){
                btn.classList.remove('active');
                //btn.classList.remove('pressedButton')
                }else{
                    btn.style.borderStyle = "double"
                }
        })


        const nimet = container.querySelectorAll(".newSystem")
        nimet.forEach((n,index) => {
            n.textContent = "Järjestelmä "+(index+1)
        })
        });
    uusiDiv.style.display = "none"

    tabButton.type = "button"
    console.log("System",system)
    tabButton.textContent = "Järjestelmä "+system.length
    tabButton.className = "tabButtonsNew"
    tabButton.onclick = () => {
        const divit = container.querySelectorAll(".ilmoitusUusi")
        divit.forEach(div1 => {
            div1.style.display = "none"
        })
        const buttons = tabButtonContainer.querySelectorAll("button")
        buttons.forEach(btn => {
            btn.style.borderStyle = "none"
        })
        
        uusiDiv.style.display = "block"
        tabButton.style.borderStyle = "double"
    }
    tabButtonContainer.appendChild(tabButton)

    uusiDiv.style.display = "none"
    uusiDiv.appendChild(delButton)
    container.appendChild(uusiDiv)
    if(container.querySelectorAll(".ilmoitusUusi").length === 1){
        uusiDiv.style.display = "block"
    }
}

function nollaaUusi(){
    production = []
    device = []
    accuNew = []
    document.getElementById("infoForNew").value = ""
    const container1 = document.getElementById("container1")
    const container2 = document.getElementById("newProductionContainer")
    const container3 = document.getElementById("akkuUusiContainer")
    document.getElementById("KoosteContainerUusi").innerHTML = ""
    container1.innerHTML = ""
    container2.innerHTML = ""
    container3.innerHTML = ""
}

function nollaaIlmoitusUusi(){
    system=[]
    document.getElementById("container2").innerHTML = ""
    document.getElementById("container2TabButtons").innerHTML = ""
    
}

function verkkoTehoUusi(){
    const uusiDiv = document.createElement("div")
    const container = document.getElementById("KoosteContainerUusi")
    const table1 = document.createElement("table")
    const table2 = document.createElement("table")
    const tableAkut = document.createElement("table")
    const header1 = document.createElement("label")
    const header2 = document.createElement("label")
    const headerAkut = document.createElement("label")
    const headerAkutJaTuotanto = document.createElement("label")
    const sum1 = document.createElement("label")
    const sum2 = document.createElement("label")
    const sumAkut = document.createElement("label")
    const sumAkutJaTuotanto = document.createElement("label")
    header1.textContent = "Tuotantolaitteiden tehot"
    header2.textContent = "Verkkoonliittymistehot"
    headerAkut.textContent = "Sähkövarastojen tehot"
    headerAkutJaTuotanto.textContent = "Tuotantolaitteiden ja sähkövarastojen yhteinen kokonaisteho"
    header1.style.fontWeight = "bold"
    header2.style.fontWeight = "bold"
    headerAkut.style.fontWeight = "bold"
    headerAkutJaTuotanto.style.fontWeight = "bold"
    const fontSize = "20px"
    header1.style.fontSize = fontSize
    header2.style.fontSize = fontSize
    headerAkut.style.fontSize = fontSize
    headerAkutJaTuotanto.style.fontSize = fontSize
    let counter = 0;
    let summa = {}
    summa.Tuotanto = 0;
    summa.Akut = 0
    summa.VerkkoLaite = 0
    table1.innerHTML = ""
    console.log("production",production)
    for(let i of production){
        counter++
        const teho = parseInt(i?.teho?.match(/\d+/)?.[0]);
        const lisays = Number.isNaN(teho) ? 0: teho;
        table1.innerHTML += "<tr><td>Tuotantolaite "+counter+": </td><td>"+lisays+" kW</td><tr>"
        summa.Tuotanto += lisays
        summa.Yhteensa += lisays
    }
    sum1.innerHTML += "<span class='yhteensaSpan'>Yhteensä</span><br/>"+summa.Tuotanto+" kW<br/><br/>"
    counter = 0;
    table2.innerHTML = ""
    for(let i of device){
        counter++
        const teho = parseInt(i?.Power?.match(/\d+/)?.[0]);
        const lisays = Number.isNaN(teho) ? 0: teho;
         table2.innerHTML += "<tr><td>Laite "+counter+": </td><td>"+lisays+" kW</td><tr>"
        summa.VerkkoLaite += lisays
    }
    sum2.innerHTML += "<span class='yhteensaSpan'>Yhteensä</span><br/>"+summa.VerkkoLaite+" kW<br/><br/>"
    counter = 0
    tableAkut.innerHTML = ""
    for(let i of accuNew){
        counter++
        const teho = parseInt(i?.teho?.match(/\d+/)?.[0]);
        const lisays = Number.isNaN(teho) ? 0: teho;
        tableAkut.innerHTML += "<tr><td>Sähkövarasto "+counter+":</td><td>"+lisays+" kW</td></tr>"
        summa.Akut += lisays
    }
    sumAkut.innerHTML += "<span class='yhteensaSpan'>Yhteensä</span><br/>"+summa.Akut+" kW<br/><br/>"
    sumAkutJaTuotanto.innerHTML += "<br/>"+(summa.Akut+summa.Tuotanto)+" kW<br/><br/>"
    uusiDiv.innerHTML = ""
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
    container.innerHTML = ""
    container.appendChild(uusiDiv)
    }

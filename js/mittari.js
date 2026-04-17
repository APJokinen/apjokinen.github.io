let codeReader = null;
let info = null
let romutettavat = []
let romuIlmoitus = []
let romuId= 0
let romuIlmoitusId = 0
const container = document.getElementById("video-container")

const textarea = document.getElementById("infoArea")
textarea.addEventListener("input", () => {
  if(textarea.value !== null){
  info = textarea.value;
  showRomutettavat()
  }
  });

function romutus(){
    const romutusStatus = document.getElementById("romutusSelect").value
    const div = document.getElementById("mittariDiv")
    if(romutusStatus === "kyllä"){
        div.style.display = "block"
    }else{
      div.style.display = "none"
    }
}

function startCamera(modeNumber){
  codeReader = new ZXing.BrowserMultiFormatReader();

      codeReader.decodeFromVideoDevice(null,"video", (result, err) => {
        if (result) {
          //console.log("✅ Data: " + result.text + "<br>📦 Tyyppi: " + result.barcodeFormat)
          
          if(modeNumber === 1){
            document.getElementById("Mittarin sarjanumero").value = result.text
          }else if(modeNumber === 2){
            romutettavat.push(result.text)
            showRomutettavat()
          }
          stopScanner()
        }

        if (err && !(err instanceof ZXing.NotFoundException)) {
          console.error(err);
        }
      });
}


function startScanner(modeNumber) {
      container.style.display = "flex"

      requestAnimationFrame(() => {
        startCamera(modeNumber)
      })
      
    }

function stopScanner() {
   if (codeReader) {
        codeReader.reset();
        codeReader = null
        //document.getElementById('result').innerHTML = "⏹️ Skannaus pysäytetty";
      }
       container.style.display = "none"
     
    }

function showRomutettavat(){
  const container = document.getElementById("romutettavat")
  const table = document.createElement("table")
  container.innerHTML = ""
  if(romutettavat.length > 0){
    container.innerHTML="Lista romutettavista mittareista: "
  for(i of romutettavat){
    table.innerHTML += "<tr><td>"+i.numero+"</td><td><button onclick='poistaRivi(this,"+i.id+")'>Poista</button></td></tr>"
    
  }
  container.appendChild(table)
  }
  if(info !== null){
  container.innerHTML += "<br/><br/><label>Lisätiedot: </label><br/>"
  container.innerHTML += "<label>"+info+"</label>"
   }
}

function poistaRivi(btn,id){
  romutettavat = romutettavat.filter(romu => romu.id !== id)
  const rivi = btn.parentNode.parentNode;
  rivi.remove();
}

function addRomutettava(){
    const value = document.getElementById("romutettavaByHand").value
    const id = romuId
    romuId++
    romutettavat.push({id:id,numero:value})
    showRomutettavat()
} 

/*function addInfo(){

  const value = document.getElementById("infoArea").value
  info=value
  showRomutettavat()
}*/

function romuIlmoitusFunc(){
    const alkio = {id:romuIlmoitusId, lista: romutettavat, tiedot: info}
    romuIlmoitus.push(alkio)
    const index1 = romuIlmoitusId
    romuIlmoitusId++
    const containerBtn = document.getElementById("valilehtiBtn")
    const containerIlmoitus = document.getElementById("romutusIlmoitus")
    
    containerBtn.innerHTML=""
    containerIlmoitus.innerHTML = ""

    let counter = 0
    for(a of romuIlmoitus){
        counter++
        const label = document.createElement("label")
        label.textContent = "Romutettavat "+counter
        label.className = "romuIlmoitusNimi"
        const newTabButton = document.createElement("button")
        newTabButton.textContent = "Romutettavat "+counter
        newTabButton.className = "romuIlmoitusValilehti"
        newTabButton.type = "button"
        const newDelButton = document.createElement("button")
        newDelButton.textContent = "Poista"
        newDelButton.type = "button"
        const newDiv = document.createElement("div")
        newDiv.className = "romuIlmoitusDiv"
        let divText = "<fieldset><legend>Romutettavat "+counter+"</legend>"
        for(b of a.lista){
          divText += b + "<br/>"
        }
        divText += "<br/>"
        if(a.tiedot){
          divText += "<label>Lisätiedot: </label><br/>"
          divText += "<label>"+a.tiedot+"</label><br/>"
        }
        divText += "</fieldset>"
        const br1 = document.createElement("br")
        const br2 = document.createElement("br")
        const mittariLabel = document.createElement("label")
        /*mittariLabel.textContent ="Poistettavien mittareiden sarjanumerot: "
        newDiv.appendChild(label)
        newDiv.appendChild(br1)
        newDiv.appendChild(mittariLabel)
        newDiv.appendChild(br2)*/
        newDiv.innerHTML += divText
        newDiv.appendChild(newDelButton)
        newDiv.style.display = "none"

        newDelButton.onclick = () => {
            newDiv.remove()
            newTabButton.remove()
            newDelButton.remove()
            romuIlmoitus = romuIlmoitus.filter(ilm => ilm.id !== index1)
            const nimet = containerIlmoitus.querySelectorAll(".romuIlmoitusNimi")
            nimet.forEach((nimi,index) => {
              nimi.textContent = "Romutettavat "+(index+1)
            })

            const tabBtn =containerIlmoitus.querySelectorAll(".romuIlmoitusValilehti")
            tabBtn.forEach((btn,index) => {
                btn.textContent = "Romutettavat "+(index+1)
            })
        }

        newTabButton.onclick = () => {
            const divit = document.querySelectorAll(".romuIlmoitusDiv")
            divit.forEach((div,index) => {
                div.style.display = "none"
            })
            newDiv.style.display = "block"
            const tabit =  document.querySelectorAll(".romuIlmoitusValilehti")
            tabit.forEach((tab,index) => {
                tab.style.borderStyle = "none"
            })
            newTabButton.style.borderStyle = "double"
        }

        containerBtn.appendChild(newTabButton)
        containerIlmoitus.appendChild(newDiv)



    }

}

function emptyInfo(){
  info = null
  textarea.value = null
  showRomutettavat()
}

function emptyRomu(){
    info=null
    textarea.value=null
    romutettavat = []
    showRomutettavat()
}

function emptyIlmoitus(){
    romuIlmoitus = null
    const containerBtn = document.getElementById("valilehtiBtn")
    const containerIlmoitus = document.getElementById("romutusIlmoitus")
    
    containerBtn.innerHTML=""
    containerIlmoitus.innerHTML = ""
}


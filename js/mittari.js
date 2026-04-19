let codeReader = null;
let info = null
let romutettavat = []
let romuIlmoitus = []
let romuId= 0
let romuIlmoitusId = 0
const container = document.getElementById("video-container")


document.addEventListener("click", (e) => {
  if (!e.target.closest("table")) {
    document.querySelectorAll(".selectedRomuRow").forEach(r => r.classList.remove("selectedRomuRow"));
    document.querySelectorAll(".removeRomuRowBtn").forEach(r => r.className = "hiddenBtn");
    
  }
});

const dropZone = document.getElementById("picDropZone")

window.addEventListener("dragover", (e) => {
  console.log("dragZone")
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
    if (!dropZone.contains(e.target)) {
      e.dataTransfer.dropEffect = "none";
    }
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
            document.getElementById("Mittarin_sarjanumero").value = result.text
          }else if(modeNumber === 2){
            const id = romuId
            romuId++
            const lisays = {id:id,numero:result.text}
            romutettavat.push(lisays)
            console.log("Romutettavat:",romutettavat)
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
  for(i of romutettavat){
    table.innerHTML += "<tr><td>"+i.numero+"</td><td><button class='hiddenBtn' onclick='poistaRivi(this,"+i.id+")'>Poista</button></td></tr>"
  }

  const rows = table.querySelectorAll("tr");
  const buttons = table.querySelectorAll("button")

rows.forEach((row, index) => {

  row.addEventListener("click", () => {
    rows.forEach(r => r.classList.remove("selectedRomuRow"));
    buttons.forEach(r => r.className = "hiddenBtn");

    row.classList.add("selectedRomuRow");
    row.querySelector("button").className ="removeRomuRowBtn"
  });
});

  //const wrapper = document.createElement("div")
  //wrapper.className = "romuRowWrapper"

  container.appendChild(table)
  }
}

function poistaRivi(btn,id){
  romutettavat = romutettavat.filter(romu => romu.id !== id)
  const rivi = btn.parentNode.parentNode;
  rivi.remove();
  /*const romuContainer = document.getElementById("romutettavat")
  const kaikkiRivit = romuContainer.querySelectorAll("tr")
  console.log(kaikkiRivit)
  if(kaikkiRivit.length > 0){
    let viimeinen = kaikkiRivit[kaikkiRivit.length - 1];
    //console.log(viimeinen instanceof HTMLElement);
    //console.log(viimeinen.nodeType);
    console.log("Ennen:",viimeinen)
    kaikkiRivit[kaikkiRivit.length - 1].className = "selectedRomuRow"
    
    console.log("Jälkeen:",viimeinen)
    console.log(viimeinen.classList)
  }*/
  

}

function addRomutettava(){
    const value = document.getElementById("romutettavaByHand").value
    if(value !== null && value !== ""){
      const id = romuId
      romuId++
      romutettavat.push({id:id,numero:value})
      showRomutettavat()
    }
    
} 

/*function addInfo(){

  const value = document.getElementById("infoArea").value
  info=value
  showRomutettavat()
}*/

function romuIlmoitusFunc(){
    const alkio = {id:romuIlmoitusId, lista: romutettavat, tiedot: document.getElementById("infoAreaRomu").value}
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
        /*const label = document.createElement("label")
        label.textContent = "Romutettavat "+counter
        label.className = "romuIlmoitusNimi"*/
        const newTabButton = document.createElement("button")
        newTabButton.textContent = "Romutettavat "+counter
        newTabButton.className = "romuIlmoitusValilehti"
        newTabButton.type = "button"
        const newDelButton = document.createElement("button")
        newDelButton.textContent = "Poista"
        newDelButton.type = "button"
        const newDiv = document.createElement("div")
        newDiv.className = "romuIlmoitusDiv"
        let divText = "<fieldset><legend class='romuIlmoitusLegend'>Romutettavat "+counter+"</legend>"
        for(b of a.lista){
          divText += b.numero + "<br/>"
        }
        divText += "<br/>"
        divText += "</fieldset>"
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
            const nimet = containerIlmoitus.querySelectorAll(".romuIlmoitusLegend")
            nimet.forEach((nimi,i) => {
              nimi.textContent = "Romutettavat "+(i+1)
            })

            const tabBtn =containerBtn.querySelectorAll(".romuIlmoitusValilehti")
            tabBtn.forEach((btn,i) => {
                btn.textContent = "Romutettavat "+(i+1)
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

    let br1,br2
    if(romuIlmoitus.length > 0){
      br1 = document.createElement("br")
      br2 = document.createElement("br")
          containerIlmoitus.appendChild(br1)
          containerIlmoitus.appendChild(br2)
        }else{
          if(br1 && br2){
            br1.remove()
            br2.remove()
          }
        }

}

function emptyInfo(){
  info = null
  showRomutettavat()
}

function emptyRomu(){
    info=null
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

function startPic(modeNumber){
  let container;
  if(modeNumber === 1){
    container = document.getElementById("pic-container1")
  }else{
    container = document.getElementById("pic-container2")
  }
  container.style.display = "flex"

}

function closePicModal(modeNumber){
  let container;
  if(modeNumber === 1){
    container = document.getElementById("pic-container1")
  }else{
    container = document.getElementById("pic-container2")
  }
  container.style.display = "none"
}

function dragoverHandler(ev) {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
    if (fileItems.some((item) => item.type.startsWith("image/"))) {
      e.dataTransfer.dropEffect = "copy";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  }
}

async function displayImages(files,modeNumber) {
  console.log("displayImages")
  let label, resultElement, object,img;
    if(modeNumber === 1){
    label =  document.getElementById("beforePicLabel1");
    resultElement = document.getElementById("serialNumberByPic1");
    img = document.getElementById("preview1");
  }else{
    label =  document.getElementById("beforePicLabel2");
    resultElement = document.getElementById("serialNumberByPic2");
    img = document.getElementById("preview2");
  }
  for (const file of files) {
    if (file.type.startsWith("image/")) {
      object = URL.createObjectURL(file)
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
    }
  }

  label.style.display="none"

  codeReader = new ZXing.BrowserMultiFormatReader();
  try {
    const result = await codeReader.decodeFromImageUrl(
      object
    );
    resultElement.textContent = result.getText();
  } catch (err) {
    resultElement.textContent = "Koodia ei löytynyt";
  }
  codeReader.reset()
  codeReader = null
}

function dropHandler(ev, modeNumber) {
 ev.preventDefault();
  const files = [...ev.dataTransfer.items]
    .map((item) => item.getAsFile())
    .filter((file) => file);
  displayImages(files,modeNumber)
}

async function loadPic(event,modeNumber){
  let img, label, resultElement;
  if(modeNumber === 1){
    label =  document.getElementById("beforePicLabel1");
    resultElement = document.getElementById("serialNumberByPic1");
    img = document.getElementById("preview1");
  }else{
    label =  document.getElementById("beforePicLabel2");
    resultElement = document.getElementById("serialNumberByPic2");
    img = document.getElementById("preview2");
  }
  

  label.style.display="none"
  const object = URL.createObjectURL(event.target.files[0]);
  img.src = object

  codeReader = new ZXing.BrowserMultiFormatReader();
  try {
    const result = await codeReader.decodeFromImageUrl(
      object
    );
    resultElement.textContent = result.getText();
  } catch (err) {
    resultElement.textContent = "Koodia ei löytynyt";
  }
  codeReader.reset()
  codeReader = null
}

function addNumberFromPic(modeNumber){
    if(modeNumber === 1){
            const valueText = document.getElementById("serialNumberByPic1").textContent
            document.getElementById("Mittarin_sarjanumero").value = valueText
     }else if(modeNumber === 2){
            const valueText = document.getElementById("serialNumberByPic2").textContent
            const romuIndex = romuId
            romuId++
            const alkio = {id:romuIndex, numero:valueText}
            romutettavat.push(alkio)
            showRomutettavat()
    }
}

function emptyPic(modeNumber){
    let preview, viewLabel;
    if(modeNumber === 1){
        preview = document.getElementById("preview1")
        viewLabel = document.getElementById("beforePicLabel1")
    }else{
        preview = document.getElementById("preview2")
        viewLabel = document.getElementById("beforePicLabel2")
    }
    preview.style.display = "none"
    viewLabel.style.display = "initial"
}
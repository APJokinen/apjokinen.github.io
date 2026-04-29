let codeReader = null;
let codeReaderArray = []
let track = null
let info = null
let torchExists = null
let torchOn =null
let romutettavat = []
let romuIlmoitus = []
let romuId= 0
let romuIlmoitusId = 0
let currentStream = null
const container = document.getElementById("video-container")
let controls = null
let zoomValue = 1.0
let stream = null
let zoomMax, zoomMin;
let loadPicResults

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

async function zoom(mode){
  console.log("zoom function start");
  const video = document.getElementById("video");
  const zoomFactor = document.getElementById("zoomValue")
  /*let zoomIcon = ""
  if(mode === "out"){
    zoomIcon = document.getElementById("zoomOut")
  }else if(mode === "in"){
    zoomIcon = document.getElementById("zoomIn")
  }*/
  
  

  const track = stream.getVideoTracks()[0];
  const capabilities = track.getCapabilities();

  console.log(track)
  console.log(capabilities)
  if(capabilities?.zoom){
      const step = 0.2

  if(mode === 'out'){
    if(zoomValue - step >= zoomMin){
    zoomValue -= step
    }
  }else if(mode === 'in'){
      if(zoomValue + step <= zoomMax){
      zoomValue += step
      }
  }else if(mode === 'max'){
    zoomValue = zoomMax
    
    
  }else if(mode === 'min'){
    zoomValue = zoomMin
  }
  zoomValue = Math.round((zoomValue * 10))/10
  zoomFactor.textContent = zoomValue + " X"
  await track.applyConstraints({
        advanced: [{ zoom: zoomValue}]
      });
      


    }else{
      console.log("Zoom ei mahdollista tällä laitteella")
    }

}



async function startCamera(modeNumber){
  if (controls) {
  controls.stop();
  controls = null;
  console.log("Vanha kamera suljettu");
}

if(codeReader){
  codeReader  =null
  console.log("codeReader suljettu")
}
  codeReader = new ZXingBrowser.BrowserMultiFormatReader();

  const previewElem = document.querySelector('video');
  
  /*const videoReady = new Promise(resolve => {
  video.onloadedmetadata = resolve;
});

  await videoReady*/
  const mediaStreamConstraints =  {
          video: {
          facingMode: { ideal: "environment" }
          }
          }
  
      

      try{
        controls = await codeReader.decodeFromConstraints(
         mediaStreamConstraints,
        previewElem, (result, error, cont) => {
        if(result){
          //console.log("✅ Data: " + result.text + "<br>📦 Tyyppi: " + result.barcodeFormat)
          
          if(modeNumber === 1){
            document.getElementById("Mittarin_sarjanumero").value = result.text

          }
          controls.stop()
          controls = null
          container.style.display = "none"
          document.body.classList.remove("modal-open")
        }

  

      
        
        
        /*if (err) {
          console.error(err);
        }*/
        
        
      });

      try{
        stream = await codeReader.getUserMedia(mediaStreamConstraints)
      }catch(e){
        console.error("Stream epäonnistui")
      }
      
      if(typeof controls.switchTorch === "function"){
          controls.switchTorch(true)
          torchOn = true
          document.getElementById("lightOff").style.display = "block"
          document.getElementById("lightOn").style.display = "none"
      }else{
          console.log("Taskulamppua ei löydy")
      }

      try{
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        if(capabilities?.zoom){
            zoomMax = capabilities?.zoom?.max
            document.getElementById("zoomMaxCode").textContent = "Max: "+zoomMax
            zoomMin = capabilities?.zoom?.min
            document.getElementById("zoomMinCode").textContent = "Min: " +zoomMin
        }
      }catch(e){
        console.error("Ei zoomia:",e) 
      }
      

      
      
      }catch(e){  
        console.error("Kameravirhe",e)
      }
      
      
      
      
      
    
}

async function lampButton(){
    if(controls?.switchTorch){
        torchOn = !torchOn
        await controls.switchTorch(torchOn)
        
      if(torchOn){
        document.getElementById("lightOff").style.display = "block"
        document.getElementById("lightOn").style.display = "none"
      }else{
        document.getElementById("lightOn").style.display = "block"
        document.getElementById("lightOff").style.display = "none"
      }
    }
}

async function startScanner(modeNumber) {
      
      container.style.display = "flex"
      document.body.classList.add("modal-open")
      
      await startCamera(modeNumber)
      
    }

async function stopScanner() {
  
  if(controls){
    controls.stop()
    controls = null
  }

  if(codeReader){
  codeReader  =null
  }

  if(stream){
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  }

  /*if (codeReader?.stream) {
      codeReader.stream.getTracks().forEach(t => t.stop());
      console.log("Streameja suljettu modaalia suljettaessa")
    }

   if (codeReader) {
        await codeReader.reset();
        codeReader = null
        //document.getElementById('result').innerHTML = "⏹️ Skannaus pysäytetty";
      }

      if(track){
      try{
        await track.applyConstraints({
        advanced: [{ torch: false }]
      });
      }catch(e){
        console.log("Taskulampun sulku:",e)
      }

      track = null
       }*/


      container.style.display = "none"
      document.body.classList.remove("modal-open")
     
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
   const lisatiedot = document.getElementById("infoAreaRomu").value
    const alkio = {id:romuIlmoitusId, lista: romutettavat, tiedot: lisatiedot}
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
        divText += "<br/><br/>"
        if(lisatiedot){
            divText += "<label class='systemBold'>Lisätiedot: </label><br/>"
            divText += "<label>"+lisatiedot+"</label><br/>"
        }
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
  document.body.classList.add("modal-open")

}

function closePicModal(modeNumber){
  let container;
  if(modeNumber === 1){
    container = document.getElementById("pic-container1")
  }else{
    container = document.getElementById("pic-container2")
  }
  container.style.display = "none"
  document.body.classList.remove("modal-open")
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
      label.style.display="none"
      object = URL.createObjectURL(file)
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
    }
  }

  

  codeReader = new ZXingBrowser.BrowserMultiFormatReader();
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
  let img, label, resultElement1, resultElement2;
  loadPicResults = {Tesseract : null, Zxing:null}
  if(modeNumber === 1){
    label =  document.getElementById("beforePicLabel1");
    resultElement1 = document.getElementById("serialNumberByPic1");
    resultElement2 = document.getElementById("serialNumberByPic2");
    img = document.getElementById("preview1");
  }

  const input = document.getElementById("imgInput1");

  const ZXingDiv = document.getElementById("serialNumberByPicZXing")
  const TesseractDiv = document.getElementById("serialNumberByPicTesseract")
  const noNumberDiv = document.getElementById("noSerialNumberByPic")
  //img.style.maxWidth = "400px"
  //img.style.maxHeight = "400px" 

  
  const object = URL.createObjectURL(event.target.files[0]);
  img.src = object

  img.style.display ="initial"
  label.style.display="none"

  codeReader = new ZXingBrowser.BrowserMultiFormatReader();
  try {
    console.log("URL",object)
    const result = await codeReader.decodeFromImageUrl(
      object
    );
    
    //resultElement.textContent = "Koodin tunnistus: " + result.getText();
    loadPicResults.ZXing = result.getText()
  } catch (err) {
    console.error("Kuvan luku:",err)
  }
  codeReader = null

  //OCR-lukeminen (tesseract)
  const { createWorker } = Tesseract;

  const worker = await createWorker();
  await worker.setParameters({
          tessedit_char_whitelist: '0123456789',
        });

 
  const { data: { text } } = await worker.recognize(object);
  loadPicResults.Tesseract = text
  console.log(text)
  await worker.terminate();

  if(!loadPicResults){
      noNumberDiv.style.display = "block"
      ZXingDiv.style.display ="none"
      TesseractDiv.style.display = "none"
  }else if(loadPicResults.ZXing && loadPicResults.Tesseract){
    noNumberDiv.style.display = "none"
      resultElement1.textContent = "Koodintunnistus: "+loadPicResults.ZXing
      resultElement2.textContent = "Tekstitunnistus: "+loadPicResults.Tesseract
      ZXingDiv.style.display ="block"
      TesseractDiv.style.display = "block"
    }else if(loadPicResults.ZXing){
      noNumberDiv.style.display = "none"
      resultElement1.textContent = "Koodintunnistus: "+loadPicResults.ZXing
      resultElement2.textContent = null
      ZXingDiv.style.display ="block"
      TesseractDiv.style.display = "none"
    }else{
      noNumberDiv.style.display = "none"
      resultElement1.textContent = null
      resultElement2.textContent = "Tekstitunnistus: "+loadPicResults.Tesseract
      ZXingDiv.style.display ="none"
      TesseractDiv.style.display = "block"
    }

    //event.target.value = "";
    input.textContent = object
}

function addNumberFromPic(modeNumber){
    if(modeNumber === 1){
            const valueText = loadPicResults?.ZXing
            if(valueText){
              document.getElementById("Mittarin_sarjanumero").value = valueText
            }
            
     }else if(modeNumber === 2){
            const valueText = loadPicResults?.Tesseract
            if(valueText){
              document.getElementById("Mittarin_sarjanumero").value = valueText
            }
    }
}

function emptyPic(modeNumber){
    let preview, viewLabel, serialNumber, imgInput;
    if(modeNumber === 1){
        serialNumber = document.getElementById("serialNumberByPic1")
        preview = document.getElementById("preview1")
        viewLabel = document.getElementById("beforePicLabel1")
        imgInput = document.getElementById("imgInput1")
    }else{
        serialNumber = document.getElementById("serialNumberByPic2")
        preview = document.getElementById("preview2")
        viewLabel = document.getElementById("beforePicLabel2")
        imgInput = document.getElementById("imgInput2")
    }
    preview.style.display = "none"
    viewLabel.style.display = "initial"
    serialNumber.textContent = null
    imgInput.value = null

    document.getElementById("noSerialNumberByPic").style.display = "none"
    document.getElementById("serialNumberByPicZXing").style.display = "none"
    document.getElementById("serialNumberByPicTesseract").style.display = "none"
}

async function changeToNumberCamera(){
  await stopScanner()
  await startOcrScanner()
}
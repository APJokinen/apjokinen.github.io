const container = document.getElementById("CameraModalCode")
const targetInput = document.getElementById("targetInput")
let controls = null
let zoomValue = 1.0
let stream = null
let zoomMax, zoomMin;
let torchOn =null
let torchExists = null
let zoomExists = null
let codeReader
let acceptOrDeny = false
let resultValue = null

function emptyTargetInput(){
    document.getElementById("targetInput").value = null
}

async function StartCodeScan() {
      
      container.style.display = "flex"
      document.body.classList.add("modal-open")
      window.removeEventListener("dragover", dragOverExists);
      await startCamera()
      
    }

async function startCamera(){
  if(stream){
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  }
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

  const previewElem = document.getElementById("videoCode")
  
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
        if(result && !acceptOrDeny){
          //console.log("✅ Data: " + result.text + "<br>📦 Tyyppi: " + result.barcodeFormat)
          acceptOrDeny = true
          console.log(result.text)
          container.querySelector(".videoWhite").style.display = "flex"
          const number = document.getElementById("codeSerialNumber")
          resultValue = result.text
          number.textContent = "Sarjanumero: "+result.text
          document.querySelectorAll(".frame span").forEach((fr,index) => {
            fr.style.borderColor = "red"
          })
          
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
          torchExists = true
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
            zoomExists = true
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

  if(zoomExists){
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

async function lampButton(){
    if(torchExists){
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

  document.querySelectorAll(".frame span").forEach((fr,index) => {
            fr.style.borderColor = "white"
  })

      container.style.display = "none"
      document.body.classList.remove("modal-open")
      window.addEventListener("dragover", dragOverExists);
     
}

async function changeToNumberCamera(){
  await stopScanner()
  await StartOcrScan()
}

function addCodeNumberToFront(){
  targetInput.value = resultValue
  resultValue = null
  acceptOrDeny = false
  container.querySelector(".videoWhite").style.display = "none"
  document.querySelectorAll(".frame span").forEach((fr,index) => {
    fr.style.borderColor = "white"
  })

}

function rejectCodeNumber(){
    resultValue = null
    container.querySelector(".videoWhite").style.display = "none"
    acceptOrDeny = false
    document.querySelectorAll(".frame span").forEach((fr,index) => {
        fr.style.borderColor = "white"
    })
}


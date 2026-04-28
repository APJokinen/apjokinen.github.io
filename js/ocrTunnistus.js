let isProcessing = false
let intervalOn = null
let OcrStream = null
let ocrSerialNumber;
let ocrZoomMin, ocrZoomMax
let worker
const output = document.getElementById('Mittarin_sarjanumero');
const OcrVideo = document.getElementById('ocr-video')
const OcrContainer = document.getElementById("ocr-container")
const { createWorker, createScheduler } = Tesseract;


async function startOcrScanner(){
    //scheduler = createScheduler();
    OcrContainer.style.display = "flex"

    try {
        OcrStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } }
        });
    
  } catch (err) {
    OcrStream = await navigator.mediaDevices.getUserMedia({
    video: true
  });
  }

    try{
        OcrVideo.srcObject = OcrStream;
    }catch(e){
        console.error(e)
    }

    const track = OcrStream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();
    if(capabilities?.zoom){
        ocrZoomMin = capabilities?.zoom?.min
        ocrZoomMax = capabilities?.zoom?.max
        document.getElementById("zoomMinCodeOcr").textContent = "Min: "+ocrZoomMin
        document.getElementById("zoomMaxCodeOcr").textContent  = "Max: "+ocrZoomMax
    }

    if(capabilities?.torch){
        await new Promise(resolve => {
            if (OcrVideo.readyState >= 2) return resolve();
            OcrVideo.onloadeddata = resolve;
        });
        torchOn = true
        await track.applyConstraints({
             advanced: [{ torch: true }]
        });
        document.getElementById("lightOffOcr").style.display = "block"
        document.getElementById("lightOnOcr").style.display = "none"
    }

    

        worker = await createWorker();
        await worker.setParameters({
          tessedit_char_whitelist: '0123456789',
        });


}

async function oneOcr() {
        console.log("Yksi freimi")
        const debug = document.getElementById("ocr-test")
        debug.textContent = "Analysoidaan..."
        if(isProcessing) return
        isProcessing = true
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext('2d')

        if (!OcrVideo.videoWidth || !OcrVideo.videoHeight) {
        console.log("Video ei ole valmis vielä");
        return;
    }

        const vw = OcrVideo.videoWidth;
        const vh = OcrVideo.videoHeight;

        const cropW = vw * 0.6;
        const cropH = vh * 0.35;

        const sx = (vw - cropW) / 2;
        const sy = (vh - cropH) / 2;

        canvas.width = cropW;
        canvas.height = cropH;

        ctx.drawImage(OcrVideo, sx, sy, cropW, cropH, 0, 0, cropW, cropH);
        
        //const blob = await new Promise(resolve => canvas.toBlob(resolve));

        console.log(OcrVideo.readyState);
        console.log(OcrVideo.videoWidth, OcrVideo.videoHeight);
        console.log(canvas.width, canvas.height);


        /*if (!blob) {
        console.log("Blob epäonnistui");
        return;
        }*/

        const { data: { text } } = await worker.recognize(canvas);
        if(text){
            ocrSerialNumber = text
            document.getElementById("ocrButton").style.display = "block"
            debug.textContent = "Sarjanumero: "+text
        }else{
            console.log("Ei tulosta")
            debug.textContent = "Ei sarjanumeroa"
        }
        console.log("Yksi freimi loppui")
        isProcessing=false
}


async function stopOcrScan(){
    console.log("stoppi")
    if(intervalOn){
        clearInterval(intervalOn)
    }
    worker.terminate()
    /*if(workerArray > 0){
        for(w of workerArray){
            w.terminate()
        }
    }*/
    if(OcrStream){
    const tracks = OcrStream.getTracks();
    tracks.forEach(track => track.stop());
    }
    OcrVideo.srcObject = null;
    OcrContainer.style.display = "none"
}

async function takePicture(){
    await oneOcr()
}

async function lampButtonOcr(){
    const track = OcrStream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();
    if(capabilities?.torch){
        torchOn = !torchOn
        await track.applyConstraints({
             advanced: [{ torch: torchOn }]
        });
        
      if(torchOn){
        document.getElementById("lightOffOcr").style.display = "block"
        document.getElementById("lightOnOcr").style.display = "none"
      }else{
        document.getElementById("lightOnOcr").style.display = "block"
        document.getElementById("lightOffOcr").style.display = "none"
      }
    }
}

async function zoomOcr(mode){
    const zoomFactor = document.getElementById("zoomValueOcr")
    const track = OcrStream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();

    if(capabilities?.zoom){
      const step = 0.2

  if(mode === 'out'){
    if(zoomValue - step >= zoomMin){
    zoomValue -= step
      }else{
        return
      }
  }else if(mode === 'in'){
      if(zoomValue + step <= zoomMax){
      zoomValue += step
      }else{
        return
      }
  }else if(mode === 'min'){
    if(zoomValue > ocrZoomMin){
        zoomValue = ocrZoomMin
    }else{
        return
    }
    
  }else if(mode === 'max'){
    if(zoomValue < ocrZoomMax){
        zoomValue = ocrZoomMax
    }else{
        return
    }
    
  }
    zoomValue = Math.round((zoomValue * 10))/10
      zoomFactor.textContent = zoomValue + " X"
      await track.applyConstraints({
        advanced: [{ zoom: zoomValue }]
      });

    }else{
      console.log("Zoom ei mahdollista tällä laitteella")
    }
}

function ocrSerialNumberToForm(){
    document.getElementById("Mittarin_sarjanumero").textContent = ocrSerialNumber
}
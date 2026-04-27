let isProcessing = false
let intervalOn = null
let OcrStream = null
const output = document.getElementById('Mittarin_sarjanumero');
const OcrVideo = document.getElementById('ocr-video');
const OcrContainer = document.getElementById("ocr-container")
const { createWorker, createScheduler } = Tesseract;
const scheduler = createScheduler();

async function startOcrScanner(){
    
    OcrContainer.style.display = "flex"

    try {
    OcrStream = await navigator.mediaDevices.getUserMedia({ video:{
          facingMode: { ideal: "environment" }
          } });
    OcrVideo.srcObject = OcrStream;
  } catch (err) {
    console.error(err);
  }

    for (let i = 0; i < 4; i++) {
        const worker = await Tesseract.createWorker('fin')
        scheduler.addWorker(worker);
      }

    
    const oneOcr = async() => {
        console.log("Yksi freimi")
        const debug = document.getElementById("ocr-test")
        if(isProcessing) return
        isProcessing = true
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d')

        ctx.drawImage(OcrVideo, 0, 0, canvas.width, canvas.height);


        const { data: { text } } = await scheduler.addJob('recognize', canvas);
        if(text){
            console.log("Tulos:",text)
            debug.textContent = text
            await stopOcrScan()
        }else{
            console.log("Ei tulosta")
            debug.textContent = "Ei tulosta"
        }
        isProcessing = false
    }
    intervalOn = setInterval(oneOcr,1000)
}


async function stopOcrScan(){
    console.log("stoppi")
    if(intervalOn){
        clearInterval(intervalOn)
    }
    if(OcrStream){
    const tracks = OcrStream.getTracks();
    tracks.forEach(track => track.stop());
    }
    OcrVideo.srcObject = null;
    OcrContainer.style.display = "none"
}


let isProcessing = false
let intervalOn = null
const output = document.getElementById('Mittarin_sarjanumero');
const OcrVideo = document.getElementById('ocr-video');
const OcrContainer = document.getElementById("ocr-container")
const { createWorker, createScheduler } = Tesseract;
const scheduler = createScheduler();

async function startOcrScanner(){
    
    OcrContainer.style.display = "flex"

    try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    OcrVideo.srcObject = stream;
  } catch (err) {
    console.error(err);
  }

    for (let i = 0; i < 4; i++) {
        const worker = await Tesseract.createWorker('fin')
        scheduler.addWorker(worker);
      }

    
    const oneOcr = async() => {
        console.log("Yksi frame")
        if(isProcessing) return
        isProcessing = true
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d')

        ctx.drawImage(OcrVideo, 0, 0, canvas.width, canvas.height);


        const { data: { text } } = await scheduler.addJob('recognize', canvas);
        console.log(text)
        isProcessing = false
    }
    intervalOn = setInterval(oneOcr,1000)
}


async function stopOcrScan(){
    console.log("stoppi")
    if(intervalOn){
        clearInterval(intervalOn)
    }
    if(stream){
    const stream = OcrVideo.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    }
    video.srcObject = null;
    OcrContainer.style.display = "none"
}


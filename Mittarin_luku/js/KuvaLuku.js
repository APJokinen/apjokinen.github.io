

function dragOverExists(e){
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
}

window.addEventListener("dragover", dragOverExists);




const dropZone = document.getElementById("picDropZone")
const picContainer = document.getElementById("PictureModal")
const ZXingDiv = document.getElementById("serialNumberByPicZXing")
  const TesseractDiv = document.getElementById("serialNumberByPicTesseract")
  const noNumberDiv = document.getElementById("noSerialNumberByPic")
  const resultElement1 = document.getElementById("serialNumberByPic1");
    const resultElement2 = document.getElementById("serialNumberByPic2");

  //const { createWorker } = Tesseract;
  let tessWorker
  let tesseractResult
  let ZXingResult

  const codeReaderPic = new ZXingBrowser.BrowserMultiFormatReader();
  const img = document.getElementById("PicPreview");
  const analyzeDiv = document.getElementById("waitingPicAnalyze")
  img.crossOrigin = "anonymous";


  img.onload = async () => {

    analyzeDiv.style.display = "block"
  tesseractResult = null;
  ZXingResult = null;

  try {
    const zx = await codeReaderPic.decodeFromImageElement(img);
    console.log("zx:",zx)
    ZXingResult = zx.getText();
  } catch (e) {
    console.error(e);
  }

  try {
    const tess = await tessWorker.recognize(img);
    console.log("tess:",tess)
    tesseractResult = tess.data?.text || tess.text;
  } catch (e) {
    console.error(e);
  }

  showResults(ZXingResult, tesseractResult);
};



let loadPicResults = null


async function StartPicModal(){
    picContainer.style.display = "flex"
    tessWorker = await createWorker()
    await tessWorker.setParameters({
          tessedit_char_whitelist: '0123456789'
    });
}

async function ClosePicModal(){
    picContainer.style.display = "none"
    if(tessWorker){
      tessWorker.terminate()
      tessWorker = null
    }
}



async function loadPic(event,modeNumber){
  let img, label, resultElement1, resultElement2;
    label =  document.getElementById("beforePicLabel1");
    resultElement1 = document.getElementById("serialNumberByPic1");
    resultElement2 = document.getElementById("serialNumberByPic2");
    img = document.getElementById("PicPreview");


  const input = document.getElementById("imgInput1");
  displayImage(event.target.files[0])
  
  //img.style.maxWidth = "400px"
  //img.style.maxHeight = "400px" 

  
  /*const object = URL.createObjectURL(event.target.files[0]);
  img.src = object

  img.style.display ="initial"
  label.style.display="none"
    analyzePic(object)*/


  
}

function addNumberFromPic(modeNumber){
    if(modeNumber === 1){
            const valueText = loadPicResults?.Zxing
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

function dropHandler(ev, modeNumber) {
  console.log("dropHandler")
 ev.preventDefault();
  const files = [...ev.dataTransfer.items]
    .map((item) => item.getAsFile())
    .filter((file) => file);
  /*displayImages(files,modeNumber)
  checkImages(files)*/
  //loadPic(ev,1)
  displayImage(files[0])

}

async function displayImage(file) {
  console.log("displayImage")
  //let label, resultElement, object,img;

  img.style.display = "block"
  const label =  document.getElementById("beforePicLabel1");
    if (file?.type?.startsWith("image/")) {
      label.style.display="none"
      object = URL.createObjectURL(file)
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
    }
}

/*
async function analyzePic(file){
    console.log("File:",file)
    loadPicResults = {Tesseract : null, Zxing:null}

    const label =  document.getElementById("beforePicLabel1");
    const resultElement1 = document.getElementById("serialNumberByPic1");
    const resultElement2 = document.getElementById("serialNumberByPic2");
   
    const input = document.getElementById("imgInput1");
    const analyzeDiv = document.getElementById("waitingPicAnalyze")

    analyzeDiv.style.display = "block"
    
  try {
    const result = await codeReader.decodeFromImageUrl(
      file
    );
    
    //resultElement.textContent = "Koodin tunnistus: " + result.getText();
    loadPicResults.Zxing = result.getText()
  } catch (err) {
    console.error("Kuvan luku (ZXing):",err)
  }
  codeReader = null

  //OCR-lukeminen (tesseract)

  const { createWorker } = Tesseract;

  const worker = await createWorker();
  await worker.setParameters({
          tessedit_char_whitelist: '0123456789',
          tessedit_pageseg_mode: 13,
        });

        
  try{
    const { data: { text } } = await worker.recognize(file);
    if(text.length < 20){
      loadPicResults.Tesseract = text
      console.log(text)
    }else{
      console.log("Tunnistettu teksti liian pitkä")
    }
  }catch(e){
    console.error("Kuvan luku (Tesseract):",e)
  }
  
  await worker.terminate();
  analyzeDiv.style.display = "none"
  if(!loadPicResults.Tesseract && !loadPicResults.Zxing){
      noNumberDiv.style.display = "block"
      ZXingDiv.style.display ="none"
      TesseractDiv.style.display = "none"
  }else if(loadPicResults.Zxing && loadPicResults.Tesseract){
    noNumberDiv.style.display = "none"
      resultElement1.textContent = "Koodintunnistus: "+loadPicResults.Zxing
      resultElement2.textContent = "Tekstitunnistus: "+loadPicResults.Tesseract
      ZXingDiv.style.display ="block"
      TesseractDiv.style.display = "block"
    }else if(loadPicResults.Zxing){
      noNumberDiv.style.display = "none"
      resultElement1.textContent = "Koodintunnistus: "+loadPicResults.Zxing
      resultElement2.textContent = null
      ZXingDiv.style.display ="block"
      TesseractDiv.style.display = "none"
    }else if(loadPicResults.Tesseract){
      noNumberDiv.style.display = "none"
      resultElement1.textContent = null
      resultElement2.textContent = "Tekstitunnistus: "+loadPicResults.Tesseract
      ZXingDiv.style.display ="none"
      TesseractDiv.style.display = "block"
    }

    //event.target.value = "";
    try{
      input.textContent = file
    }catch(e){
      console.error("Tiedostonimeä ei löydy")
    }
    
}*/

function showResults(ZXingResult, tesseractResult){
  analyzeDiv.style.display = "none"
  if(!ZXingResult && !tesseractResult){
      noNumberDiv.style.display = "block"
      ZXingDiv.style.display ="none"
      TesseractDiv.style.display = "none"
  }else if(ZXingResult && tesseractResult){
    noNumberDiv.style.display = "none"
      resultElement1.textContent = "Koodintunnistus: "+ZXingResult
      resultElement2.textContent = "Tekstitunnistus: "+tesseractResult
      ZXingDiv.style.display ="block"
      TesseractDiv.style.display = "block"
    }else if(ZXingResult){
      noNumberDiv.style.display = "none"
      resultElement1.textContent = "Koodintunnistus: "+ZXingResult
      resultElement2.textContent = null
      ZXingDiv.style.display ="block"
      TesseractDiv.style.display = "none"
    }else if(tesseractResult){
      noNumberDiv.style.display = "none"
      resultElement1.textContent = null
      resultElement2.textContent = "Tekstitunnistus: "+tesseractResult
      ZXingDiv.style.display ="none"
      TesseractDiv.style.display = "block"
    }
}

function emptyPic(){
        const serialNumber1 = document.getElementById("serialNumberByPic1")
        const serialNumber2 = document.getElementById("serialNumberByPic2")
        const preview = document.getElementById("PicPreview")
        const viewLabel = document.getElementById("beforePicLabel1")
        const imgInput = document.getElementById("imgInput1")
    preview.style.display = "none"
    viewLabel.style.display = "initial"
    serialNumber1.textContent = null
    serialNumber2.textContent = null
    imgInput.value = null

    document.getElementById("noSerialNumberByPic").style.display = "none"
    document.getElementById("serialNumberByPicZXing").style.display = "none"
    document.getElementById("serialNumberByPicTesseract").style.display = "none"
}

function addSerialToFront(modeNumber){
    if(modeNumber === 1){
        document.getElementById("targetInput").value = ZXingResult
    }else if(modeNumber === 2){
        document.getElementById("targetInput").value = tesseractResult
    }

    const div = document.getElementById("picInfoDiv")
    div.style.display = "flex"

    setTimeout(() => {div.style.display = "none"},3500)
    
}
let codeReader = null;
const container = document.getElementById("video-container1")

function startScanner1() {
      
      container.style.display = "block"
      codeReader = new ZXing.BrowserMultiFormatReader();

      codeReader.decodeFromVideoDevice(null, 'video1', (result, err) => {
        if (result) {
          //console.log("✅ Data: " + result.text + "<br>📦 Tyyppi: " + result.barcodeFormat)
          document.getElementById("Mittarin sarjanumero").value = result.text
          stopScanner1()
        }

        if (err && !(err instanceof ZXing.NotFoundException)) {
          console.error(err);
        }
      });
    }

function stopScanner1() {
  container.style.display = "none"
      if (codeReader) {
        codeReader.reset();
        codeReader = null
        //document.getElementById('result').innerHTML = "⏹️ Skannaus pysäytetty";
      }
    }
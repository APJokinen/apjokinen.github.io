let codeReader = null;

function startScanner() {
      codeReader = new ZXing.BrowserMultiFormatReader();

      codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
        if (result) {
          console.log("✅ Data: " + result.text + "<br>📦 Tyyppi: " + result.barcodeFormat)
        }

        if (err && !(err instanceof ZXing.NotFoundException)) {
          console.error(err);
        }
      });
    }

function stopScanner() {
      if (codeReader) {
        codeReader.reset();
        //document.getElementById('result').innerHTML = "⏹️ Skannaus pysäytetty";
      }
    }


function checkbox1(){
if(document.getElementById("Yritys").checked === true){
    document.getElementById("check1").style.display ="initial"
    document.getElementById("check2").style.display ="initial"
}else{
    document.getElementById("check1").style.display ="none"
    document.getElementById("check2").style.display ="none"
}
}

function checkbox2(){
if(document.getElementById("Yhteyshenkilö").checked === true){
    document.getElementById("check3").style.display ="initial"
    document.getElementById("check4").style.display ="initial"
}else{
    document.getElementById("check3").style.display ="none"
    document.getElementById("check4").style.display ="none"
}
}

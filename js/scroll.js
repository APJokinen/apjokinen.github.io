let scrollX = null
let scrollY = null

const raja = 600

function getScroll(){
    if(window.innerWidth < raja){
        scrollX = window.scrollX
    scrollY = window.scrollY
    }
    
}

function setScroll1(){
    if(window.innerWidth < raja){
    window.scrollTo(scrollX,scrollY)
    }
}

function setScroll2(){
    if(window.innerWidth < raja){
    document.body.style.top = `-${scrollY}px`
   document.body.style.left = `-${scrollX}px`
    }
}
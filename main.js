"use strict"
var global = {//aqui é onde vou guardar as variáves ou constantes mais importantes


};

var APP = {
    "online":false,
    "version":"03-2026", 
    "tela":{
        "atual":"MAthMolho",
        "anterior":"",
        set(array){
            APP.anterior = APP.tela.atual;
            APP.tela.atual = array;
        },
        back(){
            if(APP.tela.anterior !== ""){
                APP.tela.atual = APP.tela.anterior;
                APP.tela.anterior = ""

            }
        }
    }
}

let drawPage = false;
fetch("https://raw.githubusercontent.com/hr14-a/MathMolho/refs/heads/main/status.json").then(a => a.json())
.then(function(a) {
    if(a.status == "online"){
        APP.online = true
    }
    drawPage = true;


})

function MAIN()
{
    resizer();
    try {
        if(drawPage){

            if(APP.online){
    
                eval(APP.tela.atual+"();")
            }else{
                rect(0,0,innerWidth,innerHeight,"blue")
                text(30,30,"Site fora de ar! fale com Heytor ","white",20)
            }
        }
    }catch{
        
    }
    
    tecladoNU.main()
    text(20,innerHeight-20,"v"+APP.version + " Ⓡ T0M4T3 :|","black",10);
    loop(MAIN);
}
MAIN();

"use strict"
var global = {//aqui é onde vou guardar as variáves ou constantes mais importantes


};
var APP = {
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


function MAIN()
{
    resizer();
    try {
        eval(APP.tela.atual+"();")
    }catch{
        
    }
    
    tecladoNU.main()
    text(20,innerHeight-20,"v"+APP.version + " Ⓡ T0M4T3","black",12);
    loop(MAIN);
}
MAIN();

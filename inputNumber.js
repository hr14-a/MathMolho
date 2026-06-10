var NumberInputs = {}
function novoNI(code,enterF, cor){
    NumberInputs[code] = {
            value : "",
            code : code,
            enterF : enterF || function(){},
        }
}
        
function NumberInput(code,x,y,w,h,enterF, cor){
    if(NumberInputs[code] == undefined){
        novoNI(code,enterF)
    }else{
        rect(x,y,w,h,"#d3d0d0ff");
        if(NumberInputs[code].value !== ""){

            text(x+5,y+h/2+(h*0.2),NumberInputs[code].value,"#464444ff",h/1.5)
        }else{
            text(x+5,y+h/2+(h*0.2),modos[modoAtual],"#929292ff",h/1.5)
       
        }
        
    }
    button(x,y,w,h,function(){
       tecladoNU.block(code, cor)
       NumberInputs[code].value = ""
    },"transparent")
    return true;
}

const UmaAtcv = 530;
let maiorTextoWidth = 0;
    var insumos = [
        {
            "cor":"#bb6666",
            "produto":"Polpa de tomate",
            "valor":70,
            "medida":"Kg",   
            
            
        },
        {
            "cor":"#666ebb",
            "produto":"Água",
            "valor":426.6,
            "medida":"L", 
        },
        {
            "cor":"#a766bb",
            "produto":"Cebola em pó",
            "valor":3.7,
            "medida":"Kg",
            

        },
        {
            "cor":"#a8bb66",
            "produto":"Sal",
            "valor":6.3,
            "medida":"Kg",
           
            
        },
        {
            "cor":"#6684bb",
            "produto":"Òleo",
            "valor":13.7,
            "medida":"L",
            
            
        },
        {
            "cor":"#bb6695",
            "produto":"Allho em pó",
            "valor":1,
            "medida":"Kg",
            
            
        },
        {
            "cor":"#bb6678",
            "produto":"GMS",
            "valor":2,
            "medida":"Kg",
            
            
        },
        {
            "cor":"#96bb66",
            "produto":"Salsa",
            "valor":270,
            "valor2": 800,
            "medida":"G",
            
            
        },
        {
            "cor":"#bb66a8",
            "produto":"açúcar",
            "valor":7,
            "medida":"kg",
            
            
        },
    ]

let ingredientes = []
let volumeDosIngredientes = 0;
let outpuList = [];


function CODEX(latas){
        if (latas < 4800){
            return 6;
        }
        if(latas >= 4800 && latas <= 24000){

            return 13;
        }
        if(latas >= 24001 && latas <= 48000){

            return 21;
        }
        if(latas >= 48001 && latas <= 84000){
            return 29;

        }
        if(latas >= 84001 && latas <= 144000){

            return 48;
        }
        if(latas >= 144001 && latas <= 240000){

            return 84;
        }
        if(latas > 24000){

            return 126;
        }
    
}
function calcularInsumos(n){
        outpuList=[]//zerar lista
        const latas = n;//latas de entrada
        const value = Math.abs(Number(n*0.041))//volume do liquido
        let autoclavas = value/UmaAtcv//definir autoclavas

        autoclavas = Number(autoclavas.toFixed(1))//simplificar autoclavas

        //arredonadar autoclavas
        let autoclavasUsada = 0;
        switch(true){
            case autoclavas > (Math.floor(autoclavas)) + 0.5:
                autoclavasUsada = Math.floor(autoclavas)+1
                break;
            case autoclavas > (Math.floor(autoclavas))+0.1:
                autoclavasUsada = Math.floor(autoclavas)+0.5
                break;
            default: 
                autoclavasUsada = Math.floor(autoclavas)
                break;
        }
        // if(autoclavas > (Math.floor(autoclavas)) + 0.5){
        //     autoclavasUsada = Math.floor(autoclavas)+1
        // }else if (autoclavas > (Math.floor(autoclavas))+0.1){
        //     autoclavasUsada = Math.floor(autoclavas)+0.5
        // }else{
        //     autoclavasUsada = Math.floor(autoclavas)
        // }
        autoclavasUsada = min(autoclavasUsada,1)
        
        
       
       outpuList.push(["* autoclavasREAIS : "+ autoclavas,"#949393ff"])
       outpuList.push(["* autoclavasARREDONDADAS : "+ autoclavasUsada,"#949393ff"]);
        outpuList.push(["________________________________________________"])
        outpuList.push([""])
        for(let x in insumos){
            let me = insumos[x]
            let texto;
            if(me.produto.toUpperCase() !== "SALSA"){
                texto = ""+me.produto +" |  " + (me.valor*autoclavasUsada).toFixed(1)+" "+me.medida
                ingredientes.push((me.valor*autoclavasUsada).toFixed(1))
            }else{
                let salsaNN = (Math.floor(autoclavasUsada/3) * me.valor2)
                salsaNN += ((autoclavasUsada%3) * me.valor);
                texto = ""+me.produto +" |  " + (salsaNN).toFixed(1)+" "+me.medida
                ingredientes.push((salsaNN).toFixed(1))
            }
            if(texto.length > maiorTextoWidth){
                maiorTextoWidth =  texto.length

            }
             outpuList.push([texto,"white",me.cor ?? "red"])
        }
        outpuList.push(["________________________________________________"])
        outpuList.push([""])
        
       outpuList.push(["latas: "+ Math.floor(latas) + " Lts","#949393ff"])
       outpuList.push(["volume do líquido: "+ Math.floor(latas*0.041) + " Liq","#949393ff"])
       outpuList.push(["pacotes: "+ Math.floor((latas)/24) + " Pcts","#949393ff"])
       outpuList.push(["CODEX : "+ CODEX(latas),"#949393ff"])    
}
var modoAtual = 0;
const modos = [
    "quantidade de latas",
    "quantidade do volume/liquido",
    "quantidade de pacotes"
];
const corDeModo = [
    "#66bb6a",
    "#6673bb",
    "#bb6666",
]
//outpuList.push(["teste de fonte"])
//outpuList.push(["teste de distancia da lista"])
function MAthMolho(){
    background("white")
    button(10,40,30,30,function(){
        tecladoNU.destroy()
        outpuList= []
        modoAtual++;
        if(modoAtual > 2){
            modoAtual =0;
        }
        NumberInputs["latas"].value = ""
    },corDeModo[modoAtual],)

    f = min(max(innerWidth*0.06,18),10)
    text(10+6.5,63.5,modos[modoAtual].split(" ")[2].toUpperCase()[0],"white", 25)
    text(10,30,"INSUMOS ("+(modos[modoAtual].toUpperCase().split(" ")[2])+")","black",f)//title
NumberInput("latas",45,40,innerWidth-55,30,function(value){
    value = Number(value)
    outpuList = []
    outpuList.push(["calculando..."])
    setTimeout(function(){
        if(modoAtual == 0){
            calcularInsumos(value)//latas
        }
        if(modoAtual == 1){
            calcularInsumos(value/0.041)//liquido
        }
        if(modoAtual == 2){
            calcularInsumos(value*24)//pacotes
        }
        
    },700)
}, corDeModo[modoAtual])
f = min(max(innerHeight * 0.025,20),10)//fonte


//text(200,20,f,"yellow",20)
for(let i in outpuList){
    const texto = outpuList[i][0];
    const backgroundColor =  outpuList[i][2] ?? "transparent"
    const colorText = outpuList[i][1] ?? "black";

    if(backgroundColor !== "transparent"){
        let w =  maiorTextoWidth*f/2
        rect(10,120+((f*1.2)*i-f),w,f*1.2,backgroundColor)
        ctx.strokeRect(10,120+((f*1.2)*i-f),w,f*1.2)
        ctx.stroke()
    }
    text(10,120+((f*1.2)*i)-1,texto,colorText,f)
}

}
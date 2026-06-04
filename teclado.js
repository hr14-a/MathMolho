const context = new AudioContext();

function PLAY(n = 1){
    oscillator = context.createOscillator();
    //Create a periodic waveform

            //Select a waveform type (sine, triangle,...)
            oscillator.type = "sine";

            //Select a frequency
            oscillator.frequency.value = 300+(n*25);

            //Create volume
            const gainNode = context.createGain();
            //Set the duration
            gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.78);
            
            //Connect our audiosource(oscillator) with the volume
            oscillator.connect(gainNode);
            //Connect inputgain with the output (Speakers)
            gainNode.connect(context.destination);
            
            oscillator.start(0);
}
var tecladoNU = {
    NumberInput:"",
    x: 0,
    y: 0,
    show: false,
    matriz:[
        "1","2","3","0",
        "4","5","6","<",
        "7","8","9",">"

    ],
    cor: "white",
    
    block(NumberInputCode, cor){
        tecladoNU.NumberInput = NumberInputCode;
        tecladoNU.show = true;
        this.cor = cor
    },
    destroy(){
        tecladoNU.show=false;
    },
    draw(){
        tecladoNU.w = innerWidth;
        tecladoNU.h = innerHeight/2.5
        tecladoNU.x = 0
        tecladoNU.y = innerHeight - tecladoNU.h
        rect(tecladoNU.x,tecladoNU.y,tecladoNU.w,tecladoNU.h,this.cor)
        rect(tecladoNU.x,tecladoNU.y,tecladoNU.w,tecladoNU.h,"rgba(0,0,0,0.2)")
    },
    loop(){
        let X = 0;
        let Y = 0;
        let s = tecladoNU.h*0.2
        let x = tecladoNU.x + tecladoNU.w/2 - ((s+4)*4)/2;
        let y = tecladoNU.y+tecladoNU.h/2-((s+4)*3)/2;
        button(0,0,innerWidth,innerHeight-tecladoNU.h,function(){
            tecladoNU.destroy()
        },"rgba(0,0,0,0.2)")
        for(let i = 0; i < 12; i ++){
            if(X >= 4){
                X= 0
                Y++;
            }
            button(x+((s+4)*X),y+((s+4)*Y),s,s,function(){
                
                try{
                    if(["1","2","3","4","5","6","7","8","9","0"].includes(tecladoNU.matriz[i])){
                        PLAY(tecladoNU.matriz[i])

                        NumberInputs[tecladoNU.NumberInput].value += tecladoNU.matriz[i]
                    }else if(tecladoNU.matriz[i] == "<"){
                        PLAY(10)
                        NumberInputs[tecladoNU.NumberInput].value = NumberInputs[tecladoNU.NumberInput].value.slice(0,NumberInputs[tecladoNU.NumberInput].value.length-1)
                    }else if(tecladoNU.matriz[i] == ">"){
                        NumberInputs[tecladoNU.NumberInput].enterF( NumberInputs[tecladoNU.NumberInput].value)
                        tecladoNU.destroy()
                        setTimeout(() => {
                            PLAY(14)
                            setTimeout(() => {
                                PLAY(16)
                                setTimeout(() => {
                                    PLAY(13)
                                }, 600);
                            }, 440);
                        }, 0);
                    }
                }catch{

                }
            },this.cor)
            text(x+((s+4)*X)+(s/2)-(50/4),y+((s+4)*Y)+(s/2+(50/3)),tecladoNU.matriz[i],"white","50")
            //rect(x+((s+4)*X),y+((s+4)*Y),s,s,"red")
            X++;
        }
    },
    main(){
        if(tecladoNU.show){
            tecladoNU.draw()
            tecladoNU.loop()
        }
    }
}

const T0M4T3 = {
    name:"T0M4T3",
    version:"18-abri-2025/00:25AM",
    updates: [
        "21/04/2025-23:33PM",
        "01/05/2025-23:41PM",
        "31/05/2025-22:36PM",
    ],


};

//globals var

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d",{apha:false});
var TOUCH = {
    x:Infinity,
    y:0,
    w:10,
    h:10,
};
var CLICK = {
    x : Infinity,
    y : Infinity,
    w : 10,
    h : 10,
    func:function(){
        
    }
};
var MOUSE = {
    show: true,
    x : Infinity,
    y : Infinity,
    w : 32,
    h : 32,
}
var before,now,fps;
before=Date.now();
fps=0;
fpsLoop = 0;
requestAnimationFrame(
    function loop(){
        now=Date.now();
        
        if(fpsLoop % 60 == 0){
            fps=Math.round(1000/(now-before));
        }

        before=now;
        fpsLoop++;
        requestAnimationFrame(loop);
        
    }
 );

//framework
function print(t){console.log(t);}
function loop(f) {requestAnimationFrame(f);}
function resizer(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
//speedFunctions 
function clear(arr){
    let newArr = [];
    for(let i in arr){
        if(arr[i] !== undefined){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
function pickRandom(min,max){
    return Math.floor( Math.random() * ( max - min ) + min );
}
function colider(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&rect1.x + rect1.w> rect2.x &&rect1.y < rect2.y + rect2.h &&rect1.y + rect1.h > rect2.y) {
        return true 
    }else{
        return false
        }
}
function pickColor(x,y){
    let imgdt =ctx.getImageData(x,y,1,1)
    imgdt.rgb =`rgba(${imgdt.data.join(",")})`
    return imgdt;
}
function choose(array){
    return array[pickRandom(0,array.length)];
}
function random( n ){
    return Math.random( n );
}
function angle(x1,y1,x2,y2){
    return (Math.atan2((x2 -x1),(y2-y1)) * 180 / Math.PI)
}
function dist(x,y,x1,y1){
    var dx = x - x1;
    var dy = y- y1
    var distance = Math.sqrt(dx**2 + dy**2);
    return distance ;
}
function max(n,m){
    return ( n > m ) ? m : n;
}
function min(n,m){
    return ( n < m ) ? m : n;
}
function reLoad(n,max,back){
    if(n > max){
        n = back;
    }
    return back;
}

//animation////////////////////////////////////////////////////////////////////////////////

function animationLinear(n,scale,speed){
    if(speed > 0){
        if(n  < scale){
            n+=speed
            n = max(n,scale)
        }else{
            n-=speed
            n = min(n,scale)
        }
    }else{
        if(n  > scale){
            n+=speed
            n = max(n,scale)
        }else{
            n-=speed
            n = min(n,scale)
        }
    }
    n+= speed;
    return n;
}
//FILES/////////////////////////////////////////////////////////////////////////////////////////////////////

function download(filename, text) {
    var a = window.document.createElement('a');
a.href = window.URL.createObjectURL(new Blob([text], {type: 'text/csv'}));
a.download = filename;

// Append anchor to body.
document.body.appendChild(a);
a.click();

// Remove anchor from body
document.body.removeChild(a);
}

var FILES = {
    atual:0,
    max:0,
}
function src(url){
    FILES.max++;
    let img = new Image()
    img.src = url;
    img.onload = function(){
        FILES.atual++;
    }
    return img;
}
function music(base64){
    let sound = new Audio();
    sound.src = base64;
    FILES.max++;
    sound.addEventListener("loadeddata", () => {
        FILES.atual++;
      });
    return sound;
   
}
function saveDATA(key,value){
    return window.localStorage.setItem(key,value)
}
function getDATA(key){
    return window.localStorage.getItem(key);
}
function delDATA(key,value){
    return window.localStorage.removeItem(key)
}

let cn = document.createElement("canvas");
let ct = cn.getContext("2d",{alpha:false});
function colorPixelInImage(image,x,y){
    let img = image
    cn.width = img.width;
    cn.height = img.height;
    ct.clearRect(0,0,img.width,img.height)
   
    ct.imageSmoothingEnabled = false;
    ct.drawImage(img,0,0,img.width,img.height,0,0,img.width,img.width);
    return ct.getImageData(x,y,1,1).data;

}
//MATH//////////////////////////////////////////////////////////////////////////////////////////////////
function cos( n ){
    return Math.cos( n );
}
function sin( n ){
    return Math.sin( n );
}
function abs( n ){
    return Math.abs( n );
}
function tan( n ){
    return Math.tan( n );
}
function tanh( n , n2  ){
    return Math.tanh( n , n2 );
}
function floor( n ){
    return Math.floor( n );
}
function sqrt( n ){
    return Math.sqrt( n );
}
//interativo///////////////////////////////////////
function button(x,y,w,h,f,c,per){
    rect(x,y,w,h,c)
    
    let colisor = {
        x : x,
        y: y, 
        w : w ,
        h : h,
        
    }
    if(per == undefined){
        per = false
    }
    if(colider(CLICK,colisor)){
        f();
        if(!per){
            CLICK.x = Infinity
        }
        
    }
}
//draw functions////////////////////////////////////////////////////////////////////////////////////////
function background(c){
    rect(0,0,innerWidth,innerHeight,c)
}
function line(x,y,x2,y2,c,width){
    ctx.moveTo(x,y)
    ctx.lineTo(x2,y2)
    ctx.lineWidth = width || 1;
    ctx.strokeStyle = c || "grey";
    ctx.stroke()
}
function rect(x,y,w,h,c){
    ctx.fillStyle = c;
    ctx.fillRect(x,y,w,h)
}
function sprite(img,sx,sy,w1,h1,w2,h2,dx,dy,r,Cx,Cy){
    r = r || 0;
    if(r !== 0){
    cx = Cx || dx +0.5*w2  
    cy = Cy || dy+0.5*h2
    if(r !== 0){

        ctx.save()
    }
    ctx.translate(cx,cy)
    ctx.rotate(r *Math.PI / 180);
    ctx.translate(-cx,-cy)
    }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img,floor(sx),floor(sy),floor(w1),floor(h1),floor(dx),floor(dy),floor(w2),floor(h2));
    if(r !== 0){
        ctx.restore()

    }
}
function text(x,y,t,c,s){

    ctx.fillStyle = c || "grey"
    ctx.font = "900 "+( s || 10 )+"px Arial";
    //ctx.textRendering = "geometricPrecision"
    ctx.fillText( t , x , y );
}
var fontSrc = new src("images/font.png")
var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ÃÁÂÉÍÕÓÔÇ:=+-.,_/%#Ê!@|>§?Ú<abcdefghijklmnopqrstuvwxyzãâáéêíôõóçú() "
let fontScala =1
function pixtext(x,y,t,c,s,quebra_linha){
    x = floor(x);
    y = floor(y);

    s/=7
    s= min(floor(s)*7,7)
    let sh = min(floor((floor(s*1.42857143)/10)*10),10)
    
    if(quebra_linha == undefined){
        quebra_linha = Infinity
    }
    t = String(t)
    //t = t.toLowerCase()
    let corOriginal = 0
    if(c == "white"){
        
        cor=0
        corOriginal = 0
    }else if(c == "red"){
        cor=1
        corOriginal = 1
    }else if(c == "green"){
        cor= 2
        corOriginal = 2
    }else if(c == "blue"){
        cor=3
        corOriginal = 3
    }
    else if(c == "purple"){
        cor=4
        corOriginal = 4
    }
    else if(c == "yellow"){
        cor=5
        corOriginal = 5
    }
    else if(c == "black"){
        cor=6
        corOriginal = 6
    }
    
    else{
        cor = 0
        corOriginal = 0
    }
    
    //console.log(t.createOscillator)
    let i = 0;
    let xl = 0;
    let yl = 0
    for(var X = 0; X < t.length;X++){
        if(letras.indexOf(t[X]) >= 0){
            if(t[X] == " "){
                cor=corOriginal
            }
            

            
           /* if(t[X] == " "){
                cor = corOriginal
            }*/
           
        
        sprite(fontSrc,letras.indexOf(t[X])*7,10*cor,7,10,floor(s),sh,floor(x+(xl*(s+1)*1)),floor(y)+(yl*(s*1.5)))
        
        i++
        
        }else{
            if(t[X] == "£"){
                cor=1
                
                xl--
            }
            if(t[X] == "¢"){
                cor=2
                xl--
            }
            if(t[X] == "€"){
                cor=3
                xl--
            }
            if(t[X] == "¥"){
                cor=5
                xl--
            }
            if(t[X] == "\n"){
                yl++ 
                xl=-2
            }
        }
        if(t[X] !== "∆"){
            
            xl++
        }
        if(xl*(s+1) >= quebra_linha-((s+1)*2)){
        yl++
        xl=0
        }
        
            
    }/**/
    /*ctx.fillStyle = c || "black"
    ctx.font = ( s || 10 )+"px mainfont";
    //ctx.textRendering = "geometricPrecision"
    ctx.fillText( t , x , y );*/
}

function janela(x,y,w,h,fun){//new
    let region = new Path2D()
    region.rect(x,y,w,h)
    ctx.clip(region)
    fun(x,y,w,h)
    ctx.closePath()

}
function barras(data,xx,yy,ww,hh,maxx){//exp
    var x = xx || 0;
    var y = yy || 0;
    var w = ww || 200;
    var h = hh || 200;
    var cor = cor || "grey"
    
    var usualArea = w * 0.9
    var X =x + (w/2)-(usualArea/2)
    var Y =y + (h/2) -(usualArea/2)
    let s = maxx || Math.max(...data)
    
    let al = usualArea/s

   
    
    rect(x,y,w,h,cor)
    rect(X,Y,usualArea,usualArea,"darkgrey")
    text(x+w,y+10,s,"white","10")
    text(x+w,y+h-10,0,"white","10")

     for(let c in data){
        let WW = max(usualArea/data.length, usualArea/8)
        let HH = al*data[c]
        rect(X+(WW*c),Y+usualArea-HH,WW,HH,"red")
    }
}
//controles 






document.body.addEventListener("click",function(e){
    CLICK.x = e.pageX-5;
    CLICK.y = e.pageY-5
    CLICK.func(e)
})




var keyDown = 0;
var KeyBoard = null;
var keysList = []
var keysListValues = []
var press =0;
document.body.addEventListener("mousemove",function(e){
    let x = e.clientX;
    let y = e.clientY;
    MOUSE.x = x;
    MOUSE.y= y;
})
document.body.addEventListener("keydown",function(e){
    KeyBoard= e.code 

     let i = keysList.indexOf(e.code)
     let i2 = keysListValues.indexOf(e.code)
     if(i < 0){
        keysList.push(e.code)
      
         
     }
     if(i2 < 0){
        keysListValues.push(e.key)
     }
     
    press++
})

document.body.addEventListener("keyup",function(e){
    let i = keysList.indexOf(e.code)
    let i2 = keysListValues.indexOf(e.key)
    if(i >= 0){
        delete keysList[i]
    }
    if(i2 >= 0){
        delete keysListValues[i2]
    }
})
function keysclick(key,func){
    if(key !== "KeyAny"){
        if(keysList.includes(key) && keyDown > 15){
            keyDown = 0;
           func()
        }
    }
    if(key == "KeyAny" && keysList.length > 0){
        if( keyDown > 15){
            func()
            keyDown = 0;
        }
    }
}
function keyspress(key,func){
    if(key !== "KeyAny"){
        if(keysList.includes(key)){
            func()
        }
    }
    if(key == "KeyAny" && keysList.length > 0){
        func()
    }
}
function keyBoardLoop(){
    keysList = clear(keysList)
    keysListValues = clear(keysListValues)
    keyDown++
    loop(keyBoardLoop)
}
keyBoardLoop()
//OBJETOS////////////////////////////////////////////////////////////////////////////////
var $text_slots = {}
function textInput(arr){
     arr = arr || {};
    let u = arr.id || "undefined";
    let x = arr.x || 0;
    let y = arr.y || 0;
    let f = arr.f || function(){};
    let w = arr.w || 300;
    let h = arr.h || 20;
    let fontsizer = arr.fontsizer || 7
    let cor1 = arr.cor1 || "white";
    let cor2 = arr.cor2 || "rgb(31, 30, 30)";
    let cor3 = arr.cor3 || "rgb(22, 22, 22)";
    let type = arr.type || "text"
    let breakLine = arr.breakLine || false;

    if($text_slots[u] == undefined){
        let value;
        if(arr.value == undefined){
            value = undefined;
        }else{
            value  = String(arr.value)
        }

        $text_slots[u] = {
            edit: false,
            value: value || "",
            descri:u, 
            

        }

    }else{

        button(x,y,w,h,function(){
            
            let k = Object.keys( $text_slots);
            for(let i in k)[
                $text_slots[k[i]].edit = false
            ]
            $text_slots[u].edit = true


        },"transparent")
        if(keyDown > 2 && $text_slots[u].edit){
            keyDown=0
            let value = keysListValues[0]||""
            
            if(value == "Backspace"){
                $text_slots[u].value = $text_slots[u].value.slice(0,$text_slots[u].value.length-1)
            }else if(value == "Enter"){
                if(!breakLine){

                    $text_slots[u].edit = false
                    if(type = "text"){
    
                        
                        f($text_slots[u].value)
                    }else{
                        f(new Number($text_slots[u].value))
                    }
                }else{
                    $text_slots[u].value += "\n"
                }
            }
            
            else if(value.length == 1){
                if(type == "text"){
                    $text_slots[u].value += value

                }
                 if(type == "number"){
                    let number = "1234567890";
                    alert(value)
                    if(number.indexOf(value) > -1){
                        $text_slots[u].value += value
                    }

                }
            }
            keysListValues =[]
            
        }
        rect(x,y,w,h,(($text_slots[u].edit) ? cor2 : cor3))
        if($text_slots[u].value.length > 0){

            pixtext(x+10,y+h/2-fontsizer/2,String($text_slots[u].value),cor1,fontsizer);
        }else{
            ctx.globalAlpha = 0.5;
            pixtext(x+10,y+h/2-fontsizer/2,$text_slots[u].descri,cor1,fontsizer);
            ctx.globalAlpha = 1;
        }
    }
    //print(keysListValues)

}
function checkBox(arr){
    arr = arr || {}
    let id = arr.id || "name";
    let x = arr.x || 0;
    let y = arr.y || 0;
    let s = arr.s || 20;
    let b = arr.value ||  false;
    let cor1 = arr.cor1 || "lime";
    let cor2 = arr.cor2 || "grey";
    let cor3 = arr.cor3 || "white";
    let f = arr.func || function(){}
    let fontsizer = arr.fontsizer || "7"
    let h = floor(fontsizer*1.4285714285714286);

    button(x,y,s,s,function(){
        b = !b
        f()
    },(b) ? cor1 : cor2)
    pixtext(x+s+5,y+(s/2)-(h/2),id,cor3,fontsizer)
    return b;
}
function ranger(arr){
    arr = arr || {}
    let x = arr.x || 10;
    let y = arr.y || 10;
    let w = arr.w || 300;
    let h = arr.h || 10;
    let h2 = floor(h)+5;
    let atual = arr.atual || 0;
    let maxx = arr.max || 100;
    let fontsizer = arr.fontsizer || 7;
    let H = fontsizer * 1.4285714285714286;
    let p = max(min(atual/maxx,0),1);
    let cor1 = arr.cor1 || "grey";
    let cor2 = arr.cor2 || "yellow";
    let cor3 = arr.cor3 || "white";
    let type = arr.type || "number";


    button(x-1,y,w+10,h,function(){
        let pp = (CLICK.x-x) / w
        pp = min(max(pp,1),0)
        atual = maxx*pp
    },"transparent")
    rect(x,y,w,h,cor1)
    let value;
    if(type == "porcent"){
        value = ""+floor(p*100)+'%';
    }
    if(type == "number"){
        value = floor(atual);
    }

    rect(x,y+(h/2)-(h2/2),w*p,h2,cor2)
    pixtext(x+w+10,y+(h/2)-(H/2),value,cor3,fontsizer)

    return atual;
}
/////////////////////////////////////////////////////////////////////////////////

var defaultText = `7890úüûABCDEFGHIJKLMNOPQRSTUabcdefghijklmnopqrstuïįìíîöòôóõøœōºūùvwxyzáãàâäåæªèëėéêęēīV123456,.@#$_&-+(÷×§∆£¢€¥"^°={}%[]<>)/*':;!?~|•√π`

function Cript(key,text){
    let newTexts = "" 
    let keyI = 0;
    let value = ""
    for(let i = text.length-1; i > -1;i--){
        value+=text[i]
    }
    for(var i = 0; i < value.length;i++){
        let indeofLetra = defaultText.indexOf(value[i])
        let letra;
        if(indeofLetra > -1){
         let fakeKey = String(key)[keyI]
         fakeKey=Number(fakeKey)
         
         letra = defaultText[indeofLetra+fakeKey]
         if(indeofLetra+fakeKey > defaultText.length){
             letra = defaultText[abs(defaultText.length-indeofLetra)+fakeKey]
         }
        }else{
            letra = value[i]
        }
        
        keyI++ 
        if(keyI >= String(key).length){
            keyI=0
        }
        newTexts+=letra
        
    }
    return newTexts;
}
function Descript(key,value){
    let newTexts = "" 
    let keyI = 0;
    
    for(var i = 0; i < value.length;i++){
        let indeofLetra = defaultText.indexOf(value[i])
        let letra;
        if(indeofLetra > -1){
         let fakeKey = String(key)[keyI]
         fakeKey=Number(fakeKey)
         letra = defaultText[indeofLetra- fakeKey]
         if(indeofLetra- fakeKey< 0){
             letra = defaultText[defaultText.length-(Math.abs(defaultText.length-indeofLetra- fakeKey))]
         }
        }else{
            letra = value[i]
        }
        
        keyI++ 
        if(keyI >= String(key).length){
            keyI=0
        }
        newTexts+=letra
        
    }
    
    let text = ""
    for(let i = newTexts.length-1; i > -1;i--){
        text+=newTexts[i]
    }
    
    
    
    
    
    return text;
}
/////////////////////////////////////////////////////////////////////////////
console.warn(T0M4T3.name + T0M4T3.version +"| carregado...");

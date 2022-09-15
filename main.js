let nave=document.querySelector('.nave');
let body=document.querySelector('body');
let laser=document.getElementById('laser');
let explosion=document.getElementById('explosion');
let live=document.querySelector('i'); 
let times=document.getElementById('times');
let lives=5; 
let second=60;


//Retrocede el cronometro
setInterval(() => {
    second--;
//Muestra la variable times    
    times.textContent=second;
    if (second==0){
        alert('You Winner!!');
//recarga la pagina      
        location.reload();
    }
},1000);
//Deslizamineto de la nave
document.addEventListener('mousemove',(e)=> {
    nave.style.left=(e.clientX-40) + 'px';
} )
// Disparo
    document.addEventListener('click',() =>{
// Crea div a html desde javascript
    let bala=document.createElement('div');
    bala.classList.add('bala');
    bala.style.bottom=70+'px';
// Ubica la bala en la posicion de la nave
    bala.style.left=(nave.getBoundingClientRect().left+45)+'px';    
// Se visualiza en pagina la bala
    body.append(bala);
    laser.play();

});

//Movimiento de disparo
setInterval(() =>{
//crea array balas
    let balas=document.querySelectorAll('.bala');
    balas.forEach(bala =>{
        bala.style.top= (bala.getBoundingClientRect().top-20)+'px';

// Borra div del DOM 
        if(bala.getBoundingClientRect().top <=0){
            bala.remove();
        }
//Detecta las colisiones
        let enemigos=document.querySelectorAll('.enemigo');

        enemigos.forEach(enemigo => {
            if (bala.getBoundingClientRect().top <=enemigo.getBoundingClientRect().top+50){
                if(bala.getBoundingClientRect().left>=enemigo.getBoundingClientRect().left && bala.getBoundingClientRect().left<=enemigo.getBoundingClientRect().left+80){
                    enemigo.style.backgroundImage='url("img/explosion.png")'; 
                     explosion.play(); 
                     setTimeout(() => {
                        enemigo.remove(); 
                         explosion.stop();  
                     },100); 
                     
                }
            }
        });
    });    

},100);
//Generar Meteoritos
let aparecer=0;
setInterval(()=>{
    aparecer++;
    if(aparecer%10==0){
        let enemigo=document.createElement('div');
        enemigo.classList.add('enemigo');
        body.append(enemigo);
//Aparece aleatoriamente las rocas
        enemigo.style.left=(Math.random()* window.innerWidth-100)+'px';
    }    
        let enemigos=document.querySelectorAll('.enemigo');
        enemigos.forEach(Element =>{
            Element.style.top=(Element.getBoundingClientRect().top+10)+'px';
// Borra div del DOM 
if(Element.getBoundingClientRect().top >nave.getBoundingClientRect().top){
//Disminuyen vidas
    lives--;  
    live.textContent=lives;  
//pierde cuando
    if(lives==0){
        alert('Game Over');
        location.reload();
    }    
    Element.remove();
}

        });
    
},100);
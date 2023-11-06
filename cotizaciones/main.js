function cargarContenido(){
    cargarCotizaciones(mostrarCotizacion);
}
cargarElementos();

cargarTextos();


async function cargarCotizaciones(callback){

    //falso delay
    await delay(1500);

    let promesa1 = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    callback(await promesa1.json());

let promesa2 = await fetch('https://open.er-api.com/v6/latest/USD');
let datos2 = await promesa2.json();
document.getElementById('UsdEur').append(datos2.rates.EUR);
document.getElementById('ArsUsd').append(datos2.rates.ARS);

let datos3 = await crearPedido('https://open.er-api.com/v6/latest/ARS');
document.getElementById('UsdArs').append(datos3.rates.USD);
document.getElementById('imgEspera').style.visibility = 'hidden';
}
function mostrarCotizacion(datos){
    document.getElementById('BitcoinUsd').append(datos.bpi.USD.rate);    
}
async function crearPedido(url){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function(){
            if(xhr.status === 200){
                resolve(JSON.parse(xhr.responseText));
            }else{
                reject(xhr.statusText);
            }
        }
        xhr.send();
    })
}

function cargarElementos(){
    document.getElementById('imgLogo').setAttribute('src', 'logo.png');
    document.getElementById('titulo').textContent = "Cotizaciones en linea";
    document.getElementById('imgEspera').setAttribute('src', 'loading.gif');
    document.getElementById('imgEspera').style.visibility = 'visible';
}
function cargarTextos(){
    document.getElementById('UsdEur').append("EUR a USD: ");
    document.getElementById('ArsUsd').append("USD a ARS: ");
    document.getElementById('UsdArs').append("ARS a USD: ");
    document.getElementById('BitcoinUsd').append("Bitcoin a USD: ");
}
function delay(ms){
    return new Promise(function(res){
        setTimeout(res, ms);
    })
}
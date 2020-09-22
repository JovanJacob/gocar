//IMPORTS
importScripts('assets/js/sw-utils.js');

//CONSTANTES QUE GUARDAN EL CACHE
const STATIC_CACHE = 'static-v-1';
const DYNAMIC_CACHE = 'dynamic-v-1';
const INMUTABLE_CACHE = 'inmutable-v-1';

//TODO LO NECESARIO PARA QUE MI APP FUNCIONE (CACHE DYNAMICO)
const APP_SHELL = [
     //INDEX************************
    '/',
    'index.html',
    'assets/img/favicon.png',
    'assets/img/apple-touch-icon.png',
    'assets/img/bac.png',
    'assets/img/hero-bg.jpg',
    //PORTAFOLIO***********************
    'assets/img/portfolio/bitacora.jpg',
    'assets/img/portfolio/box.jpg',
    'assets/img/portfolio/buzon.jpg',
    'assets/img/portfolio/carwash.jpg',
    'assets/img/portfolio/celu.jpg',
    'assets/img/portfolio/comida.jpg',
    'assets/img/portfolio/factura.jpg',
    'assets/img/portfolio/glosario.jpg',
    'assets/img/portfolio/glosario.png',
    'assets/img/portfolio/historial.jpg',
    'assets/img/portfolio/lineamientos.jpg',
    'assets/img/portfolio/memo.jpg',
    'assets/img/portfolio/peticion.jpg',
    'assets/img/portfolio/programacion.jpg',
    'assets/img/portfolio/uploa-files.jpg',
    //JS**********************************
    'assets/js/app.js',
    'assets/js/sw-utils.js'
   
    
];

//TODO LO NECESARIO PARA QUE MI APP FUNCIONE (CACHE INMUTABLE)
const APP_SHELL_INMUTABLE =[
     //INDEX******************************************
     '/',
    'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i',
    'assets/vendor/bootstrap/css/bootstrap.min.css',
    'assets/vendor/icofont/icofont.min.css',
    'assets/vendor/boxicons/css/boxicons.min.css',
    'assets/vendor/venobox/venobox.css',
    'assets/vendor/owl.carousel/assets/owl.carousel.min.css',
    'assets/vendor/aos/aos.css',
    'assets/css/style.css',
    //VENDOR**********************************************
    'assets/vendor/jquery/jquery.min.js',
    'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    'assets/vendor/jquery.easing/jquery.easing.min.js',
    'assets/vendor/php-email-form/validate.js',
    'assets/vendor/waypoints/jquery.waypoints.min.js',
    'assets/vendor/counterup/counterup.min.js',
    'assets/vendor/isotope-layout/isotope.pkgd.min.js',
    'assets/vendor/venobox/venobox.min.js',
    'assets/vendor/owl.carousel/owl.carousel.min.js',
    'assets/vendor/typed.js/typed.min.js',
    'assets/vendor/aos/aos.js',
    //JS****************************************************
    'assets/js/main.js'

];

//INSTALACION DE SW**************************************************
self.addEventListener('install', event =>{

    //CREA EL CACHE
    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>{
         cache.addAll(APP_SHELL);
    });
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>{
         cache.addAll(APP_SHELL_INMUTABLE);
    });

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

//ACTIVACION DE SW*******************************************************
self.addEventListener('activate', event => {

    //ELIMINA EL CACHE VIEJO
    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

        });

    });

    event.waitUntil( respuesta );
});

//CACHE CON NETWORK FALLBACK*************************************************

self.addEventListener('fetch', event =>{

    const respuesta = caches.match(event.request).then(res =>{

        if(res){
            return res;
        }else{
           
            return fetch(event.request).then(newRes =>{

                return actualizaCacheDinamico(DYNAMIC_CACHE, event.request, newRes);

            });
        }

       

    });


    event.respondWith(respuesta);

});











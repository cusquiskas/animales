window.addEventListener("load", iniciarApp);


function iniciarApp() {
    console.log('scripts.js -> iniciarApp()');
    Moduls.constants = {};
    Moduls.constants.initDate = new Date;
    Moduls.getFooter().load ({ url: '/animales/frontoffice/home/footer.html', script: true});
    Moduls.getHeader().load ({ url: '/animales/frontoffice/home/head.html',   script: true});
    // ahora se hace en el head.js
    Moduls.getBody().load   ({ url: '/animales/frontoffice/home/blanco.html',   script: false});
}


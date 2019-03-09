window.addEventListener("load", iniciarApp);


function iniciarApp() {
    console.log('scripts.js -> iniciarApp()');
    Moduls.getHeader().load({ url: '/animales/frontoffice/home/head.html', script: true});
    Moduls.getApp().load   ({ url: '/animales/frontoffice/home/home.html', script: true});
}


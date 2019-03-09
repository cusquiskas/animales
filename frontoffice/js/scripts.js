window.addEventListener("load", iniciarApp);


function iniciarApp() {
    console.log('scripts.js -> iniciarApp()');
    Moduls.header.load({ url: '/animales/frontoffice/home/head.html', script: true});
    Moduls.app.load({ url: '/animales/frontoffice/home/home.html', script: true});
}


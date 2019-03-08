window.addEventListener("load", iniciarApp);


function iniciarApp() {
    console.log('scripts.js -> iniciarApp()');
    Moduls.header.load({ url: '/animales/frontoffice/home/head.html', script: true, class: "head" });
    Moduls.app.load({ url: '/animales/frontoffice/home/home.html', script: true, class: "home" });
    Moduls.app.children.productos.load({ url: '/animales/frontoffice/home/componentes/producto/producto.html', script: false });

}


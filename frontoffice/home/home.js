var home = class {

    mensaje(s, d, e) {
        console.log('home.js -> mensaje '+s);
    }



    constructor () {
        console.log('home.js -> constructor');
        Moduls.getProductos().load({ url: '/animales/frontoffice/home/componentes/producto/producto.html', script: false });
    }
}
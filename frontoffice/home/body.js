var body = class {
    constructor () {
        console.log('body.js -> constructor');
        Moduls.getFamilia().load ({ url: '/animales/frontoffice/home/componentes/producto/familia.html', script: true})
        Moduls.getProducto().load({ url: '/animales/frontoffice/home/componentes/contacto/contacto.html', script: true})
    }
}
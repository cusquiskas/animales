var body = class {
    constructor () {
        console.log('body.js -> constructor');
        Moduls.getMenu().load ({ url: '/animales/frontoffice/home/componentes/producto/familia.html', script: true})
        Moduls.getVentana().load({ url: '/animales/frontoffice/home/componentes/producto/listado.html', script: true})
    }
}
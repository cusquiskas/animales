var body = class {
    constructor () {
        console.log('admin/body.js -> constructor');
        Moduls.getMenu().load ({ url: '/animales/frontoffice/admin/menu.html', script: true});
        Moduls.getVentana().load({ url: '/animales/frontoffice/home/blanco.html', script: false});
    }
}
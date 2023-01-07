var menu = class {
    constructor () {
        console.log ('admin/menu.js -> constructor');
        $('div[name="IVA"]').click (function () {
            Moduls.getVentana().load({url:'/animales/frontoffice/admin/tipoIVA.html', script:true});
        });
    };

}
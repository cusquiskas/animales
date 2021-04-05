var contacto = class {
    constructor(mod) {
        console.log('contacto.js -> constructor');
        $(".enlaceHome").click(function() { Moduls.getBody().load ({ url: '/animales/frontoffice/home/body.html',   script: true}); });
    }

}
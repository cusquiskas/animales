var producto = class {
    
    listado (s, d, e) {
        console.log('producto.js -> listado');
    }
    
    constructor () {
        console.log('producto.js -> constructor');
        Moduls.getProducto().getForm('listaArticulos').executeForm();
    }
}
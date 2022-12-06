var login = class {
    constructor () {
        console.log('login.js -> constructor');
        
    }

    validacion (s,d,e) {
        if (s) {
            if (d.root.codusr) {
                Moduls.getHeader().getScript().muestraUsuario(d.root);
                Moduls.getBody().load({ url: sessionStorage.getItem('prevUrl'), script: (sessionStorage.getItem('prevUrlScrip')=='true')});
            } else {
                alert('No se han recuperado datos');
            }
        } else {
            alert(d.mensaje);
        }
    }

}
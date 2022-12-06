var login = class {
    constructor () {
        console.log('login.js -> constructor');
        
    }

    validacion (s,d,e) {
        debugger;
        if (s) {
            if (d.root.codusr) {
                sessionStorage.setItem('usuario', d.root);
                location.reload();
            } else {
                alert('No se han recuperado datos');
            }
        } else {
            alert(d.mensaje);
        }
    }

}
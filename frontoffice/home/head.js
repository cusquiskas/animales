var head = class {
    constructor () {
        console.log('head.js -> constructor');
        $('a[name="login"]').click(function(){
            sessionStorage.setItem('prevUrlScrip', (typeof (Moduls.getBody().getScript) == 'function')?true:false);
            sessionStorage.setItem('prevUrl', Moduls.getBody().url);
            Moduls.getBody().load({ url: '/animales/frontoffice/home/usuario/login.html', script: true});
          });
    }

    muestraUsuario(obj) {
        Moduls.getHeader().Forms["valida"].set({"usuario":obj.nombre, "accion":"logout"});
        $('p[name="logout"]').show();
    }

    valida (s,d,e) {
        if (s) {
            if (e.form.parametros.accion.value == 'logout') {
                location.reload();
            } else {
                Moduls.getHeader().getScript().muestraUsuario(d.root);
            }
        }
    }
}
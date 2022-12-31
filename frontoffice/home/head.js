var head = class {
    constructor () {
        console.log('head.js -> constructor');
        $('a[name="login"]').click(function(){
            sessionStorage.setItem('prevUrlScrip', (typeof (Moduls.getBody().getScript) == 'function')?true:false);
            sessionStorage.setItem('prevUrl', Moduls.getBody().url);
            Moduls.getBody().load({ url: '/animales/frontoffice/home/usuario/login.html', script: true});
        });
        $('button[name="admin"]').click(function(){
            alert('estoy en ello');
        });
    }

    muestraUsuario(obj) {
        Moduls.getHeader().Forms["valida"].set({"usuario":obj.nombre, "accion":"logout"});
        $('p[name="logout"]').show();
        if (obj.admin == 10) {
            $('p[name="admin"]').show();
        }
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
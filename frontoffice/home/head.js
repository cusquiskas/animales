var head = class {
    constructor () {
        console.log('head.js -> constructor');
        $('a[name="login"]').click(function(){
            Moduls.getBody().load({ url: '/animales/frontoffice/home/usuario/login.html', script: true});
          });
    }

    valida (s,d,e) {
        debugger;
        if (s) {
            if (e.form.parametros.accion.value == 'logout') {
                location.reload();
            } else {
                e.form.set({"usuario":d.root.nombre, "accion":"logout"});
                $('p[name="logout"]').show();
            }
        }
    }
}
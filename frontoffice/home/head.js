var head = class {
    constructor () {
        console.log('head.js -> constructor');
        
        this.loadEvents();
        //this.toggleOpcionAdmin();
        this.muestraOpcionAdmin();
    }

    toggleOpcionAdmin() {
        if (sessionStorage.getItem('adminMode') == "false") {
            sessionStorage.setItem('adminMode', "true");
        } else { 
            sessionStorage.setItem('adminMode', "false");
        }    
    }

    muestraOpcionAdmin() {
        if (sessionStorage.getItem('adminMode') == "true") {
            $('button[name="admin"]')[0].innerText = "Tienda";
            Moduls.getBody().load({url:'/animales/frontoffice/admin/body.html', script: true});
        } else {
            sessionStorage.setItem('adminMode', "false");
            $('button[name="admin"]')[0].innerText = "Administración";
            Moduls.getBody().load({url:'/animales/frontoffice/home/body.html', script: true});
        }
    }
    
    muestraUsuario(obj) {
        Moduls.getHeader().Forms["valida"].set({"usuario":obj.nombre, "accion":"logout"});
        $('p[name="logout"]').show();
        if (obj.admin == 10) {
            sessionStorage.setItem('adminMode', "true");
            $('button[name="admin"]').show();
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

    loadEvents () {
        let yo = this;
        $('a[name="login"]').click(function(){
            sessionStorage.setItem('prevUrlScrip', (typeof (Moduls.getBody().getScript) == 'function')?true:false);
            sessionStorage.setItem('prevUrl', Moduls.getBody().url);
            Moduls.getBody().load({ url: '/animales/frontoffice/home/usuario/login.html', script: true});
        });
        $('button[name="admin"]').click(function(){
            yo.toggleOpcionAdmin();
            console.log('head.js -> ¿admin? ' + sessionStorage.getItem('adminMode'));
            yo.muestraOpcionAdmin();
        });
    }
}
var head = class {
    constructor () {
        console.log('head.js -> constructor');
        $('a[name="login"]').click(function(){
            Moduls.getBody().load({ url: '/animales/frontoffice/home/usuario/login.html', script: true});
          });
    }

    valida (s,d,e) {
        debugger
        if (s) {
            e.form.setForm({"usuario":d.root.nombre});
        }
    }
}
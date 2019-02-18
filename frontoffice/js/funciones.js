var portalControlError = {
  funcion: function (a, b, c, d, e) {
    var err = (e && e.stack) ? e.stack : (a + '\n' + b + ':' + c);
    if (portalControlError.getEco()) muestraError({ tit: 'Error en la aplicaci&oacute;n', tipo: 'error', msg: err.cambia(['http://', 'https://', 'intranet.globalia-corp.com', 'desarrollo.', 'preproduccion.'], '').cambia('\n', '<br>') });
    if (portalControlError.getReport()) if (typeof (invocaAjax) == 'function') invocaAjax({ direccion: '/newintra/newintra/1/xwi_general.guarda_error_js.json', parametros: { p_navegador: JSON.stringify(getBrowser()), p_error: err }, retorno: function (s, d, e) { } });
  },
  getFuncion: function () { return portalControlError.funcion; },
  setFuncion: function (f) { if (typeof (f) == 'function') { portalControlError.funcion = f; window.onerror = f; } },
  eco: true,
  setEco: function (b) { portalControlError.eco = (b) ? true : false; },
  getEco: function () { return portalControlError.eco; },
  report: true,
  setReport: function (b) { portalControlError.report = (b) ? true : false; },
  getReport: function () { return portalControlError.report; },
  getUserAgent: function () { return navigator.userAgent; },
  getVendor: function () { return navigator.vendor; }
};
window.onerror = portalControlError.getFuncion();
portalControlError.setEco(document.location.href.substr(0, 35) != 'https://intranet.globalia-corp.com/');
portalControlError.setReport(document.location.href.substr(0, 35) == 'https://intranet.globalia-corp.com/');

// Funciones de Array
var t = [];
if (!t.push) {
  Array.prototype.push = function () {
    var i, j = arguments.length;
    for (i = 0; i < j; i++) this[this.length] = arguments[i];
    return this.length;
  }
}
if (!t.pop) {
  Array.prototype.pop = function () {
    if (this.length) {
      var t = this[this.length - 1];
      this.length--;
      return t;
    }
    return null;
  }
}
if (!t.splice) {
  Array.prototype.splice = function (i, n) {
    if (arguments.length < 2 || isNaN(i = i * 1) || isNaN(n = n * 1)) return null;
    if (i < 0 || i >= this.length || n < 0) return null;
    var x, l = this.length - n, r = [];
    if (l >= i) {
      for (x = i; x < l; x++) { r[r.length] = this[x]; this[x] = this[x + n] }
      this.length = l; r.length = n;
    } else {
      for (x = i, l = arr.length; x < l;) r[r.length] = this[x++];
      this.length = i;
    }
    if (arguments.length > 2) for (x = 2, l = arguments.length; x < l;) this[this.length] = arguments[x++];
    return r;
  }
}
if (!t.inArray) {
  Array.prototype.inArray = function (s) {
    for (var i = 0; i < this.length; i++) if (s == this[i]) return i;
    return -1
  }
}
function ordenaArrayObjetos(obj, cmp, ord) {
  return obj.sort(function (a, b) {
    return ((a[cmp] < b[cmp]) ? ((ord == 'ascending') ? -1 : 1) : ((a[cmp] > b[cmp]) ? ((ord == 'ascending') ? 1 : -1) : 0));
  });
}

/*
if (!t.esArray) {
 Array.prototype.esArray=function(){
  return (typeof(this)=='object' && (this instanceof Array));
 }
}
*/
t = null;
// Funciones de String
String.prototype.ltrim = function (c) { c = c ? c.aRegExp() : '\\s'; return this.replace(new RegExp("^" + c + "+"), '') }
String.prototype.rtrim = function (c) { c = c ? c.aRegExp() : '\\s'; return this.replace(new RegExp(c + "+$", "g"), '') }
String.prototype.trim = function (c) { c = c ? c.aRegExp() : '\\s'; return this.replace(new RegExp("(^" + c + "+)|(" + c + "+$)", "g"), '') }
String.prototype.esNull = function () { return this.length == 0 }
String.prototype.esNumero = function (ent) {
  if (!this.length) return false;
  if (this.indexOf('.') > -1) return false;
  var c = 0, l = this.indexOf(',');
  if (l > -1 && ent) return false;
  while (l > -1) { l = this.indexOf(',', l + 1); c++; }
  if (c > 1) return false;
  return !isNaN(this.replace(',', '.'));
}
String.prototype.esHora = function (f) {
  var rx = __regexpHora(f);
  var s = rx.regx.exec(this);
  if (!s) return false;
  rx.fmt = rx.fmt.toLowerCase();
  for (var i = 1; i < 4; i++) {
    var m = parseInt(s[i], 10);
    if (m > ((rx.fmt.charAt(i - 1) == 'h') ? 23 : 59)) return false;
  }
  return true;
}
String.prototype.hazHora = function (f) {
  f = f || 'HMS';
  var h = [], r = '', i;
  if (this.indexOf(':') > -1 || this.indexOf('.') > -1) {
    h = (this.indexOf(':') > -1) ? this.split(':') : this.split('.');
  } else {
    switch (this.length) {
      case 1:
      case 2: h[0] = this; h[1] = '0'; h[2] = '0'; break;
      case 4: h[0] = this.substr(0, 2); h[1] = this.substr(2, 2); h[2] = '0'; break;
      case 6: h[0] = this.substr(0, 2); h[1] = this.substr(2, 2); h[2] = this.substr(4, 2); break;
      default: throw 'Hora incorrecta.';
    }
  }
  if (horaValida(h[0], h[1] || 0, h[2] || 0)) {
    for (i = 0; i < f.length; i++) {
      switch (f.substr(i, 1)) {
        case 'h': r += (r.length) ? ':' : ''; r += h[0].ltrim('0').lpad(1, '0'); break;
        case 'H': r += (r.length) ? ':' : ''; r += h[0].ltrim('0').lpad(2, '0'); break;
        case 'm': r += (r.length) ? ':' : ''; r += h[1].ltrim('0').lpad(1, '0'); break;
        case 'M': r += (r.length) ? ':' : ''; r += h[1].ltrim('0').lpad(2, '0'); break;
        case 's': r += (r.length) ? ':' : ''; r += h[2].ltrim('0').lpad(1, '0'); break;
        case 'S': r += (r.length) ? ':' : ''; r += h[2].ltrim('0').lpad(2, '0'); break;
        case ':': break;
        default: throw 'Formato incorrecto.';
      }
    }
  } else throw 'Hora incorrecta.';
  return r;
}
String.prototype.hazObjFecha = function (f) {
  var sep;
  if (!f && '0123456789dmy'.indexOf(this.substring(2, 3).toLowerCase()) == -1) { sep = this.substring(2, 3); }
  if (f && f.length == 1 && '0123456789dmy'.indexOf(f.toLowerCase()) == -1) { sep = f; f = null; }
  sep = sep || '/';
  var rx = { 6: 'ddmmyy', 8: 'ddmmyyyy', 10: 'dd' + sep + 'mm' + sep + 'yyyy' };
  if (f) rx = __regexpFecha(f); else {
    if (this.length != 6 && this.length != 8 && this.length != 10) return false;
    rx = __regexpFecha(rx[this.length]);
  }
  var s = rx.regx.exec(this), s2;
  if (!s) return false;
  var fc = { d: '!', m: '!', y: '!' };
  for (var i = 1; i < 4; i++) {
    fc[rx.fmt.charAt(i - 1).toLowerCase()] = parseInt(s[i] || '!', 10);
  }
  if (isNaN(fc.d)) fc.d = 1;
  if (isNaN(fc.m)) fc.m = 1;
  if (isNaN(fc.y)) fc.y = 1904; else {
    if (rx.fmt.indexOf('y') != -1 && fc.y !== '!') {
      fc.y %= 100;
      s = (new Date()).getFullYear();
      s2 = Math.floor(s / 100) * 100; s %= 100;
      fc.y += (fc.y < 50) ? ((s < 50) ? s2 : s2 + 100) : ((s < 50) ? s2 - 100 : s2);
    }
  }
  return fc;
}
String.prototype.esFecha = function (f) {
  var fc = this.hazObjFecha(f);
  return fechaValida(fc.d, fc.m, fc.y);
}
String.prototype.hazFecha = function (fe, fs) {
  var fc = this.hazObjFecha(fe);
  if (fc !== false && fechaValida(fc.d, fc.m, fc.y)) {
    s = (new Date(fc.y, fc.m - 1, fc.d)).formatea(fs);
    return s;
  } else throw 'Fecha incorrecta.';
}
String.prototype.esMail = function () {
  if (this.search(/^[\w\-]+(\.[\w\-]+)*@([a-z0-9]([\w\-]*?[^-])?\.)+[a-z]{2,8}(\.[a-z]{2})?$/i) != -1) return true;
  var i, r = this.match(/^[\w\-]+(\.[\w\-]+)*@(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/i);
  if (!r || r.length != 6) return false;
  for (i = 5; i; i--) if (parseInt(r[i]) > 255) return false;
  return true;
}
String.prototype.esDNI = function (t) {
  if (!t) {
    if (this.search(/^[xtayz]\d{7,8}[a-z]$/i) != -1) t = 'NIE';
    else if (this.search(/^\d{8}[a-z]$/i) != -1) t = 'NIF';
    else if (this.search(/^[a-hj-np-suvw]\d{7}[a-z0-9]$/i) != -1) t = 'CIF';
    else if (this.search(/^\d{8}$/i) != -1) t = 'DNI';
    else if (this.search(/^\d{11}$/i) != -1 || this.search(/^\d{12}$/i) != -1) t = 'NSS';
  }
  switch (String(t).toUpperCase()) {
    case 'NIF':
      if (this.search(/^\d{8}[a-z]$/i) != -1) {
        return ('TRWAGMYFPDXBNJZSQVHLCKE'.charAt(parseInt(this.substr(0, 8), 10) % 23) == this.substr(this.length - 1).toUpperCase());
      } else return false;
    case 'NIE':
      if (this.search(/^[xyz]\d{7,8}[a-z]$/i) != -1) {
        t = this.replace(/^[xta]/i, '0').replace(/^y/i, '1').replace(/^z/i, '2');
        return ('TRWAGMYFPDXBNJZSQVHLCKE'.charAt(parseInt(t.match(/\d+/)[0], 10) % 23) == t.substr(t.length - 1).toUpperCase());
      } else return false;
    case 'DNI':
      return this.search(/^\d{8}$/) != -1;
    case 'CIF':
      var i, x = 0;
      if (this.search(/^[a-hj-np-suvw]\d{7}[a-z0-9]$/i) != -1) {
        t = this.substr(1, 7).match(/\d/g);
        for (i = 0; i < 7; i++) x += (i % 2 != 0) ? parseInt(t[i]) : ((t[i] * 2) < 10) ? (t[i] * 2) : parseInt(String((t[i] * 2)).substr(0, 1)) + parseInt(String((t[i] * 2)).substr(1, 1));
        x = (10 - parseInt((x < 10) ? x : (String(x).substr(1, 1) == '0') ? '10' : String(x).substr(1, 1)));
        if (this.search(/^[kpnqsw]/i) != -1) { return ('JABCDEFGHI'.charAt(x) == this.substr(this.length - 1).toUpperCase()); }
        else {
          return (String(x) == this.substr(this.length - 1));
        }
      } else return false;
    case 'NSS':
      /*
      * var dp, ns, dc, fr;
      * dp = this.substr(0,2);
      * dc = this.substr(this.length-2,2);
      * ns = this.substr(2,this.length-4);
      * if (ns.length==8 && ns.substr(0,1)=='0') ns = ns.substr(1,ns.length-1);
      * else if (ns.length<7) ns = ns.lpad(7,'0'); 
      * fr = (dp+ns)*1;
      * fr = fr - parseInt(fr / 97) * 97;
      * return (fr == dc*1);
      */
      //--> es otra forma de hacer la misma validación <--//

      var nss = this;
      var pro = nss.substr(0, 2) * 1;
      if ((pro < 1 || pro > 53) && pro != 66) return false;
      if (!nss) return false;
      if (nss.length != 11 && nss.length != 12) return false;
      if (nss.substr(2, 1) == 0) nss = "" + nss.substr(0, 2) + nss.substr(3, nss.length - 1);
      return ((nss.substr(0, nss.length - 2) % 97) * 1 == (nss.substr(nss.length - 2, 2)) * 1);

    default:
      return false;
  }
}

function esArray(obj) { return (typeof (obj) == 'object' && (obj instanceof Array)); }
String.prototype.cambiaComilla = function () { return this.replace(/\x27/g, '\xa4') }
String.prototype.html2asc = function () { return this.replace(/&amp;/g, '&').replace(/&#13;/g, '\n').replace(/&#9;/g, '\t').replace(/&#39;/g, '\'').replace(/&#34;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#92;/g, '\\') }
String.prototype.reemplazaMostachos = function (obj) {
  var cad = this;
  for (var chd in obj) cad = cad.replace(new RegExp('{{' + chd + '}}', 'g'), (obj[chd] || ''));
  return cad;
}

String.prototype.cambia = function (org, dst) {
  if (!org) return this;
  var cad = this;
  dst = (!dst ? '' : dst).aRegExp();
  if (!esArray(org)) org = [org];
  for (var i = 0; i < org.length; i++) cad = cad.replace(new RegExp(org[i].aRegExp(), "g"), dst);
  return cad;
}
String.prototype.lpad = function (sz, p) {
  if ((!sz) || (this.length >= sz)) return this;
  p = (!p) ? ' ' : p; sz -= this.length;
  var t = '', i = sz;
  while (i--) t += p;
  t = t.substr(0, sz);
  return t + this;
}
String.prototype.rpad = function (sz, p) {
  if ((!sz) || (this.length >= sz)) return this;
  p = (!p) ? ' ' : p; sz -= this.length;
  var t = '', i = sz;
  while (i--) t += p;
  t = t.substr(0, sz);
  return this + t;
}
String.prototype.cuentaSubCad = function (s) {
  if (!s) return 0;
  var x = 0, c = 0, sz = s.length;
  while ((x = this.indexOf(s, x)) > -1) { c++; x += sz }
  return c;
}
String.prototype.aRegExp = function () { return this.replace(/([\.\\\+\?\*\^\$\{\}\[\]\|])/g, '\\$1') }

String.prototype.buscaPalabra = function (p, s, i) {
  s = parseInt(s + 'a'); s = isNaN(s) ? 0 : s;
  return this.substr(s).search(new RegExp('(^|\\b)' + p.aRegExp() + '($|\\b)', 'g' + ((i) ? 'i' : ''))) + s;
}
String.prototype.cambiaPalabra = function (p, p2, i) { return this.replace(new RegExp('(^|\\b)(' + p.aRegExp() + ')($|\\b)', 'g' + ((i) ? 'i' : '')), '$1' + (p2 ? p2 : '').aRegExp() + '$3') }

String.prototype.dcBanco = function (cc1, cc2, dc) {
  if (!(cc1.match(/^\d{8}$/) && cc2.match(/^\d{10}$/) && dc.match(/^\d{2}$/))) return false;
  var arrWeights = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6]; // vector de pesos
  var dc1 = 0, dc2 = 0, i;
  for (i = 7; i >= 0; i--) dc1 += arrWeights[i + 2] * cc1.charAt(i);
  dc1 = 11 - (dc1 % 11);
  if (11 == dc1) dc1 = 0;
  if (10 == dc1) dc1 = 1;
  for (i = 9; i >= 0; i--) dc2 += arrWeights[i] * cc2.charAt(i);
  dc2 = 11 - (dc2 % 11);
  if (11 == dc2) dc2 = 0;
  if (10 == dc2) dc2 = 1;
  return (10 * dc1 + dc2 == dc);
}
// nueva versión para IBAN .dcBanco = calcularDC([objet],'CCC')
function sustituirPaisIBAN(letra) { letra = letra.replace(/A/ig, '10'); letra = letra.replace(/B/ig, '11'); letra = letra.replace(/C/ig, '12'); letra = letra.replace(/D/ig, '13'); letra = letra.replace(/E/ig, '14'); letra = letra.replace(/F/ig, '15'); letra = letra.replace(/G/ig, '16'); letra = letra.replace(/H/ig, '17'); letra = letra.replace(/I/ig, '18'); letra = letra.replace(/J/ig, '19'); letra = letra.replace(/K/ig, '20'); letra = letra.replace(/L/ig, '21'); letra = letra.replace(/M/ig, '22'); letra = letra.replace(/N/ig, '23'); letra = letra.replace(/O/ig, '24'); letra = letra.replace(/P/ig, '25'); letra = letra.replace(/Q/ig, '26'); letra = letra.replace(/R/ig, '27'); letra = letra.replace(/S/ig, '28'); letra = letra.replace(/T/ig, '29'); letra = letra.replace(/U/ig, '30'); letra = letra.replace(/V/ig, '31'); letra = letra.replace(/W/ig, '32'); letra = letra.replace(/X/ig, '33'); letra = letra.replace(/Y/ig, '34'); letra = letra.replace(/Z/ig, '35'); return letra; }
function comprobarDC(cuenta, formato, alerta) {
  alerta = alerta || false;
  var i;
  switch (formato.toUpperCase()) {
    case 'CCC':
      var numeros = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
      var tras_entidad = '';
      for (i = 0; i < cuenta.entidad.length + 1; i++) tras_entidad += cuenta.entidad.substr(cuenta.entidad.length - i, 1);
      var tras_oficina = '';
      for (i = 0; i < cuenta.oficina.length + 1; i++) tras_oficina += cuenta.oficina.substr(cuenta.oficina.length - i, 1);
      var tras_cuenta = '';
      for (i = 0; i < cuenta.cuenta.length + 1; i++) tras_cuenta += cuenta.cuenta.substr(cuenta.cuenta.length - i, 1);
      var tras_total = "" + tras_oficina + tras_entidad;
      var resultado = 0;
      for (i = 0; i < 8; i++) resultado += (tras_total.substr(i, 1) * numeros[i]);
      var resultado_cuenta = 0;
      for (i = 0; i < 10; i++) resultado_cuenta += (tras_cuenta.substr(i, 1) * numeros[i]);
      var dc_resultado = 11 - (resultado % 11);
      var dc_resultado_cuenta = 11 - (resultado_cuenta % 11);
      if (dc_resultado == 10) dc_resultado = 1;
      if (dc_resultado == 11) dc_resultado = 0;
      if (dc_resultado_cuenta == 10) dc_resultado_cuenta = 1;
      if (dc_resultado_cuenta == 11) dc_resultado_cuenta = 0;
      if (alerta) alert("" + dc_resultado + dc_resultado_cuenta);
      return (cuenta.dc == "" + dc_resultado + dc_resultado_cuenta);
      break;
    case 'IBAN':
      var numero = sustituirPaisIBAN(cuenta.pais);
      var iban = String(cuenta.entidad) + String(cuenta.oficina);
      var modulo = iban % 97;
      iban = "" + modulo + cuenta.dc + cuenta.cuenta.substring(0, 2);
      modulo = iban % 97;
      iban = "" + modulo + cuenta.cuenta.substring(2, cuenta.cuenta.length) + numero + '00';
      var modulo_iban = iban % 97;
      var iban_resul = 98 - modulo_iban;
      if (iban_resul >= 1 && iban_resul <= 9) iban_resul = '0' + iban_resul;
      if (alerta) alert(iban_resul);
      return (cuenta.iban.substr(0, 4) == cuenta.pais + iban_resul);
      break;
    default:
      return false;
  }
}

function formatoEsp(valor, dec) {
  if (isNaN(valor) || !isFinite(valor)) return valor;
  if (!isNaN(dec) && isFinite(dec) && dec >= 0) valor = parseFloat(valor).toFixed(dec);
  valor = String(valor).replace(/[^\d-]/g, ',');
  valor = (valor.substr(0, 1) == ',') ? '0' + valor : valor;
  var len, neg = valor.charAt(0);
  valor = valor.substr(neg == '-' ? 1 : 0);
  len = valor.indexOf(',');
  len = (len > 0) ? len : valor.length;
  while (len > 3) {
    valor = valor.substr(0, len - 3) + '.' + valor.substr(len - 3);
    len -= 3;
  }
  return (neg == '-' ? '-' : '') + valor;
}

function dec2bin(x, a) {
  if ((/[^0-9]/g.test(x)) || x == "") { return (a) ? [] : ''; }
  x = parseInt(x);
  var arr = new Array(), i, bin = x.toString(2);
  if (!a) return bin.toString();
  else {
    for (i = bin.length - 1; i >= 0; i--) { arr.push(parseInt(bin.substr(i, 1))); }
    return arr;
  }
}

// Funciones de Date
Date.prototype.addMonth = function (n) { return new Date(new Date(this).setMonth(this.getMonth() + n)); }
Date.prototype.formatea = function (f) {
  f = f || 'dd/mm/yyyy';
  var rx = __regexpFecha(f), i, j, s = '';
  for (i = 0; i < rx.fmt.length;) {
    var c = rx.fmt.charAt(i);
    switch (c) {
      case 'd': case 'D':
        j = this.getDate(); s += ((j < 10) && (c == 'D')) ? '0' + j : j;
        break;
      case 'm': case 'M':
        j = this.getMonth() + 1; s += ((j < 10) && (c == 'M')) ? '0' + j : j;
        break;
      default: s += String(this.getFullYear()).substr(c == 'Y' ? 0 : 2, c == 'Y' ? 4 : 2);
    }
    if (rx.fmt.charAt(++i)) s += rx.sep;
  }
  return s;
}
Date.prototype.formateaHora = function (f) {
  var rx = __regexpHora(f), i, j, s = '';
  for (i = 0; i < rx.fmt.length;) {
    var c = rx.fmt.charAt(i);
    switch (c) {
      case 'h': case 'H':
        j = this.getHours(); s += ((j < 10) && (c == 'H')) ? '0' + j : j;
        break;
      case 'm': case 'M':
        j = this.getMinutes(); s += ((j < 10) && (c == 'M')) ? '0' + j : j;
        break;
      default:
        j = this.getSeconds(); s += ((j < 10) && (c == 'S')) ? '0' + j : j;
    }
    if (rx.fmt.charAt(++i)) s += rx.sep;
  }
  return s;
}

// Funciones miscel�neas
function objDump(obj, lvl) {
  lvl = lvl || 0;
  if (lvl > 8) return null;
  var _lvl = " ".lpad(lvl * 3, "*"), str = "", j, chd, v;
  if (typeof (obj) == 'object') {
    for (chd in obj) {
      v = obj[chd];
      if (typeof (v) == 'object') str += _lvl + "'" + chd + "':\n" + objDump(v, lvl + 1);
      else str += _lvl + "'" + chd + "' => " + v + "\n";
    }
  } else str = typeof (obj);
  return str;
}
function __regexpHora(f) {
  f = String(f).toLowerCase().match(/^((hh?)|(mm?)|(ss?))(([^hms]?)((hh?)|(mm?)|(ss?))((\6)((hh?)|(mm?)|(ss?)))?)?$/);
  var i, m = 0, ms = 'hms', fmt = '', s;
  if (f) {
    for (i = 0; i < 14; i++) if (!f[i]) f[i] = '';
    for (i = 0; i < 3; i++) {
      var c, d = f[[1, 7, 13][i]]; c = d.charAt(0)
      m |= (1 << ms.indexOf[c]); ms[c] <<= 3;
      fmt += (d.length > 1) ? c.toUpperCase() : c;
    }
  } else { m = 8; f = [] }
  fmt = (m > 7) ? 'hM' : fmt;
  f[6] = (m > 7) ? ':' : f[6];
  for (i = 0, s = '^'; i < fmt.length; i++) {
    s += '(\\d\\d' + (('hms'.indexOf(fmt.charAt(i)) != -1) ? '?' : '') + ')' + (fmt.charAt(i + 1) ? f[6].aRegExp() : '');
  }
  return { regx: new RegExp(s + '$'), fmt: fmt, sep: f[6] };
}
function comparaHora(h0, h1, sep) {
  h0 = '' + h0; h1 = '' + h1; sep = (sep) ? sep : ':';
  h0 = h0.split(sep); h1 = h1.split(sep);
  h0 = horaValida(h0[0], h0[1], (h0[2] ? h0[2] : 0)) ? new Date('01', '01', '01', h0[0], h0[1], (h0[2] ? h0[2] : 0)) : new Date();
  h1 = horaValida(h1[0], h1[1], (h1[2] ? h1[2] : 0)) ? new Date('01', '01', '01', h1[0], h1[1], (h1[2] ? h1[2] : 0)) : new Date();
  if (h0 < h1) return -1;
  if (h0 > h1) return 1;
  return 0;
}
function horaValida(h, m, s) {
  if (isNaN(h) || isNaN(m) || isNaN(s)) return false;
  h = parseInt(h, 10); m = parseInt(m, 10); s = parseInt(s, 10);
  if (h < 0 || h > 23) return false;
  if (m < 0 || m > 59) return false;
  if (s < 0 || s > 59) return false;
  return true;
}
function __regexpFecha(f) {
  f = String(f).toLowerCase().match(/^((dd?)|(mm?)|(y{2,4}))(([^dmy]?)((dd?)|(mm?)|(y{2,4}))((\6)((dd?)|(mm?)|(y{2,4})))?)?$/);
  var i = 0, m = 0, ms = 'dmy', fmt = '', s;
  if (f) {
    for (i = 0; i < 14; i++) if (!f[i]) f[i] = '';
    for (i = 0; i < 3; i++) {
      var c, d = f[[1, 7, 13][i]]; c = d.charAt(0);
      m |= (1 << ms.indexOf[c]); ms[c] <<= 3;
      fmt += (d.length > ((c != 'y') ? 1 : 3)) ? c.toUpperCase() : c;
    }
  } else throw "Formato de fecha inv�lido";
  fmt = (m > 7) ? 'dmY' : fmt;
  f[6] = (m > 7) ? '/' : f[6];
  for (i = 0, s = '^'; i < fmt.length; i++) {
    var fc = fmt.charAt(i);
    switch (fc.toLowerCase()) {
      case 'd': case 'm': s += '(\\d\\d' + (('dm'.indexOf(fc) != -1) ? '?' : '') + ')'; break;
      case 'y': s += '(\\d{' + ((fc == 'y') ? '2' : '4') + '})'; break;
    }
    s += (fmt.charAt(i + 1) ? f[6].aRegExp() : '');
  }
  return { regx: new RegExp(s + '$'), fmt: fmt, sep: f[6] }
}
function comparaFecha(f0, f1, sep) {
  f0 = '' + f0; f1 = '' + f1; sep = (sep) ? sep : '/';
  f0 = f0.split(sep); f1 = f1.split(sep);
  f0 = fechaValida(f0[0], f0[1], f0[2]) ? new Date(f0[2], f0[1] - 1, f0[0]) : new Date();
  f1 = fechaValida(f1[0], f1[1], f1[2]) ? new Date(f1[2], f1[1] - 1, f1[0]) : new Date();
  if (f0 < f1) return -1;
  if (f0 > f1) return 1;
  return 0;
}
function bisiesto(anyo) {
  if ((anyo % 100) == 0) {
    if ((anyo % 400) == 0) return true;
  } else {
    if ((anyo % 4) == 0) return true;
  }
  return false;
}
function fechaValida(d, m, a) {
  if (isNaN(d) || isNaN(m) || isNaN(a)) return false;
  d = parseInt(d, 10); m = parseInt(m, 10); a = parseInt(a, 10);
  if (m < 1 || m > 12) return false;
  if (a < 1900) return false;
  if (d < 1) return false;
  if (d > [31, 28 + (bisiesto(a) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]) return false;
  return true;
}
function sysdate(f) { return (new Date).formatea(f) }

function pliega(o, p) { o.style.display = (p) ? 'none' : '' }
function oculta(o, p) { o.style.visibility = (p) ? 'hidden' : '' }
function getId(i, d) { return (d ? d : window.document).getElementById(i) }

// Funciones de frames
function getValue(v, w) {
  if (!v) return '';
  w = String((w ? w : window).location.search);
  v = String(v ? v : '').aRegExp();
  w = w.replace(/amp;/gi, ''); //Elimina el ampersar que viene de m�s en la url
  w = w.match(new RegExp('(&|\\?)' + v + '(=[^&]*)?($|&)'));
  w = w ? w[2].substr(1) : '';
  return w;
}
function muestraError(e, et) {
  if (typeof parent.muestraErrorExtjs == 'function') {
    parent.muestraErrorExtjs('dm', e);
    return;
  }
  if (top.muestraError2) {
    top.muestraError2(e, et, self);
    return;
  }
  try {
    top.frames.contenido.frames.alertbox.muestraError(e, et);
  } catch (err) {
    alert(et || e.msg.replace(/<br[^>]*>|<li[^>]*><p[^>]*>/ig, '\n').replace(/<\/[^>]*>/ig, ''))
  }
}
if (self.name == 'ifr_apl') {
  try {
    top.__cntModales = 0;
    top.__cntProcesando = 0; // Esto reinicia el contador de llamadas antes del onLoad
  } catch (e) { }
}
function procesando(on) {
  var v;
  if (top.procesando2) { top.procesando2(on, self); return }
  var cnt = top.__cntProcesando ? isNaN(top.__cntProcesando) ? 0 : top.__cntProcesando : 0;
  var tc = top.frames.contenido;
  if (tc)
    v = getId('procesando', tc.document);
  else if (top.frames.document)
    v = getId('procesando', top.frames.document);



  if (!v) return;
  if (on) {
    cnt++;
    cnt = (cnt < 1) ? 1 : cnt;
    if (v) {
      v.style.display = '';
      v = getId('flash', tc.frames.procesando.document);
      var vp = v.offsetParent;
      var x = (vp.offsetWidth - v.offsetWidth) / 2, y = (vp.offsetHeight - v.offsetHeight) / 2;
      v.style.top = y + 'px'; v.style.left = x + 'px';
    }
  } else {
    if ((--cnt) < 1) { if (v) { v.style.display = 'none'; } cnt = 0 }
  }
  top.__cntProcesando = cnt;
}

function __neoModal() {
  var tc = top.frames.contenido;
  var ob, fn = tc.frames[(ob = window.__neowin).j];
  if (++ob.cnt > 100) return;
  if (fn.modalPortal) fn.modalPortal(ob.p, ob.j); else window.setTimeout(__neoModal, 100);
}
function modalPortal(p, ap) {
  ap = ap || 'dm';
  if (typeof parent.modalPortalExtjs == 'function') {
    parent.modalPortalExtjs(ap, p);
    return;
  }
  if (top.modalPortal2) {
    top.modalPortal2(p, self);
    return;
  }

  var tc = top.frames.contenido;
  var ifs = tc.document.getElementsByTagName('IFRAME');
  var el = tc.document.createElement('IFRAME'), j = ++tc.__modal;
  el.name = el.id = 'mp' + j;
  el.src = top.web_root + '/es/Utilidades/modalportal.html';
  el.frameBorder = 0;
  el.style.zIndex = 9010 + j;
  el.className = 'modalportal';
  tc.document.body.appendChild(el);
  window.__neowin = { p: p, j: 'mp' + j, cnt: 0 };
  window.setTimeout(__neoModal, 100);

}

/*
	funcion de busqueda de usuario
	parametros:
	 usr  	 -> C�digo de usuario
	 codEmp  -> C�digo de empresa
	 codDiv  -> C�digo de la divisi�n		 
	 codSdv  -> C�digo de la sub divisi�n
	 codDep  -> C�digo del departamento
	 tiPdep  -> Tipo departamento (F/O) Funcional/Organizativo 
	 codApl  -> C�digo de la aplicaci�n
	 fecbaj  -> empleados de baja (S/N) 
	 fecCon  -> Fecha contrato
	 filtro  -> filtro -> 1? filtro empresa/division/centro o filtro -> ?1 filtro unidad organizativa
	 dniUsr  -> DNI del Usuario
	 fnc   -> function de retorno
	 
 */
function datosUsuarioLast(obj) {

  obj.codApl = obj.codApl || '';
  obj.tipdep = obj.tipdep || 'F';
  obj.dniUsr = obj.dniUsr || '';
  if (obj.dniUsr.length > 0) obj.dniUsr = "%" + obj.dniUsr;
  obj.fecbaj = obj.fecbaj || 'N';
  obj.externo = obj.externo || 'N';
  obj.codEmp = obj.codEmp || '';
  obj.filtro = obj.filtro || '00';
  obj.codDiv = obj.codDiv || '';
  obj.fecCon = obj.fecCon || sysdate('dd/mm/yyyy');
  obj.nDatos = obj.nDatos || 'X';
  obj.codDep = obj.codDep || '';
  obj.codSdv = obj.codSdv || '';
  obj.modo = obj.modo || 'XML';
  obj.nombre = obj.nombre || '';
  obj.areaN = obj.areaN || '';
  obj.inicio = obj.inicio || '1';  //Esto pertenece a la navegación valor por defecto 1
  obj.fin = obj.fin || '5';  //Esto pertenece a la navegación valor por defecto 5
  obj.sesion = (obj.sesion == 'S') ? obj.sesion : 'N';

  if (obj.xsid == '' || obj.xsid == 'undefined') {
    obj.xsid = top.SESION_ID;
  } else {
    if (!obj.xsid) obj.xsid = getValue('xsid');
    if (!obj.xsid || obj.xsid == '') obj.xsid = getValue('xsid', parent);
  }

  if (!obj.fnc) {
    muestraError({
      msg: 'hay que especificar una funci&oacute;n v&aacute;lida de retorno',
      tipo: 'aviso',
      tit: 'Faltan par&aacute;metros'
    });
    return;
  }

  if (!obj.usr && obj.sesion == 'N') {
    // el listin requiere la función, no sólo su nombre
    if (typeof (obj.fnc) == 'string') obj.fnc = window[obj.fnc];
    obj.filtro = (obj.externo == 'S') ? '00' : obj.filtro;
    obj.modo = 'XML';
    modalPortal({
      w: 520, h: 500,
      url: '/newintra/es/datos_usuario/listin.html',
      args: { obj: obj, func: obj.fnc } //obj.fnc será sobreescrito, por eso se crea func duera del objeto obj
    });
  } else {
    //if (typeof(obj.fnc)=='function') obj.fnc = obj.fnc.toString().substr(8,obj.fnc.toString().indexOf("(")-8).trim();
    var fnc;
    obj.modo = 'JSON';
    var cbk = (typeof (obj.fnc) == 'string') ? window[obj.fnc] : obj.fnc;
    var par = {
      p_codusr: obj.usr, p_codemp: obj.codEmp, p_coddiv: obj.codDiv, p_codsdv: obj.codSdv,
      p_coddep: obj.codDep, p_tipdep: obj.tipdep, p_codapl: obj.codApl, p_fecbaj: obj.fecbaj,
      p_nombre: obj.nombre, p_feccon: obj.fecCon, p_filtro: obj.filtro, p_dniusr: obj.dniUsr,
      p_externo: obj.externo, p_ndatos: obj.nDatos, p_inicio: obj.inicio,
      p_arean: obj.areaN, p_Fin: obj.fin, p_modo: obj.modo, p_sesion: obj.sesion
    };
    if (typeof top.invocaAjax == 'function') fnc = top.invocaAjax;
    else {
      if (typeof invocaAjax == 'function') fnc = invocaAjax;
      else fnc = alert;
    }
    fnc({
      direccion: '/newintra/newintra/1/xwi_datos_usuario.lista_usuario.json',
      retorno: function (suc, dat, ext) { if (suc) { if (typeof (cbk) == 'function') { if (dat.dato && dat.dato.length > 0) { cbk(dat.dato[0]) } else { muestraError({ msg: 'El trabajador no existe, no está activo o no tiene perfil necesario para visualizar sus datos.', tipo: 'error', tit: 'Error' }); } } else { muestraError({ msg: 'No se ha definido una función de CallBack.', tipo: 'error', tit: 'Error' }); } } else { muestraError({ tit: 'Error', tipo: 'error', msg: ((typeof dat == 'string') ? dat : (typeof dat.msg == 'string') ? dat.msg : objDump(dat)) }); } },
      parametros: par,
      caracteres: 'utf-8'
    });
  }
}

function datosUsuario(o) {
  o.apl = o.apl || '';
  o.cbk = o.cbk || '';
  o.dni = o.dni || '';
  if (!o.fnc) {
    muestraError({
      msg: 'hay que especificar una función válida de retorno',
      tipo: 'aviso',
      tit: 'Faltan parámetros'
    });
    return;
  }
  if (!o.usr) modalPortal({ w: top.ancho_listin, h: top.alto_listin, url: '/newintra/es/Utilidades/consulta_usuarios_rrhh.html', args: { aplicacion: o.apl, func: o.fnc, cbk: o.cbk, dni: o.dni, baja: o.baj } });
  else {
    o.fec = o.fec || sysdate('dd/mm/yyyy');
    o.fil = o.fil || '01';
    o.baj = o.baj || 'N';
    if (!(ifr = document.getElementById('div_newdatosUsuario'))) {
      ifr = document.createElement('DIV');
      ifr.id = 'div_newdatosUsuario';
      document.body.appendChild(ifr);
    }
    ifr.innerHTML = '<iframe src="/newintra/newintra/1/es/listin/xwi_listin.xml$datos_empleado_rrhh.html?pnumper=' + o.usr + '&papl=' + o.apl + '&pfunc=' + o.fnc + '&pcbk=' + o.cbk + '&pfecha=' + o.fec + '&pfiltro=' + o.fil + '&pnofecha=' + o.baj + '&xsid=' + top.SESION_ID + '" name="ifr_newdatosUsuario" width="0" height="0" frameborder="0"></iframe>';
  }
}
function listin(formulario, func) {
  modalPortal({ w: top.ancho_listin, h: top.alto_listin, url: '/newintra/es/listin/consulta_usuarios_new.html', args: { formulario: formulario, func: func } });
}
function listin_perfil(formulario, func, apli) {
  modalPortal({ w: top.ancho_listin, h: top.alto_listin, url: '/newintra/es/listin/consulta_usuarios_new_rrhh.html', args: { aplicacion: apli, formulario: formulario, func: func } });
}
function ocultaSelects(h, win) {
  var s, i, j, k, obs = ['SELECT', 'OBJECT', 'APPLET', 'EMBED'];
  win = win || self;
  if (h) {
    if (win.__objetos && win.__objetos.length != 0) ocultaSelects(0, win);
    win.__objetos = win.__objetos || [];
    win.__objetos.length = 0;
    for (k = obs.length - 1, j = 0; k > -1; k--) {
      s = win.document.getElementsByTagName(obs[k]);
      for (i = s.length - 1; i > -1; i--) {
        win.__objetos[j++] = { sel: s[i], vi: s[i].style.visibility };
        s[i].style.visibility = 'hidden';
      }
    }
  } else {
    while (!win.__objetos && win != top) win = win.parent;
    if (win.__objetos) {
      s = win.__objetos;
      for (i = s.length - 1; i > -1; i--) s[i].sel.style.visibility = s[i].vi;
      win.__objetos = null;
    }
  }
}

// Funciones de forms
function radioIndex(rad) {
  if (rad[0].type != 'radio') return -1;
  var i, j = -1;
  for (i = 0; i < rad.length; i++) if (rad[i].checked) { j = i; break; }
  return j;
}
function radioValue(rad) {
  var i = radioIndex(rad);
  return (i == -1) ? '' : rad[i].value;
}
function radioCheckValue(rad, val) {
  var i, j = -1;
  if (rad[0].type != 'radio') return;
  for (i = 0; i < rad.length; i++) if (rad[i].value == val) { j = i; break; }
  if (j != -1) rad[j].checked = true;
  return j;
}
function radioValueOff(rad) {
  if (rad[0].type != 'radio') return;
  for (i = 0; i < rad.length; i++) rad[i].checked = false;
  return;
}
function getForm(n, d) { return (d ? d : window.document).forms[n] }
function selCampo(f) {
  try {
    f.focus(); f.select();
    return true;
  } catch (e) {
    if (!(f.focus && f.select)) throw e;
  }
  return false;
}
function getOption(s, v, p, i) {
  var j, k;
  if (!s.options) return null; else s = s.options;
  p = p ? p : 'value';
  v = v ? ((i) ? ('' + v).toUpperCase() : ('' + v)) : '';
  try {
    for (j = 0; j < s.length; j++) {
      k = '' + s[j][p]; k = i ? k.toUpperCase() : k;
      if (k == v) return s[j];
    }
  } catch (e) { return null }
  return null;
}
function getSelectText(s, v, i) {
  var i = getSelectIndex(s, v, i);
  return (i != -1) ? s.options[i].text : '';
}
function getSelectIndex(s, v, i) {
  if (!s.options) return -1; else s = s.options;
  v = (v) ? ((i) ? ('' + v).toUpperCase() : ('' + v)) : '';
  for (var j = 0; j < s.length; j++) if ((i ? s[j].value : s[j].value.toUpperCase()) == v) return j;
  return -1;
}
function getSelectedOptions(s, f) {
  var i, opt = [], str = ''; f = f || 'array';
  for (i = 0; i < s.options.length; i++) {
    if (s.options[i].selected) { if (f == 'array') opt.push(s.options[i].value); else str += ',' + s.options[i].value; }
  }
  if (f == 'array') return opt;
  else return str.substr(1, str.length - 1);
}
function rellenaSelect(s, o, r, c) {
  if (!s.options) return -1; else s = s.options;
  if (!r) s.length = 0;
  c = c || {};
  c.txt = c.txt || 'txt';
  c.val = c.val || 'val';
  var i, j, ss;
  for (var i = 0; i < o.length; i++) {
    ss = new Option(o[i][c.txt], o[i][c.val]);
    for (j in o[i]) if ('txt\x1fval\x1f'.indexOf(j) == -1) ss.setAttribute(j, o[i][j]);
    s[s.length] = ss;
  }
  return s.length;
}
function controlarTamano(o, ln) {
  if (arguments.length < 2 || !o.value) return '';
  var v = o.value;
  if (v.length > ln) {
    muestraError({ tipo: 'aviso', tit: 'Demasiado grande', msg: 'El valor excede los ' + ln + ' caracteres.<br>Se eliminar� el exceso.' });
    v = v.substr(0, ln);
  }
  return v;
}
function selectMultiple(campo) {
  var cmb = getId(campo); var estados = '@'; var num = 0;
  for (i = 0; i < cmb.options.length; i++) {
    if (cmb.options[i].selected && cmb.options[i].value != '') {
      estados += cmb.options[i].value + '@';
      num++;
    }
  }
  return num > 0 ? estados : '';
}

// Inicializadores y eventos
function anadeEvt(o, e, f) {
  e = e.replace(/^on/i, '');
  if (o.addEventListener) {
    o.addEventListener(e, f, false);
    o = f = null;
    return true;
  }
  e = 'on' + e;
  if (o.attachEvent) {
    o.attachEvent(e, f);
    o = f = null;
    return true;
  }
  var old = (o[e]) ? o[e] : function () { };
  o[e] = function () { old(); f() };
  o = f = null;
  return false;
}
function borraEvt(o, e, f) {
  e = e.replace(/^on/i, '');
  if (o.removeEventListener) {
    o.removeEventListener(e, f, false);
    o = f = null;
    return true;
  }
  e = 'on' + e;
  if (o.detachEvent) {
    o.detach(e, f);
    o = f = null;
    return true;
  }
  o = f = null;
  return false;
}
function __botOn() {
  var o = (this.event) ? this.event.srcElement : this, c;
  try {
    c = o.className;
    if (c.search(/(^|\b)(lupa|calendar|pop_uo)($|\b)/ig) == -1)
      o.className = c + ' over'
    else {
      o.className = c.replace(/(^|\b)(lupa|calendar|pop_uo)($|\b)/ig, '$2_over');
    }
  } catch (e) { }
  o = null;
}
function __botOff() {
  var o = (this.event) ? this.event.srcElement : this, c;
  try {
    c = o.className;
    if (c.search(/(^|\b)(lupa|calendar|pop_uo)_over($|\b)/ig) == -1)
      o.className = c.cambiaPalabra('over')
    else {
      o.className = c.replace(/(^|\b)(lupa|calendar|pop_uo)_over($|\b)/ig, '$2');
    }
  } catch (e) { }
  o = null;
}
function initBotones() {
  var o = document.getElementsByTagName('BUTTON');
  for (var i = 0; i < o.length; i++) {
    anadeEvt(o[i], 'mouseover', __botOn);
    anadeEvt(o[i], 'mouseout', __botOff);
  }
  o = null;
}
function initForms() {
  var i, j, k, njt = false, ndt = false, nj, nd, sid = top.SESION_ID ? top.SESION_ID : '';
  nd = document.createElement('input');
  nd.type = 'hidden'; nd.name = 'xsid'; nd.value = sid;
  nj = document.createElement('input');
  nj.type = 'hidden'; nj.name = 'xjerror'; nj.value = 'S';
  for (i = 0; i < document.forms.length; i++) {
    j = document.forms[i];
    j.setAttribute('AutoComplete', 'off');
    njt = false; ndt = false;
    for (k = 0; k < j.elements.length; k++) {
      if (j.elements[k].name == 'xsid') { j.elements[k].value = sid; ndt = true; }
      if (j.elements[k].name == 'xjerror') njt = true;
    }
    if (!ndt) { j.appendChild(nd.cloneNode(false)); }
    if (!njt) { j.appendChild(nj.cloneNode(false)); }
  }
  nd = null;
  nj = null;
}
function resetXSID(f) {
  var sid = null, i, j = f.elements;
  if (sid == null) sid = (top.SESION_ID ? top.SESION_ID : null);
  if (sid == null) sid = (opener && opener.top.SESION_ID ? opener.top.SESION_ID : null);
  if (sid == null) sid = getValue('xsid').cambia('#', '');
  if (sid == null) sid = getValue('xsid', parent).cambia('#', '');
  if (sid == null) sid = getValue('xsid', opener).cambia('#', '');
  for (i = 0; i < j.length; i++) if (j[i].name == 'xsid') j[i].value = sid;
  return sid;
}
function getXsid() {
  var sid = null;
  if (sid == null) sid = (top.SESION_ID ? top.SESION_ID : null);
  if (sid == null) sid = (opener && opener.top.SESION_ID ? opener.top.SESION_ID : null);
  if (sid == null) sid = getValue('xsid').cambia('#', '');
  if (sid == null) sid = getValue('xsid', parent).cambia('#', '');
  if (sid == null) sid = getValue('xsid', opener).cambia('#', '');
  return sid;
}
function initTabs() {
  var t = document.getElementsByTagName('TABLE'), i, j;
  for (i = 0; i < t.length; i++) {
    if (t[i].className != 'tabs') continue;
    var tt = t[i].getElementsByTagName('td');
    for (j = 0; j < tt.length; j++) {
      anadeEvt(tt[j], 'mouseover', function () { try { ((this.event) ? this.event.srcElement : this).className += ' over' } catch (e) { } });
      anadeEvt(tt[j], 'mouseout', function () { var o = (this.event) ? this.event.srcElement : this; try { o.className = o.className.cambiaPalabra('over') } catch (e) { }; o = null });
    }
  }
  t = null;
}
function rOn(r) { r.className = 'listsel' }
function rOff(r, p) { r.className = ['listpar', 'listimpar'][p & 1] }
function rOnEx(e, elm) {
  var r = e.target || e.srcElement;
  elm = (!elm) ? 'TR' : elm; elm = elm.toUpperCase();
  while (r.nodeName != elm && r.parentNode) r = r.parentNode;
  if (r.nodeName != elm) return;
  r.setAttribute('old-classname', r.className);
  r.className = r.className + ' listsel';
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
}
function rOffEx(e, elm) {
  var r = e.target || e.srcElement;
  elm = (!elm) ? 'TR' : elm; elm = elm.toUpperCase();
  while (r.nodeName != elm && r.parentNode) r = r.parentNode;
  if (r.nodeName != elm) return;
  r.className = r.getAttribute('old-classname');
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
}
function rClicEx(e, elm) {
  var r = e.target || e.srcElement;
  elm = (!elm) ? 'TR' : elm; elm = elm.toUpperCase();
  while (r.nodeName != elm && r.parentNode) r = r.parentNode;
  if (r.nodeName != elm) return;
  if (r.className.buscaPalabra('listpick')) {
    r.setAttribute('beg-classname', r.getAttribute('old-classname'));
    r.setAttribute('old-classname', 'listpick');
    r.className = 'listpick';
  } else {
    r.setAttribute('old-classname', r.getAttribute('beg-classname'));
  }
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
  return r;
}
function ocultaMenu() { }
function muestraMenu() { }

function buildIframe(n, s) { if (!(ifr = document.getElementById(n))) { ifr = document.createElement('DIV'); ifr.id = n; document.body.appendChild(ifr); } ifr.innerHTML = '<iframe src="' + s + '" name="' + n + '" style="display:none"></iframe>'; }

// function getFile(n,a) { 
//  a=a||''; 
//  buildIframe('div_newDownloadFile','/newintra/es/Utilidades/getFile.php?p_origen='+n+'&p_nombre='+a+'&xsid='+top.SESION_ID); 
// }  

function getFile(n, a, p, e) {
  a = a || '';
  p = p || false;
  e = e || false;
  top.invocaAjax({
    direccion: '/management/mvc-management/downloadFile.FILE',
    method: 'POST',
    parametros: {
      originFile: n,
      fileName: a,
      contentType: 'application/json',
      preview: p,
      encrypt: e
    },
    retorno: function (suc, dat, ext) {
      if (!suc)
        muestraError({ tit: 'Gesti&oacute;n de ficheros', tipo: 'error', msg: resuelveError(dat) });
    }
  });
}

function getZipFile(files, originFile, fileName) {
  files = files || '';
  originFile = originFile || "/var/www/repositorio/tmp/" + getXsid() + ".zip";
  fileName = fileName || getXsid() + ".zip";
  top.invocaAjax({
    direccion: '/management/mvc-management/zipFiles.FILE',
    parametros: {
      files: files,
      originFile: originFile,
      fileName: fileName,
      contentType: 'application/json'
    },
    retorno: function (suc, dat, ext) {
      if (!suc)
        muestraError({ tit: 'Gesti&oacute;n de ficheros', tipo: 'error', msg: resuelveError(dat) });
    }
  });
}


function callFileOptions(o) {
  o.esq = o.esq || 'newintra';
  o.cbk = (typeof (eval(o.cbk)) == 'function') ? o.cbk : (typeof (setFileOption) == 'function') ? 'setFileOption' : null;
  var err = '';
  if (!o.apl) err = '<li>No se ha especificado aplicaci&oacute;n</li>';
  if (!o.cbk) err += '<li>No se ha especificado funci&oacute;n</li>';
  if (err != '') { muestraError({ tit: 'Error Interno', tipo: 'error', msg: 'callFileOptions dice:<br>' + err }); return; }
  invocaAjax({
    direccion: '/management/mvc-management/controller/' + o.esq + '.xwi_general.gestion_archivos.xml',
    metodo: 'GET',
    parametros: { p_aplicacion: o.apl, xchn: 'JSON' },
    retorno: function (s, d, e) {
      window[o.cbk](d.conf);
    }
  });
  // buildIframe(
  //   'div_callFileOptions',
  //   '/' + o.esq + '/' + o.esq + '/1/es/Utilidades/xwi_general.gestion_archivos.html?p_aplicacion=' + o.apl + '&p_callback=' + o.cbk + '&xsid=' + top.SESION_ID
  // );
}
function escribeTabla(dest, cab, obj, ord) {
  if (typeof dest == 'string') dest = getId(dest);
  ord = ord || { columna: '', dir: '', funcion: '' };
  if (ord.columna != '') ordenaArrayObjetos(obj, ord.columna, ord.dir || 'ascending');
  var sngClick, dblClick, activa, fnc, arrayF = [];
  var scroll, funcion, prefijo = ((dest.getAttribute('id') == "") ? dest.getAttribute('name') : dest.getAttribute('id'));
  var valor = "", sub = "", cad = "";
  var ordStilo = "", ordAccion = "", ordBtn = "";
  var clase = '', x, y, cad = '<table style="width:' + (dest.offsetWidth - 20) + 'px;height:30px">';
  cad += '<tr>';
  sub = '<colgroup>';
  if (typeof (cab.subFila) != 'undefined') {
    activa = ((typeof (cab.subFila.activa) == 'string') ? cab.subFila.activa : ((typeof (cab.subFila.activa) == 'function') ? cab.subFila.activa.toString().substr(8, cab.subFila.activa.toString().indexOf("(") - 8).trim() : ''));
    cad += '<th style="width:20px">&nbsp;</th>';
    sub += '<col width="20px">';
  }
  for (x = 0; x < cab.columnas.length; x++) {
    ordStilo = ""; ordAccion = ""; ordBtn = "";
    if (typeof cab.columnas[x].ordenacion == 'string' && typeof cab.columnas[x].ordenacion != '') {
      ordStilo = ';cursor:pointer';
      ordAccion = 'onClick="' + ord.funcion + '(\'' + cab.columnas[x].ordenacion + '\')"';
      if (cab.columnas[x]["ordenacion"] == ord.columna)
        ordBtn = '&nbsp;<button type="button" class="' + ((ord.dir == 'ascending') ? 'UpBtn' : 'DownBtn') + '"></button>';
    }
    cad += '<th style="width:' + cab.columnas[x]["tamano"] + ordStilo + '" ' + ordAccion + '>' + cab.columnas[x]["titulo"] + ordBtn + '</th>';
    sub += '<col width="' + cab.columnas[x]["tamano"] + '">';
  }
  sub += '</colgroup>';
  cad += '</tr></table><div style="width:' + (dest.offsetWidth - 2) + 'px;height:' + (dest.offsetHeight - 30) + 'px;overflow:auto;margin:0;padding:0;"><table class="' + (cab.clase || "") + '" ' + (cab.extra || '') + ' style="width:100%">';
  cad += sub;
  for (y = 0; y < obj.length; y++) {
    if (cab.clase.indexOf("tablistados") >= 0) clase = (y % 2 == 0) ? 'listpar' : 'listimpar';
    dblClick = ((typeof (cab.dosClick) == 'string') ? cab.dosClick : ((typeof (cab.dosClick) == 'function') ? cab.dosClick.toString().substr(8, cab.dosClick.toString().indexOf("(") - 8).trim() : ''));
    if (dblClick != "") dblClick = dblClick + '(' + JSON.stringify(obj[y]).replace(/'/g, "\\\'").replace(/"/g, "'") + ')';
    sngClick = ((typeof (cab.unClick) == 'string') ? cab.unClick : ((typeof (cab.unClick) == 'function') ? cab.unClick.toString().substr(8, cab.unClick.toString().indexOf("(") - 8).trim() : ''));
    if (sngClick != "") sngClick = sngClick + '(' + JSON.stringify(obj[y]).replace(/'/g, "\\\'").replace(/"/g, "'") + ')';
    cad += '<tr class="' + (obj[y].clase || clase) + '" onDblClick="' + dblClick + '" onClick="' + sngClick + '">';
    if (typeof (cab.subFila) != 'undefined') {
      if (activa != "") {
        funcion = activa + '(' + JSON.stringify(obj[y]).replace(/'/g, "\\\'").replace(/"/g, "'") + ', getId(\'sub_' + prefijo + '_div_' + y + '\'), getId(\'' + prefijo + '\')); ';
        if (cab.subFila.visible) arrayF.push((obj[y].desplegable === false) ? null : funcion);
      }
      scroll = 'getId(\'' + prefijo + '\').childNodes[0].style.width = (getId(\'' + prefijo + '\').offsetWidth-((getId(\'' + prefijo + '\').childNodes[1].offsetHeight<getId(\'' + prefijo + '\').childNodes[1].scrollHeight?19:1)))+\'px\';';
      scroll += 'getId(\'' + prefijo + '\').childNodes[1].style.width = (getId(\'' + prefijo + '\').offsetWidth-((getId(\'' + prefijo + '\').childNodes[1].offsetHeight<getId(\'' + prefijo + '\').childNodes[1].scrollHeight?2:1)))+\'px\';';
      cad += '<td>';
      if (obj[y].desplegable !== false) cad += '<button id="up_' + prefijo + '_but_' + y + '" onClick="' + funcion + 'getId(\'sub_' + prefijo + '_tr_' + y + '\').style.display=\'\'; this.style.display=\'none\';' + scroll + '" style="display:' + ((cab.subFila.visible) ? 'none' : 'inline') + '" type="button" class="' + (cab.subFila.botonMas || 'selAllBtn') + '"></button>';
      else cad += '&nbsp;';
      cad += '</td>';
    }
    for (x = 0; x < cab.columnas.length; x++) {
      if (typeof (cab.columnas[x]["referencia"]) == 'undefined') {
        if (typeof (cab.columnas[x]["funcion"]) == 'function') valor = cab.columnas[x]["funcion"](obj[y]); else valor = "";
      } else valor = obj[y][cab.columnas[x]["referencia"]];
      cad += '<td align="' + (cab.columnas[x]["alineacion"] || '') + '">' + (valor || "") + '</td>';
    }
    cad += '</tr>';
    if (typeof (cab.subFila) != 'undefined' && obj[y].desplegable !== false) {
      cad += '<tr id="sub_' + prefijo + '_tr_' + y + '" style="display:' + ((cab.subFila.visible) ? '' : 'none') + '">';
      cad += '<td><button onClick="getId(\'sub_' + prefijo + '_tr_' + y + '\').style.display=\'none\';getId(\'up_' + prefijo + '_but_' + y + '\').style.display=\'\';' + scroll + '" type="button" class="' + (cab.subFila.botonMenos || 'deselAllBtn') + '"></button></td>';
      cad += '<td colspan="' + (cab.columnas.length) + '">';
      cad += '<div id="sub_' + prefijo + '_div_' + y + '" style="border:1px solid blue;overflow:hidden; ' + ((cab.subFila.alto > 0) ? 'height:' + cab.subFila.alto + 'px' : '') + '">';
      cad += '</div></td></tr>';
    }
  }
  cad += '</table></div>';
  dest.innerHTML = cad;
  if (dest.childNodes[1].offsetHeight == dest.childNodes[1].scrollHeight) {
    dest.childNodes[0].style.width = (dest.offsetWidth - 1) + "px";
    dest.childNodes[1].style.width = (dest.offsetWidth - 1) + "px";
  }
  if (typeof (cab.subFila) != 'undefined' && cab.subFila.visible) {
    for (x = 0; x < arrayF.length; x++) {
      fnc = new Function(arrayF[x]);
      fnc();
    }
  }
}

function getBrowser() {
  // Obtener los datos del browser
  var objAgent = navigator.userAgent;
  var objOffsetName, objOffsetVersion, ix;

  var bwr = {
    browserName: navigator.appName,
    browserFullVersion: '' + parseFloat(navigator.appVersion),
    browserVersion: '',
    language: navigator.language,
    os: ''
  };

  // In Chrome
  if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
    bwr.browserName = "Chrome";
    bwr.browserFullVersion = objAgent.substring(objOffsetVersion + 7);
    if ((ix = bwr.browserFullVersion.indexOf(" ")) != -1)
      bwr.browserFullVersion = bwr.browserFullVersion.substring(0, ix);
  }
  // In Microsoft internet explorer
  else if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
    bwr.browserName = "Internet Explorer";
    bwr.browserFullVersion = objAgent.substring(objOffsetVersion + 5);
    bwr.browserFullVersion = bwr.browserFullVersion.substring(0, bwr.browserFullVersion.indexOf(";"));
  }
  // In Microsoft internet explorer
  else if (bwr.browserName == 'Netscape' && (objOffsetVersion = objAgent.indexOf("Trident/")) != -1) {
    var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    bwr.browserName = "Internet Explorer";
    if (re.exec(objAgent) != null) bwr.browserFullVersion = RegExp.$1;
  }
  // In Firefox
  else if ((objOffsetVersion = objAgent.indexOf("Firefox")) != -1) {
    var re = new RegExp("Firefox/([0-9]{1,}[\.0-9]{0,})");
    bwr.browserName = "Firefox";
    if (re.exec(objAgent) != null) bwr.browserFullVersion = RegExp.$1;
  }
  // In Safari
  else if ((objOffsetVersion = objAgent.indexOf("Safari")) != -1) {
    bwr.browserName = "Safari";
    bwr.browserFullVersion = objAgent.substring(objOffsetVersion + 7);
    if ((objOffsetVersion = objAgent.indexOf("Version")) != -1)
      bwr.browserFullVersion = objAgent.substring(objOffsetVersion + 8);
    bwr.browserFullVersion = bwr.browserFullVersion.substring(0, bwr.browserFullVersion.indexOf(" "));
  }
  // For other browser "name/version" is at the end of userAgent
  else if ((objOffsetName = objAgent.lastIndexOf(' ') + 1) <
    (objOffsetVersion = objAgent.lastIndexOf('/'))) {
    bwr.browserName = objAgent.substring(objOffsetName, objOffsetVersion);
    bwr.browserFullVersion = objAgent.substring(objOffsetVersion + 1);
    if (bwr.browserName.toLowerCase() == bwr.browserName.toUpperCase()) {
      bwr.browserName = navigator.appName;
    }
  }

  if ((ix = bwr.browserFullVersion.indexOf(".")) != -1)
    bwr.browserVersion = bwr.browserFullVersion.substring(0, ix);

  if ((objOffsetVersion = objAgent.indexOf("Windows")) != -1) {
    bwr.os = "Windows";
  } else if ((objOffsetVersion = objAgent.indexOf("Macintosh")) != -1) {
    bwr.os = "Macintosh";
  } else if ((objOffsetVersion = objAgent.indexOf("iPhone")) != -1) {
    bwr.os = "iPhone";
  } else if ((objOffsetVersion = objAgent.indexOf("Windows Phone")) != -1) {
    bwr.os = "Windows Phone";
  } else if ((objOffsetVersion = objAgent.indexOf("Android")) != -1) {
    bwr.os = "Android";
  } else if ((objOffsetVersion = objAgent.indexOf("Linux")) != -1) {
    bwr.os = "Linux";
  }

  // TODO - Investigar mas para llegar a sacar la localizacion
  // var onSuccess = function (position) {
  //   console.log(
  //     'Latitude: ' + position.coords.latitude + '\n' +
  //     'Longitude: ' + position.coords.longitude + '\n' +
  //     'Altitude: ' + position.coords.altitude + '\n' +
  //     'Accuracy: ' + position.coords.accuracy + '\n' +
  //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
  //     'Heading: ' + position.coords.heading + '\n' +
  //     'Speed: ' + position.coords.speed + '\n' +
  //     'Timestamp: ' + position.timestamp + '\n');
  // };

  // navigator.geolocation.getCurrentPosition(onSuccess);

  return bwr;
}

var message = function (obj) {
  var xmin = (obj.minWidth) ? obj.minWidth : 200;
  var texto = (obj.centrado) ? '<p class="centrado" style="width:100%">' + obj.msg + '</p>' : obj.msg;
  var xmax = (obj.centrado) ? xmin : '';

  Ext.Msg.show({
    title: obj.title,
    msg: texto,
    minWidth: xmin,
    maxWidth: xmax,
    modal: true,
    cls: (obj.cls ? obj.cls : ''),
    fn: (obj.fn ? obj.fn : null),
    icon: (obj.type == 'aviso' ? Ext.Msg.WARNING : (obj.type == 'error' ? Ext.Msg.ERROR : Ext.Msg.INFO)),
    buttons: (obj.buttons ? obj.buttons : Ext.Msg.OK),
    scope: (obj.scope ? obj.scope : null),
    //Si se quita no salen los botones
    buttonText: {}
  });
};

function empty(data) {
  if (typeof (data) == 'number' || typeof (data) == 'boolean') {
    return false;
  }
  if (typeof (data) == 'undefined' || data === null) {
    return true;
  }
  if (typeof (data.length) != 'undefined') {
    return data.length == 0;
  }
  var count = 0;
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      count++;
    }
  }
  return count == 0;
}

function resuelveError(dat) {
  var llamante = dondeEstoy(document.activeElement);
  llamante = (llamante && llamante.formulario) ? llamante.formulario.name + '<br>' : '';
  if (dat.extra && typeof dat.extra == 'string') return llamante + dat.extra;
  if (dat.extra && dat.extra.msg) return llamante + dat.extra.msg;
  if (dat.msg && typeof dat.msg == 'string') return llamante + dat.msg;
  if (dat.errMsg) return llamante + dat.errMsg;
  if (dat.errorMessage) return llamante + dat.errorMessage;
  if (dat.errmsg && dat.errmsg.extra && dat.errmsg.extra.msg) return llamante + dat.errmsg.extra.msg;
  if (dat.errmsg && dat.errmsg.extra && dat.errmsg.extra.errmsg) return llamante + dat.errmsg.extra.errmsg;
  if (dat.errmsg && typeof dat.errmsg == 'string') return llamante + dat.errmsg;
  if (dat.errdesc && typeof dat.errdesc == 'string') return llamante + dat.errdesc
  if (dat.errmsg && dat.errmsg.errdesc) return llamante + dat.errmsg.errdesc;
  if (dat.root && dat.root.errmsg) return llamante + dat.root.errmsg;
  if (dat.root && dat.root.msg) return llamante + dat.root.msg;
  if (typeof dat == 'string') return llamante + dat;
  if (dat.root && dat.root.error) return llamante + dat.root.error;
  if (dat.txtmsg && typeof dat.txtmsg == 'string') return llamante + dat.txtmsg;
  if (dat.errmsg && typeof dat.errmsg == 'string') return llamante + dat.errmsg;
  return llamante + objDump(dat);
}

function datosEmpleado(obj) {
  var datos = null;
  //   if(empty(obj.codusr) && empty(obj.dniusr))
  //     muestraError({msg : 'No se ha especificado ningún usuario',tipo : 'Error', tit : 'Faltan par&aacute;metros'});
  //   else
  if (obj.feccon && obj.feccon.length > 10)
    obj.feccon = obj.feccon.substr(0, 10);

  obj.modo = 'JSON';

  invocaAjax({
    direccion: '/newintra/newintra/1/es/xwi_datos_usuario.lista_usuario.json',
    parametros: {
      p_codusr: obj.codusr ? obj.codusr : '',
      p_fecbaj: obj.fecbaj ? obj.fecbaj : '',
      p_modo: obj.modo ? obj.modo : '',
      p_ndatos: obj.ndatos ? obj.ndatos : '',
      p_codemp: obj.codemp ? obj.codemp : '',
      p_coddiv: obj.coddiv ? obj.coddiv : '',
      p_codsdv: obj.codsdv ? obj.codsdv : '',
      p_coddep: obj.coddep ? obj.coddep : '',
      p_tipdep: obj.tipdep ? obj.tipdep : '',
      p_codapl: obj.codapl ? obj.codapl : '',
      p_feccon: obj.feccon ? obj.feccon : '',
      p_filtro: obj.filtro ? obj.filtro : '',
      p_dniusr: obj.dniusr ? obj.dniusr : '',
      p_fncr: obj.fncr ? obj.fncr : '',
      p_nombre: obj.nombre ? obj.nombre : '',
      p_externo: obj.externo ? obj.externo : '',
      p_inicio: obj.inicio ? obj.inicio : '',
      p_fin: obj.fin ? obj.fin : '',
      p_arean: obj.arean ? obj.arean : ''
    },
    asincrono: false,
    retorno: function (suc, dat, ext) {
      if (suc && dat && dat.dato) {
        datos = dat.dato[0];
      } else if (suc) {
        datos = false;
      }
    }
  });

  return datos;

}

function barraProgreso(obj) { modalPortal({ w: 450, h: 153, url: '/newintra/es/Utilidades/bar.html', args: obj }); }

/*** ***/
function controlLoader() {
  ($('.overlayLoader').css('display').toLowerCase() == 'none') ? $('.overlayLoader').fadeIn("slow") : $('.overlayLoader').fadeOut();
}

function controlCerrarModal() {
  $('body').css('overflow') == 'visible' ? ($('body').css('overflow', "hidden")) : ($('body').css('overflow', "auto"));
}

/* 
* Comprobar tamaño de la pantalla para ocultar o mostrar bien la cabecera.
*/
function comprobarWidth() {

  var notification = window.Notification || window.mozNotification || window.webkitNotification;

  if ($(document).width() > 989) {
    $('.anchoBtnExpandir').removeClass('dn');
  } else {
    $('.anchoBtnExpandir').addClass('dn');
  }

  if (!Moduls.header.user) {
    if ($(document).width() > 769) {
      $('.logoNavbar').css('display', 'block');
      $('.logoNavBar').removeClass('dn');
      $('.search-navbar.lupa').addClass('dn');
      $('.lupaPC').addClass('dn');
      if ('undefined' === typeof notification) {
        $('.divNotificaciones').addClass('dn');
      } else {
        $('.divNotificaciones').removeClass('dn');
      }
      console.log("NO movil");
    } else {
      $('.logoNavbar').css('display', 'none');
      $('.logoNavBar').addClass('dn');
      $('.logoMVL').addClass('dn');
      $('.divNotificaciones').addClass('dn');
      console.log("movil");
    }
  }

  if (Moduls.header.user) {
    if ($(document).width() > 769) {
      $('.divRecordatorios').removeClass('dn');
    } else {
      $('.divRecordatorios').addClass('dn');
      console.log("movil");
    }
  }

  if (Moduls.header.user) {
    if ($(document).width() > 769) {
      $('.name-user-navbar').removeClass('dn');
      $('.title-navbar').removeClass('title-navbarMVL');
      $('.logo').removeClass('logoMVL');
      $('.img-user-navbar').removeClass('img-user-navbarMVL');
      $('.menu-navbar').removeClass('menu-navbarMVL');
      $('#navbarSupportedContent22 .search-navbar').addClass('dn');
      $('.listaMenuApp').removeClass('movil');
      $('.search-navbar.lupa').removeClass('dn');
      $('.lupaPC').removeClass('dn');
      console.log("NO movil");
    } else {
      $('.logoNavbar').css('display', 'block');
      $('.logoNavBar').removeClass('dn');
      $('.logoMVL').removeClass('dn');
      $('.name-user-navbar').addClass('dn');
      $('.search-navbar.lupa').addClass('dn');
      $('.lupaPC').addClass('dn');
      $('.title-navbar').addClass('title-navbarMVL');
      $('.img-user-navbar').addClass('img-user-navbarMVL');
      $('.menu-navbar').addClass('menu-navbarMVL');
      $('#navbarSupportedContent22 .search-navbar').removeClass('dn');
      $('.listaMenuApp').addClass('movil');
      console.log("movil");
    }
  }
}

function comprobarHeight() {
  if ($(document).height() > 730) {
    $('.login-form-container').css('overflow-y', 'hidden');
  } else {
    $('.login-form-container').css('overflow-y', 'scroll');
  }
}


/** Funcion para saber si es IE */
function esFirefox() {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  return isFirefox;
};
/** Funcion para saber si es IE */
function esInternetExplorer() {
  var esIE = false;
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    esIE = true;
  }
  return esIE;
};
//cerrar modales para ie
function cerrarModalIE(miModal) {
  if (esInternetExplorer()) {
    miModal.removeClass('fade');
    $('.modal-overlay').hide();
    miModal.hide();
  } else
    miModal.modal('hide');
};


function ponerIcono(dato) {
  var icono = "";
  switch (dato) {
    case 'Recursos Humanos':
      icono = "rrhh";
      break;
    case 'Autoservicio':
      icono = "social";
      break;
    case 'Utilidades':
      icono = "utilidades";
      break;
    case 'Administración':
      icono = "administracion";
      break;
    case 'Mis datos':
      icono = "yo";
      break;
    case 'Acción Social':
      icono = "social";
      break;
    case 'Formación':
      icono = "formacion";
      break;
    case 'Aplicaciones':
      icono = "aplicaciones";
      break;
    case 'Beneficios':
      icono = "beneficios-blanco";
      break;

    default:
      icono = "globalia";
      break;
  }
  return icono;
};

function validaErroresCbk(d, h) {
  h = h || false;
  if (esArray(d)) {
    var errormsg = '';
    for (var i = 0; i < d.length; i++) {
      switch (d[i].type) {
        case 'required':
          errormsg += (errormsg ? '<br>' : '') + d[i].label + ': El valor no puede ser nulo';
          break;
        case 'invalid':
          errormsg += (errormsg ? '<br>' : '') + d[i].label + ': No es válido';
          break;
        case 'NaN':
          errormsg += (errormsg ? '<br>' : '') + d[i].label + ': No es un número';
          break;
        case 'NaD':
          errormsg += (errormsg ? '<br>' : '') + d[i].label + ': Formato fecha erróneo';
          break;
        default:
          errormsg += (errormsg ? '<br>' : '') + resuelveError(d);
      }
    }
    toast({ tipo: 'error', msg: errormsg, donde: ((h === true) ? '.modal-header' : '') });
  } else
    toast({ tipo: 'error', msg: resuelveError(d), donde: ((h === true) ? '.modal-header' : '') });
}

/*** Inicio Analytics ***/
var googleAnalytics = ((top.location.hostname.toLowerCase() === 'intranet.globalia-corp.com') ? 'UA-21880585-3' : '');
try {
  if (googleAnalytics && googleAnalytics != '' && googleAnalytics != 'no') {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', googleAnalytics]);
    _gaq.push(['_trackPageview']);
    (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  }
} catch (e) { true; }

function buscarUsuario(obj) {

  if (!obj.fnc && obj.fnc instanceof Function) throw "Función de retorno para 'buscarUsuario' no definida";
  obj.areano = obj.areano || '';
  obj.codapl = obj.codapl || '';
  obj.coddep = obj.coddep || '';
  obj.coddiv = obj.coddiv || '';
  obj.codemp = obj.codemp || '';
  obj.codsdv = obj.codsdv || '';
  obj.dniusr = obj.dniusr ? "%" + obj.dniusr : '';
  obj.extern = obj.extern || 'N';
  obj.fecbaj = obj.fecbaj || 'N';
  obj.feccon = obj.feccon || sysdate('dd/mm/yyyy');
  obj.filtro = obj.filtro || '00';
  obj.inicio = obj.inicio || '1';  //Esto pertenece a la navegación valor por defecto 1
  obj.ndatos = obj.ndatos || 'X';
  obj.nombre = obj.nombre || '';
  obj.sesion = (obj.sesion == 'S') ? obj.sesion : 'N';
  obj.sizres = obj.sizres || '5';  //Esto pertenece a la navegación valor por defecto 5
  obj.tipdep = obj.tipdep || 'F';
  obj.xsid = obj.xsid || top.SESION_ID;

  if (!obj.codusr && obj.sesion == 'N') {
    Moduls.app.child.modal.usersearchparams = {
      p_arean: obj.areano,
      p_dniusr: obj.dniusr,
      p_externo: obj.extern,
      p_fecbaj: obj.fecbaj,
      p_feccon: obj.feccon,
      p_filtro: (obj.extern == 'S') ? '00' : obj.filtro,
      p_modo: "JSON",
      p_ndatos: obj.ndatos,
      p_tipdep: obj.tipdep,
      p_fncr: obj.fnc.name,
      fnc: obj.fnc
    };
    Moduls.app.child.modal.child.modalBody.load({
      url: '/portalapp/modulos/busquedaUsuarios/busquedaUsuarios.html',
      script: true
    });
    construirModal({ title: 'Búsqueda de usuarios', w: '900px' });
  } else {
    var miInvocaAjax = (typeof top.invocaAjax == 'function') ?
      top.invocaAjax :
      (typeof invocaAjax == 'function') ? invocaAjax : alert;
    var date = new Date().getTime();
    var doc = document.activeElement;
    if (doc instanceof FormController) dondeEstoy(doc).loading('busquedaUsuario_' + date, true);
    miInvocaAjax({
      direccion: "/management/mvc-management/controller/newintra.xwi_datos_usuario.lista_usuario.json",
      method: "POST",
      parametros: {
        p_arean: obj.areano,
        p_codapl: obj.codapl,
        p_coddep: obj.coddep,
        p_coddiv: obj.coddiv,
        p_codemp: obj.codemp,
        p_codsdv: obj.codsdv,
        p_dniusr: obj.dniusr,
        p_codusr: obj.codusr,
        p_externo: obj.extern,
        p_fecbaj: obj.fecbaj,
        p_feccon: obj.feccon,
        p_filtro: obj.filtro,
        p_fin: obj.sizres,
        p_inicio: obj.inicio,
        p_ndatos: obj.ndatos,
        p_nombre: obj.nombre,
        p_modo: 'JSON',
        p_sesion: obj.sesion,
        p_tipdep: obj.tipdep
      },
      contentType: 'application/json',
      retorno: function (suc, dat, ext) {
        if (doc instanceof FormController) dondeEstoy(doc).loading('busquedaUsuario_' + date, false);
        if (suc && dat.dato && dat.dato.length > 0) obj.fnc(dat.dato[0]);
      }
    });
  }
}

function buscarSociedad(fnc) {

  Moduls.app.child.modal.companysearchparams = fnc;
  Moduls.app.child.modal.child.modalBody.load({
    url: '/portalapp/modulos/busquedaUsuarios/busquedaSociedad.html',
    script: true
  });
  construirModal({ title: 'Selección de Sociedad', w: '900px' });
}
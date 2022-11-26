<?php
session_start();

/* creamos la estructura de datos que están en momória */
if (!isset($_SESSION['data'])) $_SESSION['data'] = array();
if (!isset($_SESSION['data']['user'])) $_SESSION['data']['user'] = array();

/* inicializamos la variable que contendrá los errores */
#$GLOBALS['__listaExcepciones'] = array();

class sesion {
    public function setUsuario($array) {
        $_SESSION['data']['user'] = $array;
    }

    public function getUsuario() {
        return (isset($_SESSION['data']['user'])?$_SESSION['data']['user']:false);
    }

    public function logOut() {
        $_SESSION['data'] = array();
        $_SESSION['data']['user'] = array();
    }
}

class respuesta {
    private $success = false;
    private $code = 500;
    private $description = 'La petición no ha devuelo nada';
    private $type = 'application';
    private $root = [];

    public function setCode($val) {
        $this->code = (int)$val;
        $this->success = ( $this->code == 200 );
    }
    public function setDescription($val) {
        $this->description = $val;
        $this->root = [];
    }
    public function setDatos($arr) {
        $this->root = $arr;
        $this->description = '';
    }
    public function responde() {
        http_response_code ($this->code);
        echo json_encode(["success" => $this->success, "code" => $this->code, "mensaje" => $this->description, "type"=>$this->type, "root"=> $this->root]);
        #echo "{\"success\":".($this->success?'true':'false').", \"code\":$this->code, \"descripcion\":\"$this->description\"}";
    }

}



# 'success' => false, 'code' => 500, 'description' => 'La petición no ha devuelo nada', 'type' => 'applicationError'

?>
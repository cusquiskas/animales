<?php
    class cliente {
        private $cli_codcli;#int(11)
        private $cli_email; #varchar(100) nullable
        private $cli_nombre;#varchar(100) nullable
        private $cli_apell1;#varchar(100) nullable
        private $cli_telefn;#varchar(100) nullable
        private $cli_postal;#varchar(200) nullable

        private $array;
        private function clearArray() { $this->$array = $this->empty; return 0; }
        public  function getArray()   { return $this->array; }
        private $empty;
        private function emptyClass() { $this->setDatos($this->empty); return 0; }
        private $error;
        public function getListaErrores() { return $this->error; }

        private function setDatos($array) {
            $this->cli_codcli = (isset($array["cli_codcli"])?   (int)$array["cli_codcli"] : null);
            $this->cli_email  = (isset($array["cli_email"]) ?(string)$array["cli_email"]  : null);
            $this->cli_nombre = (isset($array["cli_nombre"])?(string)$array["cli_nombre"] : null);
            $this->cli_apell1 = (isset($array["cli_apell1"])?(string)$array["cli_apell1"] : null);
            $this->cli_telefn = (isset($array["cli_telefn"])?(string)$array["cli_telefn"] : null);
            $this->cli_postal = (isset($array["cli_postal"])?(string)$array["cli_postal"] : null);
            return 0;
        }

        private function getDatos() {
            return array(
                'cli_codcli'=> $this->cli_codcli,
                'cli_email' => $this->cli_email,
                'cli_nombre'=> $this->cli_nombre,
                'cli_apell1'=> $this->cli_apell1,
                'cli_telefn'=> $this->cli_telefn,
                'cli_postal'=> $this->cli_postal
            );
        }

        private function insert() {
            $datos = array(
                0=>array("tipo"=>'s', "dato"=>$this->cli_email),
                1=>array("tipo"=>'s', "dato"=>$this->cli_nombre),
                2=>array("tipo"=>'s', "dato"=>$this->cli_apell1),
                3=>array("tipo"=>'s', "dato"=>$this->cli_telefn),
                4=>array("tipo"=>'s', "dato"=>$this->cli_postal),
                5=>array("tipo"=>'i', "dato"=>$this->cli_codcli),
            );
            $query = "INSERT 
                        INTO CLIENTE 
                             (cli_email,
                              cli_nombre,
                              cli_apell1,
                              cli_telefn,
                              cli_postal,
                              cli_codcli) 
                      VALUES (?,         
                              ?,        
                              ?,         
                              ?,         
                              ?,         
                              ?)";
            $link = new ConexionSistema();
            $link->ejecuta($query, $datos);
            $link->close();
            $this->array = $this->getDatos();
            $this->error = $link->getListaErrores();
            return (($link->hayError())?1:0);
        }

        private function update() {
            $datos = array(
                0=>array("tipo"=>'s', "dato"=>$this->cli_email),
                1=>array("tipo"=>'s', "dato"=>$this->cli_nombre),
                2=>array("tipo"=>'s', "dato"=>$this->cli_apell1),
                3=>array("tipo"=>'s', "dato"=>$this->cli_telefn),
                4=>array("tipo"=>'s', "dato"=>$this->cli_postal),
                5=>array("tipo"=>'i', "dato"=>$this->cli_codcli),
            );
            $query = "UPDATE CLIENTE 
                         SET cli_email  = ?,
                             cli_nombre = ?,
                             cli_apell1 = ?,
                             cli_telefn = ?,
                             cli_postal = ?
                       WHERE cli_codcli = ?";
            $link = new ConexionSistema();
            $link->ejecuta($query, $datos);
            $link->close();
            $this->array = $this->getDatos();
            $this->error = $link->getListaErrores();
            return (($link->hayError())?1:0);
        }

        private function select() {
            $datos = array(
                0=>array("tipo"=>'s', "dato"=>$this->cli_email),
                1=>array("tipo"=>'s', "dato"=>$this->cli_nombre),
                2=>array("tipo"=>'s', "dato"=>$this->cli_apell1),
                3=>array("tipo"=>'s', "dato"=>$this->cli_telefn),
                4=>array("tipo"=>'s', "dato"=>$this->cli_postal),
                5=>array("tipo"=>'i', "dato"=>$this->cli_codcli)
            );
            $query = "select *
                        from CLIENTE
                       where cli_email  = IFNULL(?, cli_email )
                         and cli_nombre = IFNULL(?, cli_nombre)
                         and cli_apell1 = IFNULL(?, cli_apell1)
                         and cli_telefn = IFNULL(?, cli_telefn)
                         and cli_postal = IFNULL(?, cli_postal)
                         and cli_codcli = IFNULL(?, cli_codcli)";
            $link = new ConexionSistema();
            $this->array = $link->consulta($query, $datos);
            $link->close();
            $this->error = $link->getListaErrores();
            return (($link->hayError())?1:0);
        }

        public function save($array) {
            $this->emptyClass();
            $this->setDatos($array);
            if ($this->cli_codcli > 0) {
                return $this->update();
            } else {
                return $this->insert();
            }
        }

        public function give($array) {
            $this->emptyClass();
            $this->clearArray();
            $this->setDatos($array);
            return $this->select();
        }

        function __construct() {
            $this->empty = $this->getDatos();
            return 0;
        }
    }
?>
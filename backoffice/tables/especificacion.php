<?php

    class Especificacion
    {
        private $esp_codesp;    // 	int(11)
        private $esp_codart;    // 	int(11)
        private $esp_peso;      // 	decimal(10,1)
        private $esp_color;     // 	varchar(60)
        private $esp_importe;   // 	decimal(10,3)
        private $esp_beneficio; // 	decimal(10,3)

        private $array;

        private function clearArray()
        {
            $this->$array = $this->empty;

            return 0;
        }

        public function getArray()
        {
            return $this->array;
        }

        private $empty;

        private function emptyClass()
        {
            $this->setDatos($this->empty);

            return 0;
        }

        private $error;

        public function getListaErrores()
        {
            return $this->error;
        }

        private function setDatos($array)
        {
            $this->esp_codesp = (isset($array['esp_codesp']) ? (int) $array['esp_codesp'] : null);
            $this->esp_codart = (isset($array['esp_codart']) ? (int) $array['esp_codart'] : null);
            $this->esp_peso = (isset($array['esp_peso']) ? (float) $array['esp_peso'] : null);
            $this->esp_color = (isset($array['esp_color']) ? (string) $array['esp_color'] : null);
            $this->esp_importe = (isset($array['esp_importe']) ? (float) $array['esp_importe'] : null);
            $this->esp_beneficio = (isset($array['esp_beneficio']) ? (float) $array['esp_beneficio'] : null);

            return 0;
        }

        private function getDatos()
        {
            return [
                'esp_codesp' => $this->esp_codesp,
                'esp_codart' => $this->esp_codart,
                'esp_peso' => $this->esp_peso,
                'esp_color' => $this->esp_color,
                'esp_importe' => $this->esp_importe,
                'esp_beneficio' => $this->esp_beneficio,
            ];
        }

        private function insert()
        {
            $datos = [
                0 => ['tipo' => 'i', 'dato' => $this->esp_codart],
                1 => ['tipo' => 'd', 'dato' => $this->esp_peso],
                2 => ['tipo' => 's', 'dato' => $this->esp_color],
                3 => ['tipo' => 'd', 'dato' => $this->esp_importe],
                4 => ['tipo' => 'd', 'dato' => $this->esp_beneficio],
            ];
            $query = 'INSERT 
                        INTO ESPECIFICACION 
                             (esp_codart,
                              esp_peso,
                              esp_color,
                              esp_importe,
                              esp_beneficio) 
                      VALUES (?,         
                              ?,
                              ?,
                              ?,
                              ?)';
            $link = new ConexionSistema();
            $link->ejecuta($query, $datos);
            $link->close();
            $this->array = $this->getDatos();
            $this->error = $link->getListaErrores();

            return ($link->hayError()) ? 1 : 0;
        }

        private function update()
        {
            $datos = [
                0 => ['tipo' => 'i', 'dato' => $this->esp_codart],
                1 => ['tipo' => 'd', 'dato' => $this->esp_peso],
                2 => ['tipo' => 's', 'dato' => $this->esp_color],
                3 => ['tipo' => 'd', 'dato' => $this->esp_importe],
                4 => ['tipo' => 'd', 'dato' => $this->esp_beneficio],
                5 => ['tipo' => 'i', 'dato' => $this->esp_codesp],
            ];
            $query = 'UPDATE CLIENTE 
                         SET esp_codart = ?,
                             esp_peso = ?,
                             esp_color = ?,
                             esp_importe = ?,
                             esp_beneficio = ?
                       WHERE esp_codesp = ?';
            $link = new ConexionSistema();
            $link->ejecuta($query, $datos);
            $link->close();
            $this->array = $this->getDatos();
            $this->error = $link->getListaErrores();

            return ($link->hayError()) ? 1 : 0;
        }

        private function select()
        {
            $datos = [
                0 => ['tipo' => 'i', 'dato' => $this->esp_codart],
                1 => ['tipo' => 'd', 'dato' => $this->esp_peso],
                2 => ['tipo' => 'i', 'dato' => $this->esp_codesp],
            ];
            $query = 'select *
                        from ARTICULO
                       where esp_codart = IFNULL(?, esp_codart)
                         and esp_peso = IFNULL(?, esp_peso)
                         and esp_codesp = IFNULL(?, esp_codesp)
                         and esp_color = IFNULL(?, esp_color)
                         and esp_importe = IFNULL(?, esp_importe)
                         and esp_beneficio = IFNULL (?, esp_beneficio)';
            $link = new ConexionSistema();
            $this->array = $link->consulta($query, $datos);
            $link->close();
            $this->error = $link->getListaErrores();

            return ($link->hayError()) ? 1 : 0;
        }

        public function save($array)
        {
            $this->emptyClass();
            $this->setDatos($array);
            if ($this->cli_codcli > 0) {
                return $this->update();
            } else {
                return $this->insert();
            }
        }

        public function give($array)
        {
            $this->emptyClass();
            $this->clearArray();
            $this->setDatos($array);

            return $this->select();
        }

        public function __construct()
        {
            $this->empty = $this->getDatos();

            return 0;
        }
    }

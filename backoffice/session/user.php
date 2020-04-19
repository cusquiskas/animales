<?php
class Usuario
{
	private $usr_codusr;
	private $usr_nombre;
    private $usr_admin;
	private $usr_activo;
	private $usr_email;

	public function getCodusr() { return $this->usr_codusr; }
	public function getNombre() { return $this->usr_nombre; }
	public function getAdmin()  { return $this->usr_admin; }
	public function getActivo() { return $this->usr_activo; }
	public function getEmail()  { return $this->usr_email; }
	
	public function setCodusr($valor) { $this->usr_codusr =    (int)$valor; }
	public function setNombre($valor) { $this->usr_nombre = (string)$valor; }
	public function setAdmin($valor)  { $this->usr_admin  =    (int)$valor; }
	public function setActivo($valor) { $this->usr_activo =    (int)$valor; }
	public function setEmail($valor)  { $this->usr_email  = (string)$valor; }

	public function setDatos($array)
	{
		$this->setCodusr($array["usr_codusr"]);
		$this->setNombre($array["usr_nombre"]);
		$this->setAdmin ($array["usr_admin"]);
		$this->setActivo($array["usr_activo"]);
		$this->setEmail ($array["usr_email"]);
	}
	public function getDatos()
	{
		return array (
			'usr_codusr' => $this->getCodusr(),
			'usr_nombre' => $this->getNombre(),
			'usr_admin'  => $this->getAdmin(),
			'usr_activo' => $this->getActivo(),
			'usr_email'  => $this->getEmail()
		);
	}

	private function recupera()
	{
		$array = array (
		  0 => array ("tipo" => "s", "dato" => $this->getEmail())
		);
		$query = "select *
   		            from USUARIO
   		           where usr_email = ?";
		$link = new ConexionSistema();
		$reg = $link->consulta($query, $array);
		$link->close();
		return $reg;
	}

	private function login()
	{
		$array = array (
			0 => array ("tipo" => "s", "dato" => $this->getEmail()),
			1 => array ("tipo" => "s", "dato" => $_POST['usr_password'])
		  );
		  $query = "select count(0) cnt
						 from USUARIO
						where usr_email = ?
						  and usr_password = ?";
		  $link = new ConexionSistema();
		  $reg = $link->consulta($query, $array);
		  $link->close();
		  return $reg[0]["cnt"];
	}


	public function valida()
	{
		$datos = $this->recupera();
		if (count($datos) == 1)
		{
			if ($datos[0]['usr_activo'] != 1)
			{
				$this->setCodusr("");
				return array ("success" => false, "code" => -1001, "description" => "¡Tu licencia está caducada!", "type" => "sessionError");
			}
			else
			{
				if ($this->login() === 1)
				{
					$this->setDatos($datos[0]);
					$_SESSION['data']['user']['id'] = $this->getEmail();
					return array ("success" => true, "code" => 0, "description" => "Petición aceptada", "type" => "applicationResponse", "data" => $this->getDatos());
				}
				else
				{
					return array ("success" => false, "code" => -1003, "description" => "Login rechazado", "type" => "applicationResponse", "data" => $e);
				}
			}
		}
		else
		{
			$this->setEmail("");
			return array ("success" => false, "code" => -1000, "description" => "¡No tienes licencia!", "type" => "sessionError");
		}
	}

	public function logout()
	{
		unset ($_SESSION['data']);
		$this->setEmail("");
		return array ("success" => true, "code" => 0, "description" => "Petición aceptada", "type" => "applicationResponse", "data" => array ());
	}

	function __construct()
	{
		if (isset ($_SESSION['data']['user']['id']))
			$this->setEmail($_SESSION['data']['user']['id']);
		$this->setDatos($this->recupera()[0]);
	}

}


?>
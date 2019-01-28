<?php
session_start();
error_reporting(E_ALL & ~E_NOTICE);
require_once 'conect/conf.php';  #información crítica del sistema
require_once 'conect/dao.php';   #control de comunicación con la base de datos MySQL
require_once 'session/init.php'; #control de inicialización de las variables de sesión
require_once 'session/user.php'; #control de Usuario de sesión

# $response tiene que ser una clase, obviamente
$response = array ("success" => false, "code" => -1001, "description" => "La petición no ha devuelo nada", "type" => "applicationError");
# OJO => $pas = $_GET['id_password']; en session/user.php
if ($_GET)
{
    $request = $_GET;
    $session = new Usuario();
    if ($session->getIdMaquinista() != "" || ($request["action"] && $request["action"] === "login"))
    {
        switch ($request["action"]) {
            case "una":
                $response = array ("success" => true, "code" => 0, "description" => "Petición aceptada", "type" => "applicationResponse", "data" => array ());
                break;
            case "login":
                $session->setDatos($request);
                $response = $session->valida();
                break;
            case "logout":
                $response = $session->logout();
                break;
            case "quien_soy":
                $response = array ("success" => true, "code" => 0, "description" => "Petición aceptada", "type" => "applicationResponse", "data" => array ($session->getDatos()));
                break;
            default:
                $response = array ("success" => false, "code" => -9001, "description" => "Usa las palabras adecuadas", "type" => "communicationError");
        }
    }
    else
        $response = array ("success" => false, "code" => -1002, "description" => "No te conozco", "type" => "sessionError");

}
else
    $response = array ("success" => false, "code" => -9000, "description" => "A mi me hablas bien", "type" => "communicationError");
echo json_encode($response);
?>
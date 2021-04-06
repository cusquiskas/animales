<?php

session_start();
error_reporting(E_ALL & ~E_NOTICE);
header('Content-Type: application/json; charset=utf-8');

require_once 'conect/conf.php';  //información crítica del sistema
require_once 'conect/dao.php';   //control de comunicación con la base de datos MySQL
require_once 'session/init.php'; //control de inicialización de las variables de sesión
require_once 'session/user.php'; //control de Usuario de sesión

// $response tiene que ser una clase, obviamente
$response = ['success' => false, 'code' => -1001, 'description' => 'La petición no ha devuelo nada', 'type' => 'applicationError'];
if ($_POST) {
    $request = $_POST;

    switch ($request['accion']) {
        case 'articulos':
            require 'tables/articulo.php';
            $articulo = new Articulo();
            $lista = $articulo->give($request);
            if ($request['todos'] && $request['todos'] = 'S') {
                require 'tables/especificacion.php';
                $especificacion = new Especificacion();
                for ($i = 0; $i < count($articulo); ++$i) {
                    $articulo[$i]['especificacion'] = $especificacion->give(['esp_codart' => $articulo[$i]['art_codart']]);
                }
            }
            break;
    }
}
echo json_encode($response);

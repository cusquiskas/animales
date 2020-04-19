<?php
/* creamos la estructura de datos que están en momória */
if (!isset($_SESSION['data'])) $_SESSION['data'] = array();
if (!isset($_SESSION['data']['user'])) $_SESSION['data']['user'] = array();

/* inicializamos la variable que contendrá los errores */
#$GLOBALS['__listaExcepciones'] = array();
?>
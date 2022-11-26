<?php require_once 'backoffice/function.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Animales Fantásticos y qué darles de comer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon"       href="frontoffice/css/img/multipiensos.ico" type="image/png" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="<?php echo Cache::ruta('frontoffice/css/style.css'); ?>">
</head>
<body class="d-flex flex-column min-vh-100">
    <template id="header"></template>
    <template id="body" class="wrapper flex-grow-1"></template>
    <template id="footer" class="align-bottom"></template>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="frontoffice/js/jquery-3.3.1.min.js"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/funciones.js'); ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/peticionAjax.js'); ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/controller.js'); ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/scripts.js'); ?>"></script>
</body>
</html>
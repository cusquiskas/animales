<?php require_once 'backoffice/function.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Animales Fantásticos y qué darles de comer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon"       href="frontoffice/css/img/multipiensos.ico" type="image/png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"></head>
    <link rel="stylesheet" type="text/css" media="screen" href="<?php echo Cache::ruta('frontoffice/css/style.css'); ?>">
</head>
<body class="d-flex flex-column min-vh-100">
    <template id="header"></template>
    <template id="body" class="wrapper flex-grow-1"></template>
    <template id="footer" class="align-bottom"></template>

    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script src="frontoffice/js/jquery-3.3.1.min.js"></script>-->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/funciones.js'); ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/peticionAjax.js'); ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/controller.js'); ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/scripts.js'); ?>"></script>
</body>
</html>
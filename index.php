<?php require_once "backoffice/function.php"; ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Animales Fantásticos y qué darles de comer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="frontoffice/css/style.css">
</head>
<body>
    <template id="header"></template>
    <template id="app"></template>
    
    <script src="<?php echo Cache::ruta('frontoffice/js/jquery-3.3.1.min.js'); ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/funciones.js');    ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/peticionAjax.js'); ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/controller.js');   ?>"></script>
    <script src="<?php echo Cache::ruta('frontoffice/js/scripts.js');      ?>"></script>
</body>
</html>
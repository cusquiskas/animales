<?php

 require_once 'conect/conf.php';  //información crítica del sistema
class Cache
{
    public function ruta($url)
    {
        $timestamp = '';
        $conf = new ConfiguracionSistema();
        $pa = $conf->getHome().$url;
        unset($conf);
        if (file_exists($pa)) {
            $timestamp = filectime($pa);
        }

        return "$url?$timestamp";
    }
}

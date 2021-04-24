<?php
    set_error_handler( "log_error" );
    set_exception_handler( "log_exception" );
    ini_set( "display_errors", "off" );
    
    class error {
        private $array;


        function __construnct() {
            $this->array = array (
                    -1000 => array (
                        "es" => "mensaje en castellano"
                    )
                );
        }
    }
?>
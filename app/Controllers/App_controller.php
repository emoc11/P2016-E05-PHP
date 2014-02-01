<?php
class App_controller{


    function __construct(){

    }

    function home(){
        echo View::instance()->render('main.html');
    }

    function image_punching($f3){
        if($_FILES['files']['error'] == 0) {
            \Web::instance()->receive(function($file){
                    $f3=\Base::instance();
                    if($file['size'] > (2 * 1024 * 1024)){ // if bigger than 2 MB
                        $f3->set('image_punching_retour','Erreur : le fichier est > 2Mb.');
                        return false;
                    }
                    else {
                        $f3->set('image_punching_name',$_FILES['files']['name']);
                        $f3->set('image_punching_retour',"L'envoi s'est bien déroulé.");
                        return true;
                    }

                },
                true, // overwrite
                false // rename to UTF-8 save filename
            );
        } else {
            $f3->set('image_punching_retour',"Erreur : une erreur est sruvenue lors de l'envoi de l'image.");
        }

        echo View::instance()->render('main.html');
    }

    /* Autres controllers */


}
?>
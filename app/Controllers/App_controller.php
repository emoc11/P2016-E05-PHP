<?php
class App_controller{


    function __construct(){

    }

    function home(){
        echo View::instance()->render('main.html');
    }

    function image_punching($f3){
        if($_FILES['files']) {
            
            $web=\Web::instance();
            $file = $_FILES["files"]['tmp_name'];

            // Mise en place de la route
            $f3->set('UPLOADS',$f3->get('TEMP'));
            $f3->route('PUT /upload/@filename',
                function() use($web) { $web->receive(); }
            );

            // Upload de l'image
            $f3->mock('PUT /upload/'.basename($file),NULL,NULL,$f3->read($file));

            // Vérification de l'upload + reussite
            if(is_file($target=$f3->get('UPLOADS').basename($file))) { 
                $f3->set('image_punching_retour', 'Uploaded file done via PUT');
                $f3->set('image_punching_path', $target);
                @unlink($target);
            }
            else {
                $f3->set('image_punching_retour', "Un problème est survenu lors de l'upload de l'image. Veuillez réessayer.");
            }

            echo View::instance()->render('main.html');

        } else {
            echo View::instance()->render('main.html');
        }
    }

    /* Autres controllers */


}
?>
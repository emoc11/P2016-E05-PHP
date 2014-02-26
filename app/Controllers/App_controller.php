<?php
class App_controller extends Controller{


    function __construct(){

    }
    
    function home($f3){
        $this->tpl=array('render'=>'template.html');
    }

    function punching($f3){
        $params['users_id'] = 1;
        $f3->set('url_image',$this->model->getPunchImg(array('users_id'=>$params['users_id'])));
        $this->tpl=array('render'=>'punching.html');
    }
    
    function calendrier($f3){
        $params['couples_id'] = 1;
        $f3->set('calendar_name',$this->model->calendrier(array('couples_id'=>$params['couples_id'])));
        $this->tpl=array('render'=>'calendrier.html');
    }
    
    function infos($f3){
        $this->tpl=array('render'=>'infos.html');
    }
    
    function wishlist($f3){
        $this->tpl=array('render'=>'wishlist.html');
    }
    
    function album($f3){
        $this->tpl=array('render'=>'album.html');
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

        $this->tpl=array('render'=>'punching.html');
    }





    /* Autres controllers */


}
?>
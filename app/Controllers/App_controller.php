<?php
class App_controller{


    function __construct(){

    }

    function home(){
    echo View::instance()->render('main.html');
    }

    function image_punching($f3){
        if(isset($_FILES['files']))
        {
            $error = false;
            $files = array();

            $uploaddir = '../Views/img/';
            foreach($_FILES as $file)
            {
                if(move_uploaded_file($file['tmp_name'].$file['name'], $uploaddir.basename($file['name'])))
                {
                  $files[] = $uploaddir.$file['name'];
                }
                else
                {
                    $error = true;
                }
            }
            $data = ($error) ? array('error' => 'There was an error uploading your files') : array('files' => $files);
        }
        else
        {
            $data = array('success' => 'Form was submitted', 'formData' => $_POST);
            print_r("<h1>test</h1>");
        }
     
        echo json_encode($data);
        echo View::instance()->render('main.html');
    }

    /* Autres controllers */


}
?>
<?php
$f3=require('lib/base.php');
$f3->config('config/config.ini');
$f3->config('config/routes.ini');

//$f3->set('dB',new DB\SQL('mysql:host=127.0.0.1;port=8889;dbname=uandme','root','root'));


$f3->run();
?>
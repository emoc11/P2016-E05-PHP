<?php

namespace REST;

class users extends \REST\api{
  
  public function get($f3){
    echo "<script>console.log('->..GET..<-');</script>";
    $dB=new \DB\SQL('mysql:host='.$f3->get('db_host').';port=8889;dbname='.$f3->get('db_server'),$f3->get('db_login'),$f3->get('db_password'));

    //ONLINE
    //$this->dB=new \DB\SQL('mysql:host=localhost;dbname=u&me','root','010090');

    $mapper=new \DB\SQL\Mapper($dB,'users');
    $f3->set('users',$mapper->find(array(),array('order'=>'pseudo')));
    $this->tpl='views/users.json';
  }
  
  public function post($f3){
    echo "<script>console.log('->..POST..<-');</script>";
  }
  
  public function put($f3){
    echo "<script>console.log('->..PUT..<-');</script>";
  }
  
  public function delete($f3){
    echo "<script>console.log('->..DELETE..<-');</script>";
  }
  
  
  
}
?>
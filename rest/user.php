<?php

namespace REST;

class user extends \REST\api{
  
  function get($f3){
    $f3->set('user_id',$f3->get('PARAMS.id'));
    echo $f3->get('PARAMS.id');
    $dB=new \DB\SQL('mysql:host='.$f3->get('db_host').';port=8889;dbname='.$f3->get('db_server'),$f3->get('db_login'),$f3->get('db_password'));

    //ONLINE
    //$this->dB=new \DB\SQL('mysql:host=localhost;dbname=u&me','root','010090');

    $mapper=new \DB\SQL\Mapper($dB,'users');
    $f3->set('user',$mapper->find(array('users_id=?',$f3->get('user_id')),array('order'=>'pseudo')));
    $this->tpl='views/users.json';
  }
  
  function post($f3){
  }
  
  function put($f3){
  }
  
  function delete($f3){
  }
  
  
  
}
?>
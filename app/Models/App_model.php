<?php
class App_model extends Model{
  
  
  function __construct(){
    parent::__construct();
  }
  
  function home(){
    
  }
  
  function image_punch($f3,$params){
    return $this->getMapper('images_util')->insert('');
  }
  
}
?>
<?php
class Controller{
  
protected $tpl;
protected $model;

  function beforeroute(){
    $model=substr(get_class($this),0,strpos(get_class($this),'_')+1).'model';
    if(class_exists($model)){
      $this->model=new $model();
    }
  }
  
  
  function afterroute($f3){
    $mimeTypes=array('html'=>'text/html','json'=>'application/json');
    $tpl=$this->tpl['render'];
    echo View::instance()->render($tpl);
  } 
  
}
?>
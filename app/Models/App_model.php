<?php
class App_model extends Model{
  
	function __construct(){
		parent::__construct();
	}

	function getPunchImg($params){
		return $this->getMapper('users')->find(array('users_id=?',$params['users_id']));
	}
}
?>
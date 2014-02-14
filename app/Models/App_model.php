<?php
class App_model extends Model{
  
	function __construct(){
		parent::__construct();
	}

	function getPunchImg($params){
		$find = $this->getMapper('users')->find(array('users_id=?',$params['users_id']), array("limit"=>1));
		if(isset($find) && !empty($find)):
			return $find[0]['img'];
		endif;
	}

	function calendrier($params){
		$find = $this->getMapper('calendar')->find(array('couples_id=?',$params['couples_id']), array("limit"=>1));
		if(isset($find) && !empty($find)):
			return $find[0]['name'];
		endif;
	}
}
?>
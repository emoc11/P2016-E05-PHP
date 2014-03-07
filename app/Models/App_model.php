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
	
	function inscription($f3){
		if($f3->get('POST.password')==$f3->get('POST.password_confirm')){
			$user=$this->getMapper('users');
	    	$user->email      = $f3->get('POST.identifiant');
			$user->password   = $f3->get('POST.password');
			$user->gender    = $f3->get('POST.sexec');
			$user->img		=$f3->get('POST.profilePic');
			$user->save();
		}	
	}
	
	function login ($f3,$id,$pw){
		$db=new DB\SQL('mysql:host='.$f3->get('db_host').';port=8889;dbname='.$f3->get('db_server'),$f3->get('db_login'),$f3->get('db_password'));
		$user=new DB\SQL\Mapper($db,'users');
		$auth = new \Auth($user, array(
			'id'=>'email',
			'pw'=>'password')
		);
		if($auth){
			echo("CONNECTED");
		}
		
		// just create an object
		new \DB\SQL\Session($db);

		$f3->set('SESSION.mail',$id);
		echo $f3->get('SESSION.mail');
	}
}
?>
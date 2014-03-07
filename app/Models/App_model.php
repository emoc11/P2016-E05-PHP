<?php
class App_model extends Model{
  
	function __construct(){
		parent::__construct();
	}

	function getPunchImg($f3){
		$find = $this->getMapper('users')->find(array('users_id=?',$f3->get('SESSION.id_toi')), array("limit"=>1));
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
	
	function login ($f3,$mail,$pw){
		$db=new DB\SQL('mysql:host='.$f3->get('db_host').';port=8889;dbname='.$f3->get('db_server'),$f3->get('db_login'),$f3->get('db_password'));
		$user=new DB\SQL\Mapper($db,'users');
		$auth = new \Auth($user, array(
			'id'=>'email',
			'pw'=>'password')
		);
		if($login_true = $auth->login($mail,$pw)){
			new \DB\SQL\Session($db);
			$f3->set('SESSION.mail',$mail);
			$res = $this->getMapper('users')->find(array('email=?',$mail), array("limit"=>1));
			if(isset($res[0]) && $res[0] != 'undefined') {
				$f3->set('SESSION.id_moi',$res[0]['users_id']);
				$f3->set('SESSION.pseudo',$res[0]['pseudo']);
				
				if($res[0]['gender'] == "m" ) {
					$res_cpl = $this->getMapper('couples')->find(array('homme=?',$res[0]['users_id']), array("limit"=>1));
					
					if(isset($res_cpl[0]) && $res_cpl[0] != 'undefined'){
						echo("FEMME -> ".$res_cpl[0]['femme']);
						$f3->set('SESSION.id_toi',$res_cpl[0]['femme']);
					}
				} else if($res[0]['gender'] == "f") {
					$res_cpl = $this->getMapper('couples')->find(array('femme=?',$res[0]['users_id']), array("limit"=>1));
					
					if(isset($res_cpl[0]) && $res_cpl[0] != 'undefined'){
						echo("HOMME -> ".$res_cpl[0]['homme']);
						$f3->set('SESSION.id_toi',$res_cpl[0]['homme']);
					}
				}
			}

		}
		
	}
	
	
}
?>
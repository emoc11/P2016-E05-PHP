$(document).ready(function(){
	var score = 0;
	var started=false;
	var rage;
	$("#send").hide();
	$("#punch").on('click',function(){
		rage="punch";
		game();
	});
	$("#kiss").on('click',function(){
		rage="bisou";
		game();
	});
	
	function game(){
		$(".flechette").remove();
		$("#send").hide();
		score = 0;
		$("#punching_score").text(score);
		started=true;
		$("#punching_start").hide();
		if(rage=="bisou"){
			$("#punching_img").css('cursor','help');
		}
		else{
			$("#punching_img").css('cursor','url(\'app/Views/img/fleche.png\'),help');
		}		
		setTimeout(function(){
			$("#punching_start").show();
			$("#send").show();
			started=false; }
			, 5000);
	}
	$("#punching_img").on('click',function(e){
		var parentOffset = $(this).offset();
		if(started==false){
			//window.alert("le jeu n'a pas commencé");
		}
		else{
			score++;
			$("#punching_score").text(score);
			if(rage=="bisou"){
				$("#punching_jeu").append("<img src=\"app/Views/img/bisou.png\" class=\"flechette\" id=\"flechette"+score+"\"/>");
				$("#flechette"+score+"").css('left',e.pageX-parentOffset.left).css('top',e.pageY-parentOffset.top+61);
			}
			else{
				$("#punching_jeu").append("<img src=\"app/Views/img/flechee.png\" class=\"flechette\" id=\"flechette"+score+"\"/>");
				$("#flechette"+score+"").css('left',e.pageX-parentOffset.left).css('top',e.pageY-parentOffset.top+61);
			}
		}
	});

});
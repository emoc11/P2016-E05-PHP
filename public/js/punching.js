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
		$("#punching_scorep").text(score);
		started=true;
		$("#kiss").hide();
		$("#punch").hide();
		if(rage=="bisou"){
			$("#punching_img").css('cursor','help');
		}
		else{
			$("#punching_img").css('cursor','url(\'app/Views/img/fleche.png\'),help');
		}		
		gameTimer = setTimeout(function(){
			$("#kiss").show();
			$("#punch").show();
			$("#send").show();
			started=false; }
			, 15000);
			
		var sec = 14
		var mTimer = setInterval(function() {
			$('#punching_timingp').text(sec--);
			if (sec ==-1) {
				clearInterval(mTimer);
			}
		}, 1000);
	}
	$("#punching_img").on('click',function(e){
		var parentOffset = $(this).offset();
		if(started==false){
			//window.alert("le jeu n'a pas commencé");
		}
		else{
			score++;
			$("#punching_scorep").text(score);
			//$("#punching_timing").text(gameTimer);
			if(rage=="bisou"){
				$("#punching_jeu").append("<img src=\"app/Views/img/bisou.png\" class=\"flechette\" id=\"flechette"+score+"\"/>");
				$("#flechette"+score+"").css('left',e.pageX-15).css('top',e.pageY-9);
			}
			else{
				$("#punching_jeu").append("<img src=\"app/Views/img/flechee.png\" class=\"flechette\" id=\"flechette"+score+"\"/>");
				$("#flechette"+score+"").css('left',e.pageX).css('top',e.pageY);
			}
		}
	});

});
$(document).ready(function(){
	var score = 0;
	var started=false;
	$("#punching_start").on('click',function(){
		window.alert('GO');
		started=true;
		$("#punching_start").hide();
		setTimeout(function(){
			$("#punching_start").show();
			started=false; }
			, 8000);
	});

	$("#punching_img").on('click',function(e){
		var parentOffset = $(this).offset();
		if(started==false){
			//window.alert("le jeu n'a pas commencé");
		}
		else{
			score++;
			$("#punching_score").text(score);
			$("#punching_jeu").append("<img src=\"app/Views/img/flechette.png\" class=\"flechette\" id=\"flechette"+score+"\"/>");
			// window.alert(parseInt(e.pageX-parentOffset.left)+','+parseInt(e.pageY-parentOffset.top));
			$("#flechette"+score+"").css('left',e.pageX-parentOffset.left-37).css('top',e.pageY-parentOffset.top);
		}
	});

});
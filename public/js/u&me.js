$(document).ready(function(){
	
	/*NAV
	hover et page active
	*/
	
	var parent=$(".active").parent();
	$(".active").css('height','80px');
	$(".active").css('width','80px');
	$(".active").css('margin-left','5px');
	$(".active").css('margin-top','0px');
	$(".active").css('margin-bottom','0px');
	/* $(".active").css('background-image','url(\'app/Views/img/tabouH.png\')'); */
	
	$("#btn_profilePic").click(function () {
    	$("#upload_profilePic").trigger('click');
    });
    
    $("#btn_bgPic").click(function () {
    	$("#upload_bgPic").trigger('click');
    });
    
    /*INFOS
    focus/blur 
    */
    
   /*
 $('#nom').click(function(){
    	$('.required:nth-child(2)').hide();
    });
    
    $('#nom').blur(function(){
    	$('.required:nth-child(2)').show();
    });
*/

	/*PUNCHING BALL - KISS
	Mécanique et options du jeu
	*/

	var score = 0;
	var started=false;
	var rage;
	
	$("#pop_send").hide();
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
		$("#kiss").attr("disabled", true);
		$("#punch").attr("disabled", true);
		if(rage=="bisou"){
			$("#punching_img").css('cursor','url(\'app/Views/img/bisou.png\'),help');
		}
		else{
			$("#punching_img").css('cursor','url(\'app/Views/img/fleche.png\'),help');
		}		
		gameTimer = setTimeout(function(){
			$("#send").show();
			$("#pop_send").show();
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
				$("#flechette"+score+"").css('left',e.pageX).css('top',e.pageY);
			}
			else{
				$("#punching_jeu").append("<img src=\"app/Views/img/flechee1.png\" class=\"flechette\" id=\"flechette"+score+"\"/>");
				$("#flechette"+score+"").css('left',e.pageX).css('top',e.pageY);
			}
		}
	});
	
	$("#pop_send_btn").on('click',function(e){
		$("#pop_send").hide();
		$("#kiss").attr("disabled", false);
		$("#punch").attr("disabled", false);
		$(".flechette").remove();
		score=0;
		$("#punching_scorep").text(score);
	});
	
	
	/*PAGE FANTASMES*/
	var checked=false;
	$(".rdio").click(function(){
		if(checked){
			$(this).css('background-color','transparent');
			checked=false;
		}
		else {
			$(this).css('background-color','rgb(231,76,60)');
			checked=true;
		}
	});
	
	
	/*PAGE JEU COQUIN*/
	var running=false;
	$("#randomize").click(function(){
		if(!running){
		tours_v=8+Math.floor(Math.random()*10);
			vb_fast=setInterval(function(){
				var temp=$("#vb1").text();
				$("#vb1").text($("#vb2").text());
				$("#vb2").text($("#vb3").text());
				$("#vb3").text($("#vb4").text());
				$("#vb4").text($("#vb5").text());
				$("#vb5").text($("#vb6").text());
				$("#vb6").text($("#vb7").text());
				$("#vb7").text(temp);
				tours_v--;
				console.log(tours_v);
				if(tours_v==2){
					clearInterval(vb_fast);
					vb_slow=setInterval(function(){
						var temp2=$("#vb1").text();
						$("#vb1").text($("#vb2").text());
						$("#vb2").text($("#vb3").text());
						$("#vb3").text($("#vb4").text());
						$("#vb4").text($("#vb5").text());
						$("#vb5").text($("#vb6").text());
						$("#vb6").text($("#vb7").text());
						$("#vb7").text(temp2);
						tours_v--;
						console.log(tours_v);
						if(tours_v<=0){
							clearInterval(vb_slow);
							$("#randomize").text("Une zone");
						}
					}, 620);
				}
			}, 320);
		running= !running;
		
		}
		else{
		tours_z=8+Math.floor(Math.random()*10);
			zn_fast=setInterval(function(){
				var temp=$("#zn1").text();
				$("#zn1").text($("#zn2").text());
				$("#zn2").text($("#zn3").text());
				$("#zn3").text($("#zn4").text());
				$("#zn4").text($("#zn5").text());
				$("#zn5").text($("#zn6").text());
				$("#zn6").text($("#zn7").text());
				$("#zn7").text(temp);
				tours_z--;
				console.log(tours_z);
				if(tours_z==2){
					clearInterval(zn_fast);
					zn_slow=setInterval(function(){
						var temp2=$("#zn1").text();
						$("#zn1").text($("#zn2").text());
						$("#zn2").text($("#zn3").text());
						$("#zn3").text($("#zn4").text());
						$("#zn4").text($("#zn5").text());
						$("#zn5").text($("#zn6").text());
						$("#zn6").text($("#zn7").text());
						$("#zn7").text(temp2);
						tours_z--;
						console.log(tours_z);
						if(tours_z<=0){
							clearInterval(zn_slow);
							$("#randomize").text("Rejouer");
						}
					}, 600);
				}
			}, 300);
		running= !running;
			
		}
		
	});
	
	/*PAGE LE CHAT*/{
		
		document.onkeydown = function(evt) {
                evt = evt || window.event;
                switch (evt.keyCode) {
                        case 13:
                            $("#dialog").append("<p class=\"meMessages\">"+$("#nextMsg").val()+"</p>");
                            $("#nextMsg").val('')
                       
                    }
                };
                
		$("#sendMsg").click(function(){
			$("#dialog").append("<p class=\"meMessages\">"+$("#nextMsg").val()+"</p>");
			$("#nextMsg").val('')
		
		});
	}
});
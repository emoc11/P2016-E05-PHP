// $(document).ready(function(){

// 	var files;

// 	// Add events
// 	$('input[type=file]').on('change', function(event) {
// 		files = event.target.files;
// 	});

// 	$("#image_punch").on('submit', function(e){
// 		e.preventDefault();

// 		// Ajoute l'image dans l'objet
// 		var data = new FormData();
// 		$.each(files, function(key, value)
// 		{
// 			data.append(key, value);
// 		});

// 		$.ajax({
// 	        url: "punching-ball?files",
// 	        type: 'POST',
// 	        data: data,
// 	        cache: false,
// 	        dataType: 'json',
// 	        processData: false,
// 	        contentType: false,
// 	        success: function(data, textStatus, jqXHR)
// 	        {
// 	        	if(typeof data.error === 'undefined')
// 	        	{
// 	        		submitForm(event, data);
// 	        	}
// 	        	else
// 	        	{
// 	        		console.log('ERRORS: ' + data.error);
// 	        	}
// 	        },
// 	        error: function(jqXHR, textStatus, errorThrown)
// 	        {
// 	        	console.log('ERRORS: ' + textStatus);
// 	        }
//     	});
// 	});
// });
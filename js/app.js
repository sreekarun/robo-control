(function(window, $, Firebase){

	var roboControl = {};

	var firebaseRef = new Firebase("https://nextg.firebaseio.com/robo");



	$(document).ready(function(){
		$('.control img').on('click', function(){
			var $this = $(this);
			updateFirebase($this.attr('class'));
			
		});

	})

	/*
		updates firebase with the direction. stops after 6 seconds to make sure that the things are under control.

	*/

	function updateFirebase(dir){
		console.log(dir);
		
		firebaseRef.update({'motion': dir });
		setTimeout(function(){
			firebaseRef.update({'motion': 'stop'});
		}, 500 );
	}

	firebaseRef.onDisconnect().update({'motion' : 'stop'});



})(window, jQuery, Firebase)
(function(window, $, Firebase){

	var roboControl = {};

	var firebaseRef = new Firebase("https://nextg.firebaseio.com/robo");



	$(document).ready(function(){
		$('.control img').on('click', function(){
			var $this = $(this);
			updateFirebase($this.attr('class'));
			
		});

	})

	
	$('.speechtext').on('keyup',function(e){
		if(e.keyCode == 13){
			var text = $(this).val();
			text = text.replace('\n','');
			firebaseRef.update({'speak': text });
			$('.speechtext').val('');
		}
	})

	$('.moodtext').on('keyup',function(e){
		if(e.keyCode == 13){
			var text = $(this).val();
			text = text.replace('\n','');
			firebaseRef.update({'mood': text });
			$('.moodtext').val('');
		}
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

	//View objects

	var viewObj = {
		accel: $('.accel'),
		geo: $('.geo'),
		mood: $('.mood'),
		compass : $('.compass')
	}



	//Get the individual information from the firebase

	//Get Aceelerometer

	var accelRef = new Firebase("https://nextg.firebaseio.com/robo/accel");

	// Get Geolocation

	var geoRef = new Firebase("https://nextg.firebaseio.com/robo/geolocation");

	// Get Mood
	var moodRef = new Firebase("https://nextg.firebaseio.com/robo/mood");

	// GEt Compass
	var compassRef = new Firebase("https://nextg.firebaseio.com/robo/compass");

	//Subscribe to events and update the view

	accelRef.on ('value',function(snapshot){
		//update the acclerometer  view
		//$(document).trigger('dataChange', [{ 'type': 'accel', 'val': snapshot.val()}]);
		var val = snapshot.val();
		var html = '<div> <ul><li>x : '+ val.x + '</li><li>y : ' + val.y + '</li><li>z : '+ val.z + '</li><li>time : ' + val.time + '</li></ul></div>';
		$(".accel").html(html);
		$(".accel").addClass("active");
		setTimeout(function(){
			$(".accel").removeClass("active");
		},500);


	});
	geoRef.on ('value',function(snapshot){
		//update the acclerometer  view
		//$(document).trigger('dataChange', [{'type': 'geo', 'val': snapshot.val()}]);
		var html, val = snapshot.val();

		html = '<div> <ul><li>accuracy : '+ val.coords.accuracy + '</li><li>latitude: ' + val.coords.latitude + '</li><li>longitude: ' + val.coords.longitude +'</li><li>time: ' + val.timestamp + '</li></ul></div>';
		$(".geo").html(html);
		$(".geo").addClass("active");
		setTimeout(function(){
			$(".geo").removeClass("active");
		},500);

	});
	moodRef.on ('value',function(snapshot){
		//update the acclerometer  view
		//$(document).trigger('dataChange', [{'type': 'mood', 'val': snapshot.val()}]);
		var val = snapshot.val();
		var html = '<div> <ul><li> '+ val + '</li></ul></div>';
		$(".mood").html(html);
		$(".mood").addClass("active");
		setTimeout(function(){
			$(".mood").removeClass("active");
		},500);


	});
	compassRef.on ('value',function(snapshot){
		//update the acclerometer  view
		//$(document).trigger('dataChange', [{'type': 'compass', 'val': snapshot.val()}]);
		var val = snapshot.val();
		var html = '<div> <ul><li>heading : '+ val.magneticHeading + '</li><li>time : ' + val.timestamp + '</li></ul></div>';
		$(".compass").html(html);
		$(".compass").addClass("active");
		setTimeout(function(){
			$(".compass").removeClass("active");
		},500);

	})


	/*$(document).on('dataChange',function(event, data){
		var val = data.val;
		console.log(data);
		var html;

		//viewObj[data.type].html((typeof val ) === "object" ? val.toString(): val)

		switch(data.type){
			case "accel" :
				html = '<div> <ul><li>x : '+ val.x + '</li><li>y : ' + val.y + '</li><li>z: ' + val.z +'</li><li>time: ' + val.time + '</li></ul></div>';
				viewObj[data.type].html(html);

			case "compass" :
				html = '<div> <ul><li>Magnetic Heading : '+ val.magneticHeading + '</li><li>time : ' + val.timestamp + '</li></ul></div>';
				viewObj[data.type].html(html);
		}  

		

	})    */


})(window, jQuery, Firebase)
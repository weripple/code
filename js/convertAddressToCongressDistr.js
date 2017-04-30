convertAddressToCongressDistr = function(address, nextStep){
		//var nextStep = nextStep;
		var userDistrict;

		var geocoder = new google.maps.Geocoder();
		var sunlightAPIkey = '854e52e641044cbc9035ab5e2ccf49be';

		var xmlhttp;
		if (window.XMLHttpRequest) {xmlhttp = new XMLHttpRequest();}
		else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}

		var userLatLng = {};

		geocoder.geocode( {'address': address}, function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {

				userLatLng.lat = results[0].geometry.location.lat(); 
				userLatLng.lng = results[0].geometry.location.lng();	

				xmlhttp.onreadystatechange = function(responseText){
				  if (xmlhttp.readyState==4 && xmlhttp.status==200){
				    var jsonResponse = JSON.parse(xmlhttp.responseText);
				    var stateAbbr = jsonResponse.results[0].state,
				    		districtNum = jsonResponse.results[0].district;
				    userDistrict = stateAbbr + "-" + districtNum;
				    alert("Your Congressional District is: " + userDistrict);
						
							if (nextStep == "sortUser") {
								sortUser(userDistrict, userLatLng);
							}
							else if (nextStep == "updateSortUser"){
								updateSortUser(userDistrict, address, userLatLng);
							}
				    }
		  	}
				xmlhttp.open(
					"GET",
					'http://congress.api.sunlightfoundation.com/districts/locate?apikey='+ sunlightAPIkey + '&latitude=' + userLatLng.lat + '&longitude=' + userLatLng.lng, true);
				xmlhttp.send();
					}
			else
				alert("Geocoder didn't work for the following reasons: " + status);
		});
	}

	updateSortUser = function(district, address, latLng){
		currentUser.set("userDistrict", district);
		currentUser.set("address", address);
		currentUser.set("LatLng", latLng);
		currentUser.save(null, {
			success: function(currentUser){
				window.location.reload();
			},
			error: function(user, error){
				console.log(error.message);
			}
		});
	};
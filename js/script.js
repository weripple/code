/* global $,document,console */
$(document).ready(function() {

	// Get form parameters from any URL
	$(document).ready(function(){
    var r = /(?:\?|&(?:amp;)?)([^=&#]+)(?:=?([^&#]*))/g;
    var query = r.exec(decodeURIComponent(window.location.href));
    // ^ gets the first query from the url
    while (query != null) {

      //index 0=whole match, index 1=first group(key) index 2=second group(value)

      $("input[name="+ query[1] +"]").attr("value",query[2]);

      query = r.exec(decodeURIComponent(window.location.href));
      // ^ repeats to get next capture

    }
  });

	// *** COMMENT FORM *** // index.html
	$("#commentForm").on("submit", function(event) {
		event.preventDefault();
		// Add comment
	});

findCurrentUser = function(){}

  // *** INVITE USERS *** // inviteUsers.html
  // *** SIGN UP *** // signIn.html
  $("#signUpForm").on("submit", function(event){
		event.preventDefault();

		console.log("Working...");

		var password = $("#password").val();
	  var confirmPassword = $("#confirmPassword").val();
	  var addressWithZip = $("#address").val()+" "+$("#zipcode").val();

	  if (password != confirmPassword)
    	alert("Passwords don't match! Please try again");
    else {
    	/*
		  var query = new Parse.Query(Parse.User);
		  query.equalTo("username", $("#invitedBy").val());
			query.first({
			  success: function(invitedBy) {
			  	//convertAddressToCongressDistr.js
			  	convertAddressToCongressDistr(addressWithZip, "sortUser");
			  	sortUser = function(district, latLng){

			  		dropDistrictRipple(district); //dropRipplesFrom.js

				    var user = new Parse.User();
						user.set("InvitedBy", invitedBy);
						user.set("fname", $("#fname").val());
						user.set("lname", $("#lname").val());
						user.set("username", $("#email").val());
						user.set("email", $("#email").val());
						user.set("password", $("#password").val());
						user.set("userDistrict", district);
						user.set("address", addressWithZip);
						user.set("zipcode", $("#zipcode").val());
						user.set("LatLng", latLng);

						if ( invitedBy == undefined) {
				  		alert("Sign up not Successful. \nUnfortunately, You were not invited by someone within WeRipple. ");
				  		window.location.href= "index.html"

				  	} else {
				  		user.signUp(null, {
							  success: function(user) {

							  	// New RippleFiles (UserRipples) for new userSend

							  	var UserRipples = Parse.Object.extend("UserRipples");
									var newUserRipple = new UserRipples;
									newUserRipple.set("userID", user);
									newUserRipple.set("userEmail", user.get("email"));
									newUserRipple.save();

							  	window.location.href = "verifyemail.html";

							  },
							  error: function(user, error) {

							  }
							});
				  	}
					};
			  },
			  error: function(object, error) {
			  }
			});*/
    }
	});

	// *** DASHBOARD *** // dashboard.html
	/*
	if (currentUser){
		var userDistrict = currentUser.get("userDistrict");
	  var userFName = currentUser.get("fname");
	  var userRipples = currentUser.get("userRipples");
	  $("#userDistrict").html(userDistrict);
		$("#userFName").html(userFName);
		$("#userRipplePoints").html(userRipples);

		var createdAt = currentUser.createdAt;
		$("#createdAt").html(createdAt.toDateString());

		// Find Ripples in user's district
		//var DistrictRipples = Parse.Object.extend("DistrictRipples");
		//var districtQuery = new Parse.Query("DistrictRipples");
		districtQuery.equalTo("District", userDistrict);
		districtQuery.first({
			success: function(districtFile){
				$("#districtRipples").html(districtFile.get("districtRippleScore"));
			},
			error: function(){}
		});

		verifyEmail = function(){
			currentUser.fetch({
			  success: function(currentUser) {
			    var emailVerified = currentUser.get("emailVerified");
					if (emailVerified) {
						if (userRipples == undefined || userRipples == 0){
							dropRipplesFrom(currentUser, true);
						}
					}
					else {
						alert("Please verify email!");
					}
				},
			  error: function(currentUser, error) {
			  }
			});
		};

	}
	*/


});


/* global $,document,console */
$(document).ready(function() {

	// Initilizing Parse
	var parseAPPID = "TZNXi44YP1RF0DKTVY7hyPMIpj1rneGNFuTjKxZD";
	var parseJSID = "1TDkVaaiIrHvpdjtFketDhwGkaJQ4xbNRurDANjl";

	Parse.initialize(parseAPPID, parseJSID);
	
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

		var CommentObject = Parse.Object.extend("CommentObject");

		var data = {};
		data.name = $("#name").val();
		data.email = $("#email").val();
		data.comments = $("#comment").val();

		var comment = new CommentObject();
		comment.save(data, {
			success:function() {
				alert("Thanks for reaching out. Someone will get back to you shortly!");
				$("#commentForm").trigger("reset");
			},
			error:function(error) {
				console.dir(error);
			}

		});
	});
//	*** SIGN OUT ***
signUserOut = function(){
	Parse.User.logOut();
	window.location.href = "signIn.html";
};
	// *** SIGN IN *** // signIn.html 
	currentUser = Parse.User.current();
findCurrentUser = function(){
		if (currentUser) {
			window.location.href = "dashboard.html";
		}
	};	
  $("#signInForm").on("submit", function(event){
		event.preventDefault();

		var username = $("#username").val(),
				password = $("#password").val();

		Parse.User.logIn(username, password, {
		  success: function(user) {
		    console.log("Successful login!");
		  	window.location.href = "dashboard.html";
		  },
		  error: function(user, error) {
		    console.log(error);
		    alert("Email or Password is incorrect.");
		    window.location.href = "signIn.html";
		  }
		});
	});

  // *** INVITE USERS *** // inviteUsers.html
  if (currentUser){

  	$("#invitationForm").on("submit", function(event) {
		event.preventDefault();

			var InvitationObject = Parse.Object.extend("InvitationObject");

			console.log("Sending...");

			var data = {};
			data.sendTo = $("#sendTo").val();
			data.message = $("#message").val();

			var invitation = new InvitationObject();
			invitation.save(data, {
				success:function() {
					console.log("Success");
					alert("Thanks for rippling!");
					$("#invitationForm").trigger("reset");
				},
				error:function(error) {
					console.dir(error);
				}

			});
		});
  }

  // *** SIGN UP *** // signIn.html 

  checkForInvitedBy = function(){
  	if ( $("#invitedBy").val() == "") {
  		alert("Sign up by invitation only!");

  	}
  };
  $("#signUpForm").on("submit", function(event){
		event.preventDefault();

		console.log("Working...");

		var password = $("#password").val();
	  var confirmPassword = $("#confirmPassword").val();
	  var addressWithZip = $("#address").val()+" "+$("#zipcode").val();

	  if (password != confirmPassword) 
    	alert("Passwords don't match! Please try again");
    else {

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
			});
    } 
	});

	// *** DASHBOARD *** // dashboard.html
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
		var DistrictRipples = Parse.Object.extend("DistrictRipples");
		var districtQuery = new Parse.Query("DistrictRipples");
		districtQuery.equalTo("District", userDistrict);
		districtQuery.first({
			success: function(districtFile){
				$("#districtRipples").html(districtFile.get("districtRippleScore"));
			},
			error: function(){}
		});

		// Find Ripples in country
		var query = new Parse.Query(Parse.User);
		query.equalTo("username", "WeRipple (default)"); 
		query.first({
			success: function(userFile) {
				$("#usaRipples").html(userFile.get("userRipples"));
			},
			error: function(file, error) {}
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


});


var currentUser = Parse.User.current().get("name");
var currentUserRipples = 1; // or Parse.User.current().get("userRipples"); 
var query = new Parse.Query(Parse.User);

var findUserRipples = function(username){
	query.equalTo("invitedBy", username); 
	query.find({
		success: function(results) {

			for (var i = 0; i < results.length; i++) {
				var invitedUser = results[i];

				currentUserRipples ++;
				console.log(currentUserRipples, invitedUser.get("name"), i);
				// every 0 for i represents a new ripple lever

				$("#userRipplePoints").html(currentUserRipples);
				findUserRipples(invitedUser.get("name"));
				// updates ripple score in real time

			}		
		}
		// error: function(error) {
		// 	alert("Error: " + error.code + " " + error.message);
		// }
	})
}

findUserRipples(currentUser);

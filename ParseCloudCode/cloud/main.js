var contactForm = require('cloud/mailgun.js');

Parse.Cloud.define("updateRipplerScores", function(request, response){
	Parse.Cloud.useMasterKey();

	var ripplerScore = request.params.ripplerScore,
			userId = request.params.userId;
	
	var query = new Parse.Query(Parse.User);
	query.equalTo("objectId", userId);
	query.first({
	  success: function(user) {
	    user.set("userRipples", ripplerScore);
	    user.save(null, {
	    	success: function(){
	    		console.log(user.get("userRipples"));
	    		response.success();
	    	},
	    	error: function(){
	    		error.message = "cloud messin' up";
	    	}
	    })
	  }
	});
	
});
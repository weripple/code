dropRipplesFrom = function(user, isCurrentUser){
	if (user) {	
		user.fetch({
			success: function(user){
				var UserRipples = Parse.Object.extend("UserRipples");
				var query = new Parse.Query(UserRipples);
				query.include("userID");
				query.equalTo("userID", user); 
				query.first({
					success: function(ripplerFile) {
						
						ripplerFile.increment("rippleScore");
						ripplerFile.save(null, {
						  success: function(ripplerFile) {

						  	var rippleScore =ripplerFile.get("rippleScore");
						  	// console.log(rippleScore);
						    Parse.Cloud.run("updateRipplerScores", {	
						    	ripplerScore: rippleScore,
						    	userId: user.id }, {
							    	success: function(){
											currentUser.fetch({
												success: function(currentUser){
													$("#userRipplePoints").html(currentUser.get("userRipples"));
												},
												error: function(){}
											})
							    	},
							    	error: function(){
							    	}
						    });
						  },
						  error: function(file, error) {
						    alert('Failed : ' + error.message);
						  }
						});

						
						var InvitedBy = user.get("InvitedBy");
						dropRipplesFrom(InvitedBy, false);
						
					},
					error: function(File, error) {
						console.log(error.code+" "+error.message);
					}
				})
			},
			error: function(object, error){
				console.log(error.code+" "+error.message);
			}
		});
	}
};


dropDistrictRipple = function(district){
	var DistrictRipples = Parse.Object.extend("DistrictRipples");
	var districtQuery = new Parse.Query("DistrictRipples");
	districtQuery.equalTo("District", district);
	districtQuery.first({
		success: function(districtFile){
			if(districtFile){
				districtFile.increment("districtRippleScore");
				districtFile.save({
					success: function(districtFile){
						//update map data
					},
					error: function(){}
				});
			} else {
				var districtRipple = new DistrictRipples();
				districtRipple.set("District", district);
				districtRipple.save({
					success: function(){
						dropDistrictRipple(district);
					},
					error: function(){}
				});
			}
		},
		error: function(){}
	});
};

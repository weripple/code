
/* global Parse,console,require */

var Mailgun = require('mailgun');

var mgDomain = "weripple.com";
var mgAPIkey = "key-bf91437d7326d2c691c35e32a595adae";

Mailgun.initialize(mgDomain, mgAPIkey);

Parse.Cloud.beforeSave("CommentObject", function(request, response) {

	var text = "Comment Email\n" + 
		"From: "+request.object.get("name") + "\n"+
		"Email: "+request.object.get("email") + "\n"+
		"Comments:\n" + request.object.get("comment");
		
	
	Mailgun.sendEmail({
			to: request.object.get("email"),
			from: request.object.get("email"),
			subject: "WeRipple Comment",
			text: text
		}, {
		success: function(httpResponse) {
			response.success();
		},
		error: function(httpResponse) {
			console.error(httpResponse);
			response.error("Uh oh, something went wrong");
		}
	});

});

Parse.Cloud.beforeSave("InvitationObject", function(request, response) {
 
 		var sendTo = request.object.get("sendTo"),
 				fromName = Parse.User.current().get("fname") + " " + Parse.User.current().get("lname"),
 				fromEmail = Parse.User.current().get("username"),
 				message = request.object.get("message");

    var text = "<h3>Invitation Email</h3>"+
        "<p>From: "+fromName + "</p>"+
        "<p>Email: "+fromEmail + "</p>" +
        "<p>Message:</p>" + message;

    var invitationLink = "http://weripple.com/signUp.html?invitedBy="+ fromEmail+"&email="+sendTo ;

     
    Mailgun.sendEmail({
            to: sendTo,
            from: fromEmail,
            subject: "Ripple invite from " + fromName,
            html: text + "<br>"+ "<a href=" + invitationLink + " >invitation link</a>"
        }, {
        success: function(httpResponse) {
            response.success();
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error("Uh oh, something went wrong");
        }
    });
 
});
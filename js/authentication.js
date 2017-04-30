function checkForRipple() {
	console.log('Checking for ripple...');
// look for user's inviterID
var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
	if (snapshot.val().inviterID) {
		// do nothing
	} else if (thisPage.inviterID) {
		//create new user
		createNewUser(userId, thisPage.inviterID);
		// sign up
	}
	// ...
});

// on sign up attach inviterID
function createNewUser(userId, inviterID) {
	console.log('Creating user ' + userId + ' ' + inviterID);
	firebase.database().ref('users/' + userId).set({
		inviterID: inviterID,
		rippleReach: 0
	});
	ripple(inviterID);
}
}

/**
 * Recurring function to update a person's ripplCount, then "ripple up" to their inviter.
 */
function ripple(userID) {
	console.log('Rippling ' + userID);
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
	  // Find the current user's reach
		var currentReach = snapshot.val().rippleReach;
		// Find the current user's inviter
		var inviterID = snapshot.val().inviterID;
		// Increment the user's reach
		console.log("Incrementing " + currentReach);
		firebase.database().ref('users/' + userId).set({
			rippleReach: currentReach + 1
		});
		// If this person isn't Mary Beth,
		if (inviterID) {
		  // Send this ripple up to their inviter.
			ripple(inviterID);
		}
	});
}

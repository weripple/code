function createRequest() {
  var result = null;
  if (window.XMLHttpRequest) {
    // FireFox, Safari, etc.
    result = new XMLHttpRequest();
    // if (typeof xmlhttp.overrideMimeType != 'undefined') {
    //   result.overrideMimeType('text/xml'); // Or anything else
    // }
  }
  else if (window.ActiveXObject) {
    // MSIE
    result = new ActiveXObject("Microsoft.XMLHTTP");
  } 
  else {
    // No known mechanism -- consider aborting the application
  }
  return result;
}

var req = createRequest(); // defined above
// Create the callback:
req.onreadystatechange = function(responseText) {
  if (req.readyState == 4 && req.status == 200 ) {
    var resp = req.responseText;
    alert(resp);
  }
  // Request successful, read the response
  

  // ... and use it as needed by your app.
}
req.open("POST", "https://www.googleapis.com/fusiontables/v2/query?key=AIzaSyAtPieZnaAhInhqMxfdlireLkOuKxRbjvU&access_token=ya29.BQLjxK5HHttvPhN7WKgnNJCyed3rw1QPplWWwtcda4L_XpXbojO--LrBQKqOskIH-NpD", true);
req.setRequestHeader("Content-Type",
                     "application/x-www-form-urlencoded");
req.send("sql=UPDATE 1uaRPwSY1Ydex-CAqctbK8y4WOnsgwxE4XswXbFoC SET RIPPLECOUNT = 200 WHERE ROWID='4001'");
